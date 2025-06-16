
import React, { useState, useEffect, useMemo, useRef, memo } from 'react';
import { cn } from "@/lib/utils";

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  overscan?: number;
}

const VirtualListComponent = <T,>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className,
  overscan = 5
}: VirtualListProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollElementRef = useRef<HTMLDivElement>(null);

  const { visibleStart, visibleEnd, totalHeight } = useMemo(() => {
    const itemCount = items.length;
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const end = Math.min(itemCount - 1, start + visibleCount + overscan * 2);
    
    return {
      visibleStart: start,
      visibleEnd: end,
      totalHeight: itemCount * itemHeight
    };
  }, [items.length, itemHeight, containerHeight, scrollTop, overscan]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleStart, visibleEnd + 1).map((item, index) => ({
      item,
      index: visibleStart + index
    }));
  }, [items, visibleStart, visibleEnd]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={scrollElementRef}
      className={cn("overflow-auto", className)}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${visibleStart * itemHeight}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          {visibleItems.map(({ item, index }) => (
            <div
              key={index}
              style={{ height: itemHeight }}
              className="flex items-center"
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const VirtualList = memo(VirtualListComponent) as <T>(props: VirtualListProps<T>) => JSX.Element;
