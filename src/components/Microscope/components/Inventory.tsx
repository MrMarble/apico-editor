import { Box } from "@/components/Box";
import { Container } from "@/components/Container";
import { twJoin } from "tailwind-merge";

export const Inventory = ({ bees, selectedSlot, onClick }) => (
  <Container.Secondary>
    <div className="grid grid-cols-7 gap-4">
      {[...Array(14).keys()].map((i) => (
        <Box
          border="dark"
          key={i}
          onClick={() => {
            onClick(i);
          }}
          className={twJoin(
            "cursor-pointer",
            i === selectedSlot ? "bg-select-light pix-select-dark" : "",
          )}
          {...(bees[i] && {
            title: `${bees[i]?.stats.d_traits.species}-${bees[i]?.stats.r_traits.species}`,
          })}
        >
          <Box
            border="light"
            className={twJoin(
              "overflow-clip text-wrap",
              i === selectedSlot ? "pix-select-hilight" : "",
            )}
          >
            <div className="size-19">
              {bees[i] && (
                <img
                  src={`${import.meta.env.BASE_URL}/bees/${bees[i].stats.species}.png`}
                  className="crisp"
                />
              )}
            </div>
          </Box>
        </Box>
      ))}
    </div>
  </Container.Secondary>
);
