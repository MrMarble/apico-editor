import { GripVertical } from "lucide-preact";
import { Box } from "../box/Box";
import "./container.css";
import { twJoin } from "tailwind-merge";

export const Container = ({ children, title, alt }) => {
  return (
    <Box
      border="black"
      className={twJoin(
        "size-auto min-w-[730px] text-center transition-all",
        alt && "dark",
      )}
    >
      <div className="overflow-auto border-b-4 border-dark bg-base dark:border-alt-dark dark:bg-alt-base">
        <Box
          className="flex h-auto w-auto items-center justify-between text-dark dark:text-alt-dark"
          as="div"
          border="light"
        >
          <GripVertical />
          <span className="font-apico text-xs text-white" title={title}>
            {title}
          </span>
          <GripVertical />
        </Box>
      </div>
      {children}
    </Box>
  );
};

const Primary = ({ children }) => (
  <div className="container-section overflow-auto bg-light dark:bg-alt-light">
    <Box border="hilight" className="size-auto p-4">
      {children}
    </Box>
  </div>
);

const Secondary = ({ children }) => (
  <div className="container-section overflow-auto bg-base">
    <Box border="light" className="container-section--secondary size-auto p-4">
      {children}
    </Box>
  </div>
);

Container.Primary = Primary;
Container.Secondary = Secondary;
