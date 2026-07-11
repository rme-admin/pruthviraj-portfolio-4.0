"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  altPrefix: string;
}

/**
 * Greedy 2-column packer.
 * For each image (given as height/width aspect ratio), assigns it to
 * whichever column is currently shorter. This minimises the total
 * gallery height and leaves no unused vertical gaps.
 */
function greedyPack(aspects: number[]): [number[], number[]] {
  const left: number[] = [];
  const right: number[] = [];
  const heights = [0, 0];
  for (let i = 0; i < aspects.length; i++) {
    if (heights[0] <= heights[1]) {
      left.push(i);
      heights[0] += aspects[i];
    } else {
      right.push(i);
      heights[1] += aspects[i];
    }
  }
  return [left, right];
}

export default function MasonryGallery({ images, altPrefix }: Props) {
  const [aspects, setAspects] = useState<(number | null)[]>(() =>
    new Array(images.length).fill(null)
  );

  const allMeasured = aspects.every((a) => a !== null);

  // Use interleaved columns until every image is measured,
  // then switch to the greedy-optimal layout in one step.
  let left: number[], right: number[];
  if (allMeasured) {
    [left, right] = greedyPack(aspects as number[]);
  } else {
    left  = images.map((_, i) => i).filter((i) => i % 2 === 0);
    right = images.map((_, i) => i).filter((i) => i % 2 !== 0);
  }

  const handleLoad =
    (idx: number) => (e: React.SyntheticEvent<HTMLImageElement>) => {
      // Already measured — no state update needed
      if (aspects[idx] !== null) return;
      const img = e.currentTarget;
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      if (!w) return;
      setAspects((prev) => {
        const next = [...prev];
        next[idx] = h / w;
        return next;
      });
    };

  const renderImage = (idx: number) => (
    <div key={idx} className="border border-[var(--border)] overflow-hidden">
      <Image
        src={images[idx]}
        alt={`${altPrefix} ${idx + 1}`}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ width: "100%", height: "auto" }}
        className="block"
        onLoad={handleLoad(idx)}
      />
    </div>
  );

  return (
    <div className="flex gap-3">
      <div className="flex-1 flex flex-col gap-3">{left.map(renderImage)}</div>
      <div className="flex-1 flex flex-col gap-3">{right.map(renderImage)}</div>
    </div>
  );
}
