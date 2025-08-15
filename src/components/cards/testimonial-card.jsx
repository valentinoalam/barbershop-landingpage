import React from 'react';
import { cn } from "@/lib/utils";
import StarIcon from '../common/star-icon'; // Adjust path as needed

function TestimonialCard({ avatarUrl, name, timeAgo, rating, text }) {
  return (
    <figure
      className={cn(
        // "flex flex-col gap-3 bg-[#181611]",
        "relative h-full w-64 bg-[#181611] cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          style={{ backgroundImage: `url("${avatarUrl}")` }}
        ></div>
        <div className="flex-1">
          <p className="text-white text-base font-medium leading-normal">{name}</p>
          <p className="text-[#bab29c] text-sm font-normal leading-normal">{timeAgo}</p>
        </div>
      </div>
      <div className="flex gap-0.5">
        {[...Array(rating)].map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
      <p className="text-white text-sm font-normal leading-normal">{text}</p>
    </figure>
  );
}

export default TestimonialCard;