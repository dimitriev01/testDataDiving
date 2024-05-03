import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import cls from './tooltip.module.scss'

interface IToolTipProps {
  title: string;
  text: string;
  delay: number;
}

export const ToolTip = (props: IToolTipProps) => {
  const { delay, text, title } = props;
  const [showToolTip, setShowToolTip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseEnter = () => {
      timeoutIdRef.current = setTimeout(() => {
        setShowToolTip(true);
      }, delay);
    };

    const handleMouseLeave = () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      setShowToolTip(false);
    };

    const handleScroll = () => {
      setShowToolTip(false);
    };

    const handleResize = () => {
      setShowToolTip(false);
    };

    const container = containerRef.current;
    const tooltip = tooltipRef.current;

    if (container && tooltip) {
      const { top, left } = tooltip.getBoundingClientRect();
      const containerWidth = container.offsetWidth;
      const tooltipWidth = tooltip.offsetWidth;

      if (left + tooltipWidth > containerWidth) {
        tooltip.style.right = '0';
      } else {
        tooltip.style.right = 'auto';
      }

      if (top + tooltip.offsetHeight > window.innerHeight) {
        tooltip.style.bottom = '0';
      } else {
        tooltip.style.bottom = 'auto';
      }
    }

    container?.addEventListener('mouseenter', handleMouseEnter);
    container?.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      container?.removeEventListener('mouseenter', handleMouseEnter);
      container?.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [delay, tooltipRef, containerRef]);

  return (
    <div ref={containerRef} className={cls['tooltip-wrapper']}>
      {title}
      <div ref={tooltipRef} className={clsx(
        cls['tooltip-wrapper__content'],
        { [cls['tooltip-wrapper__content_opened']]: showToolTip }
      )}>
        {text}
      </div>
    </div>
  );
};
