import { useEffect, useMemo, useState } from "preact/hooks";
import { Zoom } from "./components/Zoom";
import { Inventory } from "./components/Inventory";

import { Traits } from "./components/Traits";
import { Behaviour } from "./components/Behaviour";
import { Climate } from "./components/Climate";
import { useGlobalContext } from "../Context";
import { Container } from "../Container";
import { Box } from "../Box";
import { Bee, isBee } from "@/types/Player";

export const Microscope = () => {
  const { save, setTitle, setSave } = useGlobalContext();
  const [selectedSlot, setSelectedSlot] = useState(-1);

  const bees = useMemo(
    () =>
      Object.assign(
        {},
        ...save.player.slots
          .map((slot, i) => (isBee(slot) ? { [i + ""]: slot } : null))
          .filter(Boolean),
      ) as Record<string, Bee>,
    [save.player.slots],
  );

  const selectedBee = bees[Object.keys(bees)[selectedSlot]];

  useEffect(() => {
    setTitle("microscope");
  }, []);

  const onTraitClick = (shift: boolean, trait: string, value: string) => {
    if (!selectedBee) return;

    const slotIndex = Object.keys(bees)[selectedSlot] as unknown as number;
    const stat = shift ? "r_traits" : "d_traits";

    setSave((save) => {
      save.player.slots[slotIndex].stats[stat][trait] = value;
    });
  };

  const onBehaviourClick = (shift: boolean, value: string) => {
    if (!selectedBee) return;
    const slotIndex = Object.keys(bees)[selectedSlot] as unknown as number;
    const stat = shift ? "r_traits" : "d_traits";

    setSave((save) => {
      save.player.slots[slotIndex].stats[stat].behaviour = value;
    });
  };

  const onClimateClick = (shift: boolean, value: string) => {
    if (!selectedBee) return;
    const slotIndex = Object.keys(bees)[selectedSlot] as unknown as number;
    const stat = shift ? "r_traits" : "d_traits";

    setSave((save) => {
      if (value === "Pluviophile") {
        const pluviophile =
          save.player.slots[slotIndex].stats[stat].pluviophile;
        const chionophile =
          save.player.slots[slotIndex].stats[stat].chionophile;

        if (pluviophile && chionophile) {
          save.player.slots[slotIndex].stats[stat].pluviophile = 0;
          save.player.slots[slotIndex].stats[stat].chionophile = 1;
        } else if (pluviophile) {
          save.player.slots[slotIndex].stats[stat].pluviophile = 1;
          save.player.slots[slotIndex].stats[stat].chionophile = 1;
        } else if (chionophile) {
          save.player.slots[slotIndex].stats[stat].pluviophile = 0;
          save.player.slots[slotIndex].stats[stat].chionophile = 0;
        } else {
          save.player.slots[slotIndex].stats[stat].pluviophile = 1;
          save.player.slots[slotIndex].stats[stat].chionophile = 0;
        }
      } else {
        save.player.slots[slotIndex].stats[stat].climate = value;
      }
    });
  };

  return (
    <>
      <Container.Primary>
        <div className="flex gap-10">
          <div>
            <Box
              border="dark"
              {...(selectedBee && {
                title: `${selectedBee?.stats.d_traits.species}-${selectedBee?.stats.r_traits.species}`,
              })}
            >
              <Box border="hilight" className="overflow-clip text-wrap">
                <div className="size-19">
                  {selectedBee && (
                    <img
                      src={`${import.meta.env.BASE_URL}/bees/${selectedBee.stats.species}.png`}
                      className="crisp"
                    />
                  )}
                </div>
              </Box>
            </Box>
          </div>
          <div className="flex flex-col justify-between">
            <Traits bee={selectedBee} onClick={onTraitClick} />
            <Box border="dark">
              <Behaviour bee={selectedBee} onClick={onBehaviourClick} />
              <Climate bee={selectedBee} onClick={onClimateClick} />
            </Box>
          </div>
          <Zoom
            directSpecie={selectedBee?.stats.d_traits.species}
            recessiveSpecie={selectedBee?.stats.r_traits.species}
          />
        </div>
      </Container.Primary>
      <Inventory
        bees={Object.values(bees)}
        selectedSlot={selectedSlot}
        onClick={(i) => setSelectedSlot(i)}
      />
    </>
  );
};
