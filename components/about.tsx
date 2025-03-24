"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })

    tl.from(textRef.current, {
      x: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    }).from(
      imageRef.current,
      {
        x: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4",
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-gradient-to-b from-background to-background/90">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div ref={textRef} className="space-y-6">
            <h3 className="text-2xl font-semibold text-primary">Software Developer & Problem Solver</h3>
            <p className="text-lg text-gray-300">
              I'm a passionate software developer with expertise in creating elegant solutions to complex problems. With
              a strong foundation in both frontend and backend technologies, I build applications that are not only
              functional but also provide exceptional user experiences.
            </p>
            <p className="text-lg text-gray-300">
              My journey in software development started 5 years ago, and since then, I've worked on a variety of
              projects ranging from web applications to mobile apps and enterprise solutions. I'm constantly learning
              and exploring new technologies to stay at the forefront of the industry.
            </p>
            <div className="pt-4">
              <a
                href="#contact"
                className="inline-block px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300"
              >
                Let's Connect
              </a>
            </div>
          </div>

          <div ref={imageRef} className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl shadow-primary/10">
            <Image src="/placeholder.svg?height=800&width=600" alt="Developer" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

