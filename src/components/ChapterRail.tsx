"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { gsap, ScrollTrigger, useScrollMotion } from "@/lib/gsap";

type Chapter = { label: string; scrollTop: number; progress: number };

const activationLineRatio = 0.55;

const getMaxScroll = () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

const getLayoutBox = (section: HTMLElement) =>
  section.parentElement?.classList.contains("pin-spacer") ? section.parentElement : section;

export default function ChapterRail() {
  const railRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  useScrollMotion(railRef, (matchMedia, railElement) => {
    matchMedia.add("all", () => {
      const chapterSections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
      const setRailProgress = gsap.quickSetter(railElement, "--rail-progress");

      const measureChapters = () => {
        const maxScroll = getMaxScroll();
        setChapters(
          chapterSections.map((section) => {
            const scrollTop = Math.min(maxScroll, getLayoutBox(section).getBoundingClientRect().top + window.scrollY);
            return { label: section.dataset.chapter ?? "", scrollTop, progress: scrollTop / maxScroll };
          }),
        );
      };
      const updateActiveChapter = () => {
        const activationLine = window.innerHeight * activationLineRatio;
        const reachedChapterIndex = chapterSections.reduce(
          (lastReachedIndex, section, chapterIndex) =>
            getLayoutBox(section).getBoundingClientRect().top <= activationLine ? chapterIndex : lastReachedIndex,
          0,
        );
        setActiveChapterIndex(reachedChapterIndex);
      };

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          setRailProgress(self.progress);
          updateActiveChapter();
        },
        onRefresh: (self) => {
          setRailProgress(self.progress);
          measureChapters();
          updateActiveChapter();
        },
      });

      const refreshTimeout = window.setTimeout(() => ScrollTrigger.refresh(), 0);
      return () => window.clearTimeout(refreshTimeout);
    });
  });

  const scrollToTrackPosition = (clientX: number) => {
    const trackBounds = trackRef.current?.getBoundingClientRect();
    if (!trackBounds) return;
    const trackProgress = gsap.utils.clamp(0, 1, (clientX - trackBounds.left) / trackBounds.width);
    window.scrollTo({ top: trackProgress * getMaxScroll(), behavior: "instant" });
  };

  const startScrubbing = (event: ReactPointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest(".chapter-rail-tick")) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    scrollToTrackPosition(event.clientX);
  };

  const continueScrubbing = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) scrollToTrackPosition(event.clientX);
  };

  const goToChapter = (chapter: Chapter) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: chapter.scrollTop, behavior: prefersReducedMotion ? "instant" : "smooth" });
  };

  const formatChapterNumber = (value: number) => String(value).padStart(2, "0");
  const activeChapter = chapters[activeChapterIndex];

  return (
    <nav className="chapter-rail" ref={railRef} aria-label="Chapitres de la page">
      <span className="chapter-rail-count" aria-hidden="true">
        {formatChapterNumber(activeChapterIndex + 1)} / {formatChapterNumber(Math.max(chapters.length, 1))}
      </span>
      <span className="chapter-rail-label" aria-hidden="true">
        {activeChapter?.label}
      </span>
      <div
        className="chapter-rail-track"
        ref={trackRef}
        onPointerDown={startScrubbing}
        onPointerMove={continueScrubbing}
      >
        <span className="chapter-rail-line" aria-hidden="true">
          <span className="chapter-rail-fill" />
        </span>
        {chapters.map((chapter, chapterIndex) => (
          <button
            className="chapter-rail-tick"
            type="button"
            key={chapter.label}
            style={{ left: `${chapter.progress * 100}%` }}
            aria-label={`Aller à : ${chapter.label}`}
            aria-current={chapterIndex === activeChapterIndex ? "step" : undefined}
            onClick={() => goToChapter(chapter)}
          >
            <span className="chapter-rail-tooltip" aria-hidden="true">
              {chapter.label}
            </span>
          </button>
        ))}
        <span className="chapter-rail-dot" aria-hidden="true" />
      </div>
    </nav>
  );
}
