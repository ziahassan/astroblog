import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function GraphView({ data }: { data: { nodes: any[]; links: any[] } }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const width = ref.current.clientWidth || window.innerWidth;
    const height = ref.current.clientHeight || 600;

    const zoomGroup = svg.append('g');

    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id((d: any) => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = zoomGroup.append('g')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 1.5)
      .selectAll('line')
      .data(data.links)
      .join('line');

    const node = zoomGroup.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(data.nodes)
      .join('circle')
      .attr('r', 0)
      .attr('fill', '#1e40af')
      .attr('cursor', 'pointer')
      .transition()
      .duration(500)
      .attr('r', 8)
      .selection();

    node.on('mouseover', function() {
        d3.select(this)
          .transition()
          .duration(150)
          .attr('r', 12)
          .attr('fill', '#2563eb');
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(150)
          .attr('r', 8)
          .attr('fill', '#1e40af');
      })
      .on('click', (event, d: any) => {
        window.location.href = `/notes/${d.id}`;
      });

    node.call(d3.drag()
      .on('start', (event, d: any) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d: any) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d: any) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }));

    const label = zoomGroup.append('g')
      .selectAll('text')
      .data(data.nodes)
      .join('text')
      .text((d: any) => d.title)
      .attr('font-size', 10)
      .attr('fill', '#333')
      .attr('text-anchor', 'middle');

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
        .attr('y', (d: any) => d.y - 12);
    });

    svg.call(d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 5])
      .on('zoom', (event) => {
        zoomGroup.attr('transform', event.transform);
      }));

  }, [data]);

  return <svg ref={ref} width="100%" height="600px" />;
}