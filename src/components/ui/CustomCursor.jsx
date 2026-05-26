import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const outerPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (innerRef.current) {
        innerRef.current.style.left = `${e.clientX}px`;
        innerRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      const dx = pos.current.x - outerPos.current.x;
      const dy = pos.current.y - outerPos.current.y;
      outerPos.current.x += dx * 0.12;
      outerPos.current.y += dy * 0.12;
      if (outerRef.current) {
        outerRef.current.style.left = `${outerPos.current.x}px`;
        outerRef.current.style.top = `${outerPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onHoverIn = () => setHovered(true);
    const onHoverOut = () => setHovered(false);

    const interactiveEls = document.querySelectorAll('a, button, [data-cursor]');
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', onHoverIn);
      el.addEventListener('mouseleave', onHoverOut);
    });

    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
      });
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className={`cursor-outer ${hovered ? 'hovered' : ''}`} />
      <div ref={innerRef} className={`cursor-inner ${hovered ? 'hovered' : ''}`} />
    </>
  );
}
