import { Box } from "@/components/Box";
import { Bee } from "@/types/Player";
import type { Entries } from "@/types/utils";
import { twMerge } from "tailwind-merge";

interface TraitsProps {
  bee: Bee;
  onClick: (shift: boolean, key: string, value: string) => void;
}

const traits = {
  lifespan: {
    label: "L",
    color: "bg-[#4cc4a7]",
    values: ["Hyper", "Rapid", "Short", "Normal", "Long", "Ancient", "Eternal"],
  },
  productivity: {
    label: "P",
    color: "bg-[#d89741]",
    values: [
      "Sluggish",
      "Slowest",
      "Slow",
      "Normal",
      "Fast",
      "Fastest",
      "Brisk",
    ],
  },
  fertility: {
    label: "F",
    color: "bg-[#d36079]",
    values: [
      "Sterile",
      "Infertile",
      "Unlucky",
      "Fertile",
      "Fecund",
      "Prolific",
      "Swarming",
    ],
  },
  stability: {
    label: "S",
    color: "bg-[#53bae2]",
    values: [
      "Chaotic",
      "Erratic",
      "Unstable",
      "Normal",
      "Stable",
      "Ordered",
      "Pure",
    ],
  },
};

export const Traits = ({ bee, onClick }: TraitsProps) => {
  const isTrait =
    (t: "d_traits" | "r_traits") =>
    <K extends keyof typeof traits>(
      key: K,
      stat: (typeof traits)[K],
      index: number,
    ) =>
      stat.values.findIndex((value) => value === bee?.stats?.[t][key]) ===
      index;

  const isDirectTrait = isTrait("d_traits");

  const isRecessiveTrait = isTrait("r_traits");

  return (
    <Box border="dark" title="empty">
      {(Object.entries(traits) as Entries<typeof traits>).map(([key, stat]) => (
        <Box
          border="hilight"
          className="overflow-clip text-wrap bg-dark"
          key={key}
        >
          <div className="flex gap-2 p-2">
            <span className="apico bg-hilight p-2 font-apico text-sm text-dark">
              {stat.label}
            </span>
            {[...Array(7).keys()].map((i) => (
              <div
                key={i}
                className={twMerge(
                  "grid w-5 gap-[6px] bg-base",
                  isDirectTrait(key, stat, i) && stat.color,
                )}
                onClick={(e) => {
                  e.preventDefault();
                  onClick(e.shiftKey, key, stat.values[i]);
                }}
              >
                {isRecessiveTrait(key, stat, i) && (
                  <>
                    <div className={stat.color}></div>
                    <div className={stat.color}></div>
                    <div className={stat.color}></div>
                  </>
                )}
              </div>
            ))}
          </div>
        </Box>
      ))}
    </Box>
  );
};
