"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import ThreeScene from "./three-scene"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline()

    tl.from(textRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })

    gsap.to(heroRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: 200,
      opacity: 0.5,
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ThreeScene />
      </div>
      <div ref={textRef} className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          Software Developer
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Creating exceptional digital experiences with cutting-edge technologies
        </p>
        <Button
          size="lg"
          onClick={scrollToContact}
          className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Hire Me
        </Button>
      </div>
    </section>
  )
}

