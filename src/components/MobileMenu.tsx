import { useEffect, useId, useState } from "react"

import type { NavItem } from "@/data/site"
import { cn } from "@/lib/utils"

type Props = { items: NavItem[]; currentPath: string }

export default function MobileMenu({ items, currentPath }: Props) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
        className="relative size-8 cursor-pointer lg:hidden"
      >
        <span
          className={cn(
            "absolute inset-x-0 top-0 h-1 w-8 bg-ink transition-transform duration-300 ease-in-out",
            open ? "translate-y-3.5 rotate-45" : "translate-y-1"
          )}
        />
        <span
          className={cn(
            "absolute inset-x-0 bottom-0 h-1 w-8 bg-ink transition-transform duration-300 ease-in-out",
            open ? "-translate-y-3.5 -rotate-45" : "-translate-y-1"
          )}
        />
      </button>

      <div
        id={panelId}
        inert={!open}
        className={cn(
          "absolute inset-x-0 top-full grid transition-[grid-template-rows] duration-400 ease-in-out lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="Main"
            className="flex flex-col items-center gap-3 border-b border-ink bg-red px-4.5 pt-6 pb-4.5 sm:px-6 sm:pb-6 md:px-9 md:pb-9"
          >
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-current={item.href === currentPath ? "page" : undefined}
                {...(item.external ? { target: "_blank", rel: "noopener" } : {})}
                className="flex w-full items-center justify-center border border-ink py-6 font-heading text-[1.33rem] leading-none font-bold tracking-[-0.01rem] text-ink uppercase transition-colors duration-200 hover:bg-ink hover:text-[#f9e8d8]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
