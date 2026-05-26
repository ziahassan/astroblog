import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface LocalNode {
  id: string;
  title: string;
  isCurrent: boolean;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface LocalLink {
  source: string | LocalNode;
  target: string | LocalNode;
}

interface LocalGraphData {
  nodes: LocalNode[];
  links: LocalLink[];
  currentSlug: string;
}

export default function LocalGraphView({ data }: { data: LocalGraphData }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current || data.nodes.length <= 1) return;

    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const width = ref.current.clientWidth || 500;
    const height = 380;

    svg.append('defs').append('marker')
      .attr('id', 'local-arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 5)
      .attr('markerHeight', 5)
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#cbd5e1');

    const simulation = d3.forceSimulation<LocalNode>(data.nodes as LocalNode[])
      .force('link', d3.forceLink<LocalNode, LocalLink>(data.links as LocalLink[]).id((d) => d.id).distance(140))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(55));

    const link = svg.append('g')
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-width', 1.2)
      .attr('marker-end', 'url(#local-arrow)');

    const node = svg.append('g')
      .selectAll('circle')
      .data(data.nodes)
      .join('circle')
      .attr('r', (d: any) => d.isCurrent ? 9 : 6)
      .attr('fill', (d: any) => d.isCurrent ? '#2563eb' : '#94a3b8')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('cursor', (d: any) => d.isCurrent ? 'default' : 'pointer')
      .on('click', (_, d: any) => {
        if (!d.isCurrent) window.location.href = `/notes/${d.id}`;
      })
      .on('mouseover', function(_, d: any) {
        if (!d.isCurrent) d3.select(this).attr('fill', '#3b82f6');
      })
      .on('mouseout', function(_, d: any) {
        if (!d.isCurrent) d3.select(this).attr('fill', '#94a3b8');
      });

    const label = svg.append('g')
      .selectAll('text')
      .data(data.nodes)
      .join('text')
      .text((d: any) => d.title.length > 30 ? d.title.substring(0, 28) + '…' : d.title)
      .attr('font-size', 12)
      .attr('fill', (d: any) => d.isCurrent ? '#1d4ed8' : '#6b7280')
      .attr('font-weight', (d: any) => d.isCurrent ? '600' : '400')
      .attr('text-anchor', 'middle')
      .attr('dy', (d: any) => d.isCurrent ? -14 : -11)
      .style('pointer-events', 'none');

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('cx', (d: any) => Math.max(24, Math.min(width - 24, d.x)))
        .attr('cy', (d: any) => Math.max(24, Math.min(height - 24, d.y)));

      label
        .attr('x', (d: any) => Math.max(24, Math.min(width - 24, d.x)))
        .attr('y', (d: any) => Math.max(24, Math.min(height - 24, d.y)));
    });

    return () => simulation.stop();
  }, [data]);

  if (data.nodes.length <= 1) return null;

  return (
    <svg
      ref={ref}
      width="100%"
      height={380}
      className="rounded-lg border border-gray-100 bg-gray-50"
    />
  );
}
