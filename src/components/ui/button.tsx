import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-0.75 self-center font-heading font-bold text-ink uppercase no-underline relative top-0 transition-[opacity,top,box-shadow] duration-100 outline-none focus-visible:ring-2 focus-visible:ring-paper active:opacity-60 lg:hover:top-1.5 max-sm:w-full disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-red shadow-[0_6px_0_0_var(--color-red-shade)] lg:hover:shadow-[0_0_0_0_var(--color-red-shade)]",
        secondary: "bg-paper shadow-[0_6px_0_0_var(--color-paper-shade)] lg:hover:shadow-[0_0_0_0_var(--color-paper-shade)]",
      },
      size: {
        default: "p-4.5 text-[1.25rem] leading-[110%] tracking-[-0.02ch] md:text-[1.333rem]",
        s: "p-3 text-base leading-[110%] tracking-[-0.02ch] max-lg:w-full",
        // Height equals one 110% line plus the default size's padding, so it lines up with default text buttons.
        icon: "aspect-square h-[calc(1.1em+2.25rem)] p-0 text-[1.25rem] md:text-[1.333rem] max-sm:w-auto [&_svg]:size-[1.5em]",
        "icon-s": "size-8 p-0 max-sm:w-8 [&_svg]:size-5",
      },
      full: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  full,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, full, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
