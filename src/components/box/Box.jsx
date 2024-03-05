import { twMerge } from "tailwind-merge";

/**
 *
 * @param {object} props
 * @param {("black"|"dark"|"light"|"hilight")} props.border
 * @returns
 */
export const Box = ({ children, border, className, as, ...props }) => {
  const borders = {
    black: "pix-black",
    dark: "pix-dark dark:pix-alt-base",
    light: "pix-light dark:pix-alt-light",
    hilight: "pix-hilight dark:pix-alt-hilight",
  };

  const Tag = as || "div";
  return (
    <Tag
      className={twMerge(
        borders[border],
        "pixel m-1 size-fit overflow-auto",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};
