import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function GraphView({ data }: { data: { nodes: any[]; links: any[] } }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);
    svg.selectAll('*').remove(); // clear previous render

    const width = window.innerWidth;
    const height = 600;

    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id((d: any) => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .attr('stroke', '#ccc')
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke-width', 1.5);

    const node = svg.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(data.nodes)
      .join('circle')
      .attr('r', 8)
      .attr('fill', '#1e40af')
      .attr('cursor', 'pointer')
      .on('mouseover', function () {
        d3.select(this).attr('fill', '#2563eb');
      })
      .on('mouseout', function () {
        d3.select(this).attr('fill', '#1e40af');
      })
      .on('click', (event, d: any) => {
        window.location.href = `/notes/${d.id}`;
      })
      .call(d3.drag()
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

    const label = svg.append('g')
      .selectAll('text')
      .data(data.nodes)
      .join('text')
      .text((d: any) => d.title)
      .attr('font-size', 12)
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
  }, [data]);

  return <svg ref={ref} width="100%" height="600px" />;
}