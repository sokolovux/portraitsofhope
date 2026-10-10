import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-0.75 self-center font-heading font-bold text-ink uppercase no-underline transition-[opacity,transform,box-shadow] duration-100 outline-none focus-visible:ring-2 focus-visible:ring-paper active:opacity-60 lg:hover:translate-y-1.5 lg:hover:shadow-none max-sm:w-full disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-red shadow-[0_6px_0_0_var(--color-red-shade)]",
        secondary: "bg-paper shadow-[0_6px_0_0_#d9d9d9]",
      },
      size: {
        default: "p-4.5 text-[1.25rem] leading-[110%] tracking-[-0.02ch] md:text-[1.333rem]",
        s: "p-3 text-base leading-[110%] tracking-[-0.02ch] max-lg:w-full",
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
