"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type HeroBannerReelProps = {
  ariaLabel: string;
};

const AUDIBLE_RATIO = 0.35;

const HERO_REEL_SRC =
  process.env.NEXT_PUBLIC_HERO_REEL_SRC?.trim() || "/Reel_Clinica.mp4";

export function HeroBannerReel({ ariaLabel }: HeroBannerReelProps) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollRafRef = useRef(0);
  const [muted, setMuted] = useState(true);

  const computeInBanner = useCallback((): boolean => {
    const banner = bannerRef.current;
    if (!banner || typeof document === "undefined") return false;
    if (document.visibilityState !== "visible") return false;
    const rect = banner.getBoundingClientRect();
    const vh = window.innerHeight;
    const visibleHeight = Math.max(
      0,
      Math.min(rect.bottom, vh) - Math.max(rect.top, 0),
    );
    const ratio = rect.height > 0 ? visibleHeight / rect.height : 0;
    return ratio >= AUDIBLE_RATIO;
  }, []);

  const applyAudibleState = useCallback((wantSound: boolean) => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !wantSound;
    if (video.muted !== nextMuted) {
      video.muted = nextMuted;
      setMuted(nextMuted);
    }
    if (wantSound) {
      void video.play().catch(() => {});
    }
  }, []);

  const syncAudio = useCallback(() => {
    applyAudibleState(computeInBanner());
  }, [applyAudibleState, computeInBanner]);

  useLayoutEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryUnmuteAfterMutedPlay = () => {
      if (!computeInBanner()) return;
      const run = () => {
        if (!computeInBanner()) return;
        v.muted = false;
        setMuted(false);
        void v.play().catch(() => {});
      };
      run();
      requestAnimationFrame(run);
      requestAnimationFrame(() => requestAnimationFrame(run));
    };

    const want = computeInBanner();
    if (!want) {
      v.muted = true;
      setMuted(true);
      void v.play().catch(() => {});
    } else {
      v.muted = false;
      setMuted(false);
      const p = v.play();
      if (p !== undefined) {
        p.catch(() => {
          v.muted = true;
          setMuted(true);
          void v.play().then(() => {
            tryUnmuteAfterMutedPlay();
          });
        });
      }
    }

    const onPlaying = () => {
      if (computeInBanner()) {
        v.muted = false;
        setMuted(false);
      }
    };
    v.addEventListener("playing", onPlaying);

    return () => {
      v.removeEventListener("playing", onPlaying);
    };
  }, [computeInBanner]);

  useEffect(() => {
    const runSync = () => {
      syncAudio();
    };

    const onScrollOrResize = () => {
      if (scrollRafRef.current) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = 0;
        syncAudio();
      });
    };

    document.addEventListener("visibilitychange", runSync);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    runSync();

    return () => {
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
      document.removeEventListener("visibilitychange", runSync);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [syncAudio]);

  return (
    <div
      ref={bannerRef}
      className="relative isolate grid w-full min-w-0 max-w-full shrink-0 grid-cols-1 grid-rows-1 overflow-hidden min-h-svh h-[min(100svh,100dvh)] max-h-[100dvh]"
    >
      {/* Gradient only below 1000px viewport width. */}
      <div
        className="pointer-events-none col-span-full row-span-full z-0 bg-gradient-to-br from-flow-purple via-[#524a8f] to-[#433c73] min-[1000px]:hidden"
        aria-hidden
      />

      {/* min-[1000px]: banner PNG */}
      <div className="pointer-events-none col-span-full row-span-full z-0 hidden min-h-0 min-w-0 h-full w-full min-[1000px]:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/BannerClinicas.png"
          alt=""
          width={2752}
          height={1536}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className={
            "h-full min-h-0 w-full min-w-0 max-w-full object-cover " +
            /* left + vertical % = upper-left art stays in view across aspect ratios */
            "object-[left_28%] min-[1000px]:object-[left_30%] lg:object-[left_32%] xl:object-[left_34%] " +
            "landscape:object-[left_24%]"
          }
        />
      </div>

      <div className="relative col-span-full row-span-full z-[1] flex h-full min-h-0 w-full min-w-0 flex-col items-center justify-center px-[max(1rem,env(safe-area-inset-left))] pb-[max(1.5rem,env(safe-area-inset-bottom))] pl-4 pr-[max(1rem,env(safe-area-inset-right))] pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-6 sm:pb-10 sm:pt-8 min-[1000px]:items-end min-[1000px]:justify-end min-[1000px]:px-8 min-[1000px]:pb-12 min-[1000px]:pt-8 lg:px-12 lg:pr-16">
        <div className="mx-auto flex h-full min-h-0 w-full max-w-[1920px] flex-col items-center justify-center min-[1000px]:items-end min-[1000px]:justify-end">
          <div
            className={
              "relative mx-auto aspect-[9/16] h-auto max-h-[min(78svh,calc(100dvh-8rem))] w-[min(17.25rem,calc(100vw-2rem))] max-w-full shrink-0 min-[1000px]:mx-0 min-[1000px]:ml-auto " +
              "sm:w-[min(17.25rem,min(42vw,20rem))] min-[1000px]:w-[min(17.25rem,min(34vw,19rem))] lg:w-[min(17.25rem,min(26vw,18rem))] xl:w-72 " +
              "landscape:max-h-[min(88dvh,34rem)] [height:min(100%,min(78svh,calc(100dvh-8rem)))]"
            }
          >
          <div
            className="absolute left-[5px] top-[26%] z-20 h-9 w-[3px] rounded-l-sm bg-gradient-to-b from-neutral-500 to-neutral-700 max-sm:left-0.5 sm:left-[5px]"
            aria-hidden
          />
          <div
            className="absolute left-[5px] top-[38%] z-20 h-14 w-[3px] rounded-l-sm bg-gradient-to-b from-neutral-500 to-neutral-700 max-sm:left-0.5 sm:left-[5px]"
            aria-hidden
          />
          <div
            className="absolute right-[5px] top-[32%] z-20 h-16 w-[3px] rounded-r-sm bg-gradient-to-b from-neutral-500 to-neutral-700 max-sm:right-0.5 sm:right-[5px]"
            aria-hidden
          />

          <div className="relative h-full w-full rounded-[2.1rem] border-[6px] border-[#14141a] bg-[#14141a] p-[5px] shadow-[0_28px_72px_-16px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.12),0_0_48px_-8px_rgba(92,84,160,0.35)] max-sm:rounded-[1.65rem] max-sm:border-[5px] sm:rounded-[2.1rem]">
            <div className="relative h-full w-full overflow-hidden rounded-[1.55rem] bg-black max-sm:rounded-[1.2rem]">
              <div
                className="pointer-events-none absolute left-1/2 top-2.5 z-10 h-[22px] w-[92px] max-w-[38%] -translate-x-1/2 rounded-full bg-neutral-950/95 shadow-[inset_0_1px_2px_rgba(255,255,255,0.12)] ring-1 ring-white/10"
                aria-hidden
              />
              <video
                ref={videoRef}
                className="h-full w-full object-cover object-center"
                autoPlay
                muted={muted}
                loop
                playsInline
                preload="auto"
                aria-label={ariaLabel}
              >
                <source src={HERO_REEL_SRC} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[28%] min-h-[5.5rem] bg-[linear-gradient(to_top,#fff_0%,rgba(255,255,255,0.92)_12%,rgba(255,255,255,0.45)_28%,rgba(255,255,255,0.1)_48%,transparent_100%)] sm:min-h-[6.5rem] min-[1000px]:h-[24%] min-[1000px]:min-h-[7rem] lg:h-[22%]"
          aria-hidden
        />
      </div>
    </div>
  );
}
