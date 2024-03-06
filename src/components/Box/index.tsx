import { ComponentChildren } from "preact";
import { HTMLAttributes } from "preact/compat";
import { twMerge } from "tailwind-merge";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children: ComponentChildren;
  border: "black" | "dark" | "light" | "hilight";
  className?: string;
}

export const Box = ({ children, border, className, ...props }: BoxProps) => {
  const borders = {
    black: "pix-black",
    dark: "pix-dark dark:pix-alt-base",
    light: "pix-light dark:pix-alt-light",
    hilight: "pix-hilight dark:pix-alt-hilight",
  };

  return (
    <div
      {...props}
      className={twMerge(
        borders[border],
        "pixel m-1 size-fit overflow-auto",
        className,
      )}
    >
      {children}
    </div>
  );
};
