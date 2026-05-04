// PageProgress.jsx
import { useEffect, useRef } from 'react';

const PageProgress = () => {

  // Refs for DOM manipulation
  const progressWrapRef = useRef(null);
  const progressPathRef = useRef(null);

  useEffect(() => {
    const progressPath = progressPathRef.current;
    const progressWrap = progressWrapRef.current;

    if (!progressPath || !progressWrap) return;

    const offset = 50;
    const pathLength = progressPath.getTotalLength();

    // Initialize SVG path animation
    progressPath.style.transition = 'none';
    progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progressPath.style.strokeDashoffset = `${pathLength}`;
    progressPath.getBoundingClientRect(); // Force reflow
    progressPath.style.transition = 'stroke-dashoffset 10ms linear';

    // Scroll event handler to animate progress and toggle visibility
    const handleScroll = () => {
      const scroll = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = `${progress}`;

      if (scroll >= offset) {
        progressWrap.classList.add('opacity-100');
      } else {
        progressWrap.classList.remove('opacity-100');
      }
    };

    // Click event to scroll back to top smoothly
    const handleClick = (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Attach event listeners
    window.addEventListener('scroll', handleScroll);
    progressWrap.addEventListener('click', handleClick);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      progressWrap.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div
      ref={progressWrapRef}
      className="fixed bottom-5 right-5 z-50 h-11 w-11 cursor-pointer rounded-full bg-white/95 opacity-0 shadow-lg ring-1 ring-slate-200 transition-opacity duration-200"
    >
      <svg className="h-full w-full -rotate-90" viewBox="-1 -1 102 102">
        <path
          ref={progressPathRef}
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          className="fill-none stroke-[#0b1f3a] stroke-[6]"
        />
      </svg>
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-base text-[#0b1f3a]">↑</span>
    </div>
  );
};

export default PageProgress;
