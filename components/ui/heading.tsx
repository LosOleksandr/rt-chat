import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, HTMLAttributes } from "react";

const headingVariants = cva("text-primary whitespace-normal leading-tight", {
  variants: {
    variant: {
      thin: "font-thin",
      extralight: "font-extralight",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semi_bold: "font-bold",
      bold: "font-bold",
      extrbold: "font-extrbold",
    },
    size: {
      xs: "terxt-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
    },
  },
  defaultVariants: {
    variant: "normal",
    size: "md",
  },
});

type THeadingLevels = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type THeadingProps = {
  as: THeadingLevels;
  asChild?: boolean;
} & HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants>;

const Heading = forwardRef<HTMLHeadingElement, THeadingProps>(
  (
    { as: Tag, children, asChild = false, className, variant, size, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : Tag;

    return (
      <Comp
        ref={ref}
        className={headingVariants({ className, variant, size })}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

export default Heading;
