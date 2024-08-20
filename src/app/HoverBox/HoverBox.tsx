"use client";

import { useEffect, useRef, useState } from "react";
import BoxItem from "./BoxItem";

export default function HoverBox() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [diffs, setDiffs] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const box = boxRef.current;

    if (!box) {
      return;
    }

    // Get children ---

    const children: (Element | null)[] = [];
    for (let i = 0; i < box.children.length; ++i) {
      children.push(box.children.item(i));
    }

    // Handle mouse move ---

    const handleMouseMove = (e: MouseEvent) => {
      if (checkWithinRange(box, e.clientX, e.clientY)) {
        const newDiffs = [...diffs];
        for (let i = 0; i < children.length; ++i) {
          const child = children[i];
          if (child && child instanceof HTMLElement) {
            const el = child as HTMLElement;
            const rect = el.getBoundingClientRect();
            const center = rect.x + rect.width / 2;
            const diff = e.clientX - center;
            newDiffs[i] = diff;
          }
        }
        setDiffs(newDiffs);
      } else {
        setDiffs([0, 0, 0, 0]);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [boxRef, diffs]);

  const checkWithinRange = (
    box: HTMLElement,
    mouseX: number,
    mouseY: number,
  ) => {
    const { x, y, width, height } = box.getBoundingClientRect();
    return (
      mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height
    );
  };

  return (
    <div className="w-full p-4 flex justify-center items-center bg-white">
      <div ref={boxRef} className="gap-4 flex justify-center items-center">
        {diffs.map((diff, i) => (
          <BoxItem
            key={i}
            minWidth={40}
            maxWidth={60}
            distanceMagnify={140}
            diff={diff}
          />
        ))}
      </div>
    </div>
  );
}
