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

const LABEL_SHOW = 1.4;  // zoom scale at which labels are fully visible
const LABEL_HIDE = 0.8;  // zoom scale at which labels are fully hidden

function labelOpacity(k: number, isCurrent: boolean) {
  if (isCurrent) return 1;
  if (k >= LABEL_SHOW) return 1;
  if (k <= LABEL_HIDE) return 0;
  return (k - LABEL_HIDE) / (LABEL_SHOW - LABEL_HIDE);
}

export default function LocalGraphView({ data }: { data: LocalGraphData }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current || data.nodes.length <= 1) return;

    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const width = ref.current.clientWidth || 500;
    const height = 380;

    // Clone to avoid mutating props
    const nodes: LocalNode[] = data.nodes.map(d => ({ ...d }));
    const links = data.links.map(d => ({ ...d }));

    // Pre-run simulation to stable positions before rendering
    const simulation = d3.forceSimulation<LocalNode>(nodes)
      .force('link', d3.forceLink<LocalNode, LocalLink>(links as any).id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-350))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50));

    simulation.tick(300);
    simulation.stop();

    // Calculate zoom-to-fit
    const xs = nodes.map(d => d.x ?? 0);
    const ys = nodes.map(d => d.y ?? 0);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const pad = 60;
    const k0 = Math.min(
      (width - pad * 2) / Math.max(maxX - minX, 1),
      (height - pad * 2) / Math.max(maxY - minY, 1),
      1
    );
    const tx = (width - (maxX - minX) * k0) / 2 - minX * k0;
    const ty = (height - (maxY - minY) * k0) / 2 - minY * k0;
    const initialTransform = d3.zoomIdentity.translate(tx, ty).scale(k0);

    // Arrow marker
    svg.append('defs').append('marker')
      .attr('id', 'local-arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 18).attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 5).attr('markerHeight', 5)
      .append('path').attr('d', 'M0,-5L10,0L0,5').attr('fill', '#cbd5e1');

    // Container group — render everything here first, wire zoom after
    const g = svg.append('g').attr('transform', initialTransform.toString());

    g.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-width', 1.2)
      .attr('marker-end', 'url(#local-arrow)')
      .attr('x1', (d: any) => d.source.x ?? 0)
      .attr('y1', (d: any) => d.source.y ?? 0)
      .attr('x2', (d: any) => d.target.x ?? 0)
      .attr('y2', (d: any) => d.target.y ?? 0);

    g.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', d => d.isCurrent ? 9 : 6)
      .attr('fill', d => d.isCurrent ? '#2563eb' : '#94a3b8')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('cursor', d => d.isCurrent ? 'default' : 'pointer')
      .attr('cx', d => d.x ?? 0)
      .attr('cy', d => d.y ?? 0)
      .on('click', (_, d) => { if (!d.isCurrent) window.location.href = `/notes/${d.id}`; })
      .on('mouseover', function(_, d) { if (!d.isCurrent) d3.select(this).attr('fill', '#3b82f6'); })
      .on('mouseout',  function(_, d) { if (!d.isCurrent) d3.select(this).attr('fill', '#94a3b8'); });

    const label = g.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text(d => d.title.length > 32 ? d.title.substring(0, 30) + '…' : d.title)
      .attr('font-size', 11)
      .attr('fill', d => d.isCurrent ? '#1d4ed8' : '#6b7280')
      .attr('font-weight', d => d.isCurrent ? '600' : '400')
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.isCurrent ? -14 : -11)
      .attr('x', d => d.x ?? 0)
      .attr('y', d => d.y ?? 0)
      .style('pointer-events', 'none')
      .style('opacity', d => labelOpacity(k0, d.isCurrent));

    // Wire zoom now that g and label exist
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 4])
      .on('zoom', event => {
        g.attr('transform', event.transform);
        const k: number = event.transform.k;
        label.style('opacity', (d: any) => labelOpacity(k, d.isCurrent));
      });

    svg.call(zoom).call(zoom.transform, initialTransform);

  }, [data]);

  if (data.nodes.length <= 1) return null;

  return (
    <svg
      ref={ref}
      width="100%"
      height={380}
      className="rounded-lg border border-gray-100 bg-gray-50 cursor-grab active:cursor-grabbing"
    />
  );
}
