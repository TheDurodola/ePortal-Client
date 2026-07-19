"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import campus1 from "@/assets/campus1.webp"
import campus2 from "@/assets/campus2.jpg"
import campus3 from "@/assets/campus3.webp"
import campus4 from "@/assets/campus4.jpg"

const SLIDES = [
  { src: campus1, alt: "Students in the school library" },
  { src: campus2, alt: "School assembly hall" },
  { src: campus3, alt: "Classroom in session" },
  { src: campus4, alt: "Classroom" },
]

const INTERVAL_MS = 300000

export function AuthBackgroundSlideshow() {
  const [index, setIndex] = React.useState(0)
  const prefersReducedMotion = usePrefersReducedMotion()

  React.useEffect(() => {
    if (prefersReducedMotion) return // don't auto-advance for users who opted out of motion

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length)
    }, INTERVAL_MS)

    return () => clearInterval(id)
  }, [prefersReducedMotion])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {SLIDES.map((slide, i) => (
        <Image
          key={slide.alt}
          src={slide.src}
          alt="" // decorative background, empty alt is correct here, not slide.alt
          fill
          priority={i === 0}
          sizes="100vw"
          className={cn(
            "object-cover transition-opacity duration-1000 ease-in-out",
            i === index ? "opacity-100" : "opacity-0"
          )}
        />
      ))}
      {/* scrim so text/card content stays readable regardless of image content */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  )
}

function usePrefersReducedMotion() {
  const [prefers, setPrefers] = React.useState(false)

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefers(mq.matches)

    const listener = (e: MediaQueryListEvent) => setPrefers(e.matches)
    mq.addEventListener("change", listener)
    return () => mq.removeEventListener("change", listener)
  }, [])

  return prefers
}