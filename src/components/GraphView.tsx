// Update your src/components/GraphView.tsx with this optimized version
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Node {
  id: string;
  title: string;
  tags: string[];
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
    const height = container?.clientHeight || 400;

    // Create zoom group
    const zoomGroup = svg.append('g');

    // Create simulation
    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id((d: any) => d.id).distance(80))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(15));

    // Create links
    const link = zoomGroup.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke', '#e2e8f0')
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.6);

    // Create nodes
    const node = zoomGroup.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(data.nodes)
      .join('circle')
      .attr('r', 0)
      .attr('fill', (d: any) => {
        // Color by tags or default
        if (d.tags && d.tags.length > 0) {
          const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
          return colors[d.tags[0].length % colors.length];
        }
        return '#6b7280';
      })
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .attr('cursor', 'pointer')
      .style('opacity', 0);

    // Animate nodes in
    node.transition()
      .duration(800)
      .delay((d, i) => i * 20)
      .attr('r', (d: any) => {
        // Size by number of connections
        const connections = data.links.filter(l => 
          (typeof l.source === 'string' ? l.source : l.source.id) === d.id ||
          (typeof l.target === 'string' ? l.target : l.target.id) === d.id
        ).length;
        return Math.max(4, Math.min(12, 4 + connections * 1.5));
      })
      .style('opacity', 1)
      .on('end', () => setIsLoaded(true));

    // Add labels
    const label = zoomGroup.append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(data.nodes)
      .join('text')
      .text((d: any) => d.title.length > 20 ? d.title.substring(0, 17) + '...' : d.title)
      .attr('font-size', 10)
      .attr('font-weight', 500)
      .attr('fill', '#374151')
      .attr('text-anchor', 'middle')
      .attr('dy', -15)
      .style('pointer-events', 'none')
      .style('opacity', 0);

    // Animate labels in
    label.transition()
      .duration(600)
      .delay(800)
      .style('opacity', 0.8);

    // Node interactions
    node
      .on('mouseover', function(event, d: any) {
        // Highlight connected nodes
        const connectedNodes = new Set();
        connectedNodes.add(d.id);
        
        data.links.forEach(l => {
          const sourceId = typeof l.source === 'string' ? l.source : l.source.id;
          const targetId = typeof l.target === 'string' ? l.target : l.target.id;
          
          if (sourceId === d.id) connectedNodes.add(targetId);
          if (targetId === d.id) connectedNodes.add(sourceId);
        });

        // Dim non-connected nodes
        node.style('opacity', (n: any) => connectedNodes.has(n.id) ? 1 : 0.3);
        label.style('opacity', (n: any) => connectedNodes.has(n.id) ? 1 : 0.2);
        link.style('opacity', (l: any) => {
          const sourceId = typeof l.source === 'string' ? l.source : l.source.id;
          const targetId = typeof l.target === 'string' ? l.target : l.target.id;
          return (sourceId === d.id || targetId === d.id) ? 1 : 0.1;
        });

        // Scale up hovered node
        d3.select(this)
          .transition()
          .duration(150)
          .attr('r', function() {
            const currentR = +d3.select(this).attr('r');
            return currentR * 1.5;
          });
      })
      .on('mouseout', function() {
        // Reset all styles
        node.style('opacity', 1)
          .transition()
          .duration(150)
          .attr('r', (d: any) => {
            const connections = data.links.filter(l => 
              (typeof l.source === 'string' ? l.source : l.source.id) === d.id ||
              (typeof l.target === 'string' ? l.target : l.target.id) === d.id
            ).length;
            return Math.max(4, Math.min(12, 4 + connections * 1.5));
          });
        
        label.style('opacity', 0.8);
        link.style('opacity', 0.6);
      })
      .on('click', (event, d: any) => {
        window.location.href = `/notes/${d.id}`;
      });

    // Drag behavior
    node.call(d3.drag<SVGCircleElement, Node>()
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

    // Update positions on each tick
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
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        zoomGroup.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [data]);

  return (
    <div className="relative w-full h-full">
      <svg 
        ref={ref} 
        width="100%" 
        height="100%" 
        className="bg-transparent"
        style={{ cursor: isLoaded ? 'grab' : 'wait' }}
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
            <div className="text-sm text-gray-600">Building knowledge graph...</div>
          </div>
        </div>
      )}
    </div>
  );
}