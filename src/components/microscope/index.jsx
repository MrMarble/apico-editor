import { useEffect, useMemo, useState } from "preact/hooks";
import { Box, Container, useGlobalContext } from "..";
import { Zoom } from "./zoom";
import { Inventory } from "./inventory";

import { Traits } from "./traits";
import { Behaviour } from "./behaviour";
import { Climate } from "./climate";

/**
 * @typedef {Object} Bee
 * @property {string} item
 * @property {Object} stats
 * @property {string} stats.species
 * @property {string} stats.beetrice
 * @property {string} stats.queen
 * @property {Traits} stats.d_traits
 * @property {Traits} stats.r_traits
 */

/**
 * @typedef {Object} Traits
 * @property {number} aggresive
 * @property {string} behaviour
 * @property {number} chionophile
 * @property {string} climate
 * @property {string} fertility
 * @property {string} lifespan
 * @property {number} pluviophile
 * @property {string} productivity
 * @property {string} species
 * @property {string} stability
 */

export const Microscope = () => {
  const { save, setTitle, setSave } = useGlobalContext();
  const [selectedSlot, setSelectedSlot] = useState();

  const bees = useMemo(
    () =>
      Object.assign(
        {},
        ...save.player.slots
          .map((slot, i) => (slot.item === "bee" ? { [i]: slot } : null))
          .filter(Boolean),
      ),
    [save.player.slots],
  );
  //const bees = save.player.slots.filter((slot) => slot?.item === "bee");

  /** @type {Bee} */
  const selectedBee = bees[Object.keys(bees)[selectedSlot]];
  console.log(selectedBee);
  useEffect(() => {
    setTitle("microscope");
  }, []);

  const onTraitClick = (shift, trait, value) => {
    if (!selectedBee) return;

    const slotIndex = Object.keys(bees)[selectedSlot];
    const stat = shift ? "r_traits" : "d_traits";

    setSave((save) => {
      save.player.slots[slotIndex].stats[stat][trait] = value;
    });
  };

  const onBehaviourClick = (shift, value) => {
    if (!selectedBee) return;
    const slotIndex = Object.keys(bees)[selectedSlot];
    const stat = shift ? "r_traits" : "d_traits";

    setSave((save) => {
      save.player.slots[slotIndex].stats[stat].behaviour = value;
    });
  };

  const onClimateClick = (shift, value) => {
    if (!selectedBee) return;
    const slotIndex = Object.keys(bees)[selectedSlot];
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
