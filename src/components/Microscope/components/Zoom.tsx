import microscope from "@/assets/microscope.png";
import beeColors from "@/assets/beeColors.json";
import { Box } from "@/components/Box";

export const Zoom = ({ directSpecie, recessiveSpecie }) => (
  <Box border="dark" title={`${directSpecie}-${recessiveSpecie}`}>
    <Box border="hilight" className="overflow-clip text-wrap">
      <div className="relative w-[270px]">
        <img src={microscope} className="crisp w-full" />
        {directSpecie && (
          <>
            <img
              src={`${import.meta.env.BASE_URL}/bees/${directSpecie}_hd.png`}
              className="crisp absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <div className="absolute left-3 top-1 text-3xl font-black uppercase">
              <span style={`color: ${beeColors[directSpecie]};`}>
                {directSpecie[0]}
              </span>
              <span style={`color: ${beeColors[recessiveSpecie]};`}>
                {recessiveSpecie[0]}
              </span>
            </div>
          </>
        )}
      </div>
    </Box>
  </Box>
);
