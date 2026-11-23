"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useScrollMotion } from "@/lib/gsap";

type Chapter = { label: string };

const activationLineRatio = 0.55;

export default function ChapterRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  useScrollMotion(railRef, (matchMedia, railElement) => {
    matchMedia.add("all", () => {
      const chapterSections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
      setChapters(chapterSections.map((section) => ({ label: section.dataset.chapter ?? "" })));

      const setRailProgress = gsap.quickSetter(railElement, "--rail-progress");
      const getLayoutBox = (section: HTMLElement) =>
        section.parentElement?.classList.contains("pin-spacer") ? section.parentElement : section;
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
        onRefresh: updateActiveChapter,
      });

      const refreshTimeout = window.setTimeout(() => ScrollTrigger.refresh(), 0);
      return () => window.clearTimeout(refreshTimeout);
    });
  });

  const formatChapterNumber = (value: number) => String(value).padStart(2, "0");
  const activeChapter = chapters[activeChapterIndex];

  return (
    <div className="chapter-rail" ref={railRef} aria-hidden="true">
      <span className="chapter-rail-count">
        {formatChapterNumber(activeChapterIndex + 1)} / {formatChapterNumber(Math.max(chapters.length, 1))}
      </span>
      <span className="chapter-rail-label">{activeChapter?.label}</span>
      <span className="chapter-rail-line">
        <span className="chapter-rail-fill" />
        <span className="chapter-rail-dot" />
      </span>
    </div>
  );
}
