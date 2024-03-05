import { Box } from "../box/Box";
import pluviophile from "../../assets/pluviophile.png";
import chionophile from "../../assets/chionophile.png";
import polar from "../../assets/polar.png";
import tropical from "../../assets/tropical.png";
import { twMerge } from "tailwind-merge";

export const Climate = ({ bee, onClick }) => {
  const isPluviophile =
    !!bee?.stats.d_traits.pluviophile || !!bee?.stats.r_traits.pluviophile;
  const isChionophile =
    !!bee?.stats.d_traits.chionophile || !!bee?.stats.r_traits.chionophile;
  const isPolar =
    ["Any", "Polar"].includes(bee?.stats.d_traits.climate) ||
    ["Any", "Polar"].includes(bee?.stats.r_traits.climate);
  const isTropical =
    ["Any", "Tropical"].includes(bee?.stats.d_traits.climate) ||
    ["Any", "Tropical"].includes(bee?.stats.r_traits.climate);
  return (
    <Box border="hilight" className="overflow-clip text-wrap bg-dark">
      <div className="flex p-2">
        <span
          className="apico mr-5 bg-hilight p-2 font-apico text-sm text-dark"
          onClick={(e) => {
            e.preventDefault();
            onClick(e.shiftKey, "Any");
          }}
        >
          C
        </span>
        <div className="mr-3 flex gap-[37px]">
          <div
            className="relative"
            onClick={(e) => {
              e.preventDefault();
              onClick(e.shiftKey, "Pluviophile");
            }}
          >
            <img
              src={pluviophile}
              alt="Pluviophile"
              className={twMerge("crisp size-[30px]", !isPluviophile && "drop")}
            />
            <img
              src={chionophile}
              alt="Chionophile"
              className={twMerge(
                "crisp absolute left-0 top-0 size-[30px]",
                !isChionophile && "hidden",
              )}
            />
          </div>
          <span
            onClick={(e) => {
              e.preventDefault();
              onClick(e.shiftKey, "Polar");
            }}
          >
            <img
              src={polar}
              alt="Polar"
              className={twMerge("crisp size-[30px]", !isPolar && "drop")}
            />
          </span>
          <span
            onClick={(e) => {
              e.preventDefault();
              onClick(e.shiftKey, "Tropical");
            }}
          >
            <img
              src={tropical}
              alt="Tropical"
              className={twMerge("crisp size-[30px]", !isTropical && "drop")}
            />
          </span>
        </div>
      </div>
    </Box>
  );
};
