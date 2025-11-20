"use client";

import { useEffect, useRef, useState } from "react";

const LottieAnimationWrapper = ({
  animationData,
  loop = true,
  autoplay = true,
  style = {},
}) => {
  const containerRef = useRef(null);
  const [lottie, setLottie] = useState(null);

  useEffect(() => {
    // Dynamically import lottie-web only on the client side
    import("lottie-web").then((lottieModule) => {
      setLottie(lottieModule.default);
    });
  }, []);

  useEffect(() => {
    if (!lottie || !containerRef.current) return;

    const animationInstance = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: loop,
      autoplay: autoplay,
      animationData: animationData,
    });

    return () => {
      animationInstance.destroy();
    };
  }, [lottie, animationData, loop, autoplay]);

  return <div ref={containerRef} style={style}></div>;
};

export default LottieAnimationWrapper;
