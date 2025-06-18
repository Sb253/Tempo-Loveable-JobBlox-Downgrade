
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  height?: string;
}

export const MermaidDiagram = ({ chart, height = "300px" }: MermaidDiagramProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
          curve: 'basis'
        }
      });

      elementRef.current.innerHTML = chart;
      mermaid.init(undefined, elementRef.current);
    }
  }, [chart]);

  return (
    <div 
      ref={elementRef} 
      className="mermaid" 
      style={{ height, overflow: 'auto' }}
    />
  );
};
