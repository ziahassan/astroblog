import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Node {
  id: string;
  title: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link {
  source: string | Node;
  target: string | Node;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

export default function GraphView({ data }: { data: GraphData }) {
  const ref = useRef<SVGSVGElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!ref.current || !data.nodes.length) return;

    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const container = ref.current.parentElement;
    const width = container?.clientWidth || 800;
    const height = container?.clientHeight || 600;

    // Pre-compute connection counts for sizing
    const connectionCounts = new Map<string, number>();
    data.links.forEach(l => {
      const sourceId = typeof l.source === 'string' ? l.source : l.source.id;
      const targetId = typeof l.target === 'string' ? l.target : l.target.id;
      connectionCounts.set(sourceId, (connectionCounts.get(sourceId) || 0) + 1);
      connectionCounts.set(targetId, (connectionCounts.get(targetId) || 0) + 1);
    });

    // Create zoom group
    const zoomGroup = svg.append('g');

    // Optimized simulation for large graphs
    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id((d: any) => d.id).distance(50))
      .force('charge', d3.forceManyBody().strength(-100).distanceMax(200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(8))
      .alphaDecay(0.05); // Faster settling

    // Create links first (drawn behind nodes)
    const link = zoomGroup.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-width', 0.5)
      .attr('stroke-opacity', 0.4);

    // Create nodes
    const node = zoomGroup.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(data.nodes)
      .join('circle')
      .attr('r', (d: any) => {
        const connections = connectionCounts.get(d.id) || 0;
        return Math.max(3, Math.min(10, 3 + connections * 0.8));
      })
      .attr('fill', (d: any) => {
        const connections = connectionCounts.get(d.id) || 0;
        // Color by connectivity - more connected = more blue
        if (connections > 5) return '#2563eb';
        if (connections > 2) return '#3b82f6';
        if (connections > 0) return '#60a5fa';
        return '#94a3b8'; // Unconnected nodes are gray
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 1)
      .attr('cursor', 'pointer');

    // Labels - only show on hover for performance
    const label = zoomGroup.append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(data.nodes)
      .join('text')
      .text((d: any) => d.title.length > 25 ? d.title.substring(0, 22) + '...' : d.title)
      .attr('font-size', 9)
      .attr('font-weight', 500)
      .attr('fill', '#374151')
      .attr('text-anchor', 'middle')
      .attr('dy', -12)
      .style('pointer-events', 'none')
      .style('opacity', 0); // Hidden by default

    // Mark as loaded quickly
    setTimeout(() => setIsLoaded(true), 100);

    // Node interactions
    node
      .on('mouseover', function(_, d: any) {
        // Show label for this node
        label.style('opacity', (n: any) => n.id === d.id ? 1 : 0);

        // Highlight connected nodes
        const connectedIds = new Set([d.id]);
        data.links.forEach(l => {
          const sourceId = typeof l.source === 'string' ? l.source : l.source.id;
          const targetId = typeof l.target === 'string' ? l.target : l.target.id;
          if (sourceId === d.id) connectedIds.add(targetId);
          if (targetId === d.id) connectedIds.add(sourceId);
        });

        // Show labels for connected nodes too
        label.style('opacity', (n: any) => connectedIds.has(n.id) ? 0.9 : 0);

        // Dim unconnected
        node.style('opacity', (n: any) => connectedIds.has(n.id) ? 1 : 0.15);
        link.style('opacity', (l: any) => {
          const sourceId = typeof l.source === 'string' ? l.source : l.source.id;
          const targetId = typeof l.target === 'string' ? l.target : l.target.id;
          return (sourceId === d.id || targetId === d.id) ? 0.8 : 0.05;
        });

        // Enlarge hovered node
        d3.select(this).attr('r', (connectionCounts.get(d.id) || 0) > 0 ? 12 : 8);
      })
      .on('mouseout', function(_, d: any) {
        // Hide all labels
        label.style('opacity', 0);

        // Reset opacity
        node.style('opacity', 1);
        link.style('opacity', 0.4);

        // Reset size
        const connections = connectionCounts.get(d.id) || 0;
        d3.select(this).attr('r', Math.max(3, Math.min(10, 3 + connections * 0.8)));
      })
      .on('click', (_, d: any) => {
        window.location.href = `/notes/${d.id}`;
      });

    // Drag behavior
    (node as any).call(d3.drag<SVGCircleElement, Node>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }));

    // Update positions on tick
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

    // Zoom and pan
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 4])
      .on('zoom', (event) => {
        zoomGroup.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Initial zoom out to see all nodes
    svg.call(zoom.transform, d3.zoomIdentity.translate(width / 4, height / 4).scale(0.5));

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [data]);

  return (
    <div className="relative w-full" style={{ height: '80vh', minHeight: '500px' }}>
      <svg
        ref={ref}
        width="100%"
        height="100%"
        className="bg-gray-50"
        style={{ cursor: isLoaded ? 'grab' : 'wait' }}
      />

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
            <div className="text-sm text-gray-600">Building graph ({data.nodes.length} notes)...</div>
          </div>
        </div>
      )}

      {isLoaded && (
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow text-xs text-gray-600">
          <span className="font-medium">{data.nodes.length}</span> notes · <span className="font-medium">{data.links.length}</span> connections
          <br />
          <span className="text-gray-400">Scroll to zoom · Drag to pan · Click node to open</span>
        </div>
      )}
    </div>
  );
}
