import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface GraphNode {
  id: string;
  title: string;
  connections: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export default function FullGraphView({ data }: { data: GraphData }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current || data.nodes.length === 0) return;

    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const width = ref.current.clientWidth || 900;
    const height = 580;
    const r = (d: GraphNode) => Math.max(4, Math.min(12, 4 + d.connections * 2));

    // Pin the most-connected node at center
    const nodes = data.nodes.map(d => ({ ...d })) as GraphNode[];
    const hub = nodes.reduce((a, b) => a.connections >= b.connections ? a : b, nodes[0]);
    hub.fx = width / 2;
    hub.fy = height / 2;

    // Zoom container
    const g = svg.append('g');

    svg.call(
      d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.3, 3])
        .on('zoom', (event) => g.attr('transform', event.transform))
    );

    const links = data.links.map(d => ({ ...d }));

    const simulation = d3.forceSimulation<GraphNode>(nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(links as GraphLink[])
        .id(d => d.id)
        .distance(90))
      .force('charge', d3.forceManyBody().strength(-220))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide<GraphNode>().radius(d => r(d) + 18));

    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#99f6e4')
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.6);

    const node = g.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', d => r(d))
      .attr('fill', d => d.id === hub.id ? '#0f766e' : d.connections > 0 ? '#2dd4bf' : '#cbd5e1')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .attr('cursor', 'pointer')
      .on('click', (_, d) => { window.location.href = `/notes/${d.id}`; })
      .on('mouseover', function(_, d) {
        d3.select(this).attr('fill', '#0f766e').attr('r', r(d) + 2);
        hoverLabel
          .attr('x', d.x ?? 0)
          .attr('y', (d.y ?? 0) - r(d) - 8)
          .text(d.title)
          .style('opacity', 1);
      })
      .on('mouseout', function(_, d) {
        d3.select(this).attr('fill', d.connections > 0 ? '#2dd4bf' : '#cbd5e1').attr('r', r(d));
        hoverLabel.style('opacity', 0);
      })
      .call(
        d3.drag<SVGCircleElement, GraphNode>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x; d.fy = d.y;
          })
          .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null; d.fy = null;
          })
      );

    // Hover label — single text element that moves to the hovered node
    const hoverLabel = g.append('text')
      .attr('font-size', 11)
      .attr('fill', '#134e4a')
      .attr('font-weight', '600')
      .attr('text-anchor', 'middle')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('paint-order', 'stroke')
      .style('stroke', '#f0fdfa')
      .style('stroke-width', '3px');

    // Always-visible labels for highly connected nodes
    const label = g.append('g')
      .selectAll('text')
      .data(nodes.filter(d => d.connections >= 3))
      .join('text')
      .text(d => d.title.length > 24 ? d.title.slice(0, 22) + '…' : d.title)
      .attr('font-size', 10)
      .attr('fill', '#0f766e')
      .attr('font-weight', '500')
      .attr('text-anchor', 'middle')
      .attr('dy', d => -(r(d) + 5))
      .style('pointer-events', 'none');


    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);

      label
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y);

    });

    return () => { simulation.stop(); };
  }, [data]);

  return (
    <div style={{ position: 'relative' }}>
      <svg
        ref={ref}
        width="100%"
        height={580}
        className="rounded-xl border border-teal-100 bg-[#f0fdfa]"
      />
      <p className="text-xs text-teal-400 text-center mt-2">
        Scroll to zoom · drag to pan · click a node to open
      </p>
    </div>
  );
}
