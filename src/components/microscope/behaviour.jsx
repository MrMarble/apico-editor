import { Box } from "../box/Box";
import diurnal from "../../assets/diurnal.png";
import nocturnal from "../../assets/nocturnal.png";
import crepuscular from "../../assets/crepuscular.png";
import { twMerge } from "tailwind-merge";

export const Behaviour = ({ bee, onClick }) => {
  const isDiurnal =
    ["Diurnal", "Cathemeral"].includes(bee?.stats.d_traits.behaviour) ||
    ["Diurnal", "Cathemeral"].includes(bee?.stats.r_traits.behaviour);

  const isNocturnal =
    ["Nocturnal", "Cathemeral"].includes(bee?.stats.d_traits.behaviour) ||
    ["Nocturnal", "Cathemeral"].includes(bee?.stats.r_traits.behaviour);

  const isCrepuscular =
    ["Crepuscular", "Cathemeral"].includes(bee?.stats.d_traits.behaviour) ||
    ["Crepuscular", "Cathemeral"].includes(bee?.stats.r_traits.behaviour);
  return (
    <Box border="hilight" className="overflow-clip text-wrap bg-dark">
      <div className="flex p-2">
        <span
          className="apico mr-5 bg-hilight p-2 font-apico text-sm text-dark"
          onClick={(e) => {
            e.preventDefault();
            onClick(e.shiftKey, "Cathemeral");
          }}
        >
          b
        </span>
        <div className="mr-3 flex gap-[37px]">
          <span
            onClick={(e) => {
              e.preventDefault();
              onClick(e.shiftKey, "Diurnal");
            }}
          >
            <img
              src={diurnal}
              alt="Diurnal"
              className={twMerge("crisp size-[30px]", !isDiurnal && "drop")}
            />
          </span>
          <span
            onClick={(e) => {
              e.preventDefault();
              onClick(e.shiftKey, "Nocturnal");
            }}
          >
            <img
              src={nocturnal}
              alt="Nocturnal"
              className={twMerge("crisp size-[30px]", !isNocturnal && "drop")}
            />
          </span>
          <span
            onClick={(e) => {
              e.preventDefault();
              onClick(e.shiftKey, "Crepuscular");
            }}
          >
            <img
              src={crepuscular}
              alt="Crepuscular"
              className={twMerge("crisp size-[30px]", !isCrepuscular && "drop")}
            />
          </span>
        </div>
      </div>
    </Box>
  );
};
