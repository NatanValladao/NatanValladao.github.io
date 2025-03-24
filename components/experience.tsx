"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Briefcase, Calendar, Building } from "lucide-react"

const experiences = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    period: "Jan 2022 - Present",
    description:
      "Leading the frontend development team in building scalable and performant web applications. Implementing modern frontend architecture and best practices.",
  },
  {
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    period: "Mar 2020 - Dec 2021",
    description:
      "Developed and maintained full-stack applications using React, Node.js, and MongoDB. Collaborated with cross-functional teams to deliver high-quality software products.",
  },
  {
    title: "Mobile App Developer",
    company: "AppWorks Studio",
    period: "Jun 2018 - Feb 2020",
    description:
      "Built native and cross-platform mobile applications using Flutter and React Native. Implemented complex UI designs and integrated with backend services.",
  },
  {
    title: "Junior Web Developer",
    company: "WebCraft Agency",
    period: "Jan 2017 - May 2018",
    description:
      "Developed responsive websites and web applications using HTML, CSS, and JavaScript. Worked closely with designers to implement pixel-perfect UIs.",
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (timelineRef.current) {
      const timelineItems = timelineRef.current.querySelectorAll(".timeline-item")
      const timelineLine = timelineRef.current.querySelector(".timeline-line")

      gsap.from(timelineLine, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          scrub: 1,
        },
        scaleY: 0,
        transformOrigin: "top",
        ease: "none",
      })

      timelineItems.forEach((item, index) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
          duration: 0.8,
          ease: "power3.out",
        })
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="py-20 bg-gradient-to-b from-background/90 to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          Work <span className="text-primary">Experience</span>
        </h2>

        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform -translate-x-1/2" />

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`timeline-item relative mb-12 ${
                index % 2 === 0 ? "md:pr-12 md:text-right md:ml-0 md:mr-auto" : "md:pl-12 md:ml-auto md:mr-0"
              } md:w-[calc(50%-24px)] w-full`}
            >
              <div
                className={`absolute top-0 ${
                  index % 2 === 0 ? "md:right-0 left-0 md:left-auto" : "left-0"
                } w-12 h-12 rounded-full bg-primary/20 border-4 border-background flex items-center justify-center transform translate-x-[-50%] md:translate-x-[50%] ${
                  index % 2 === 0 ? "md:translate-x-[50%]" : "translate-x-[-50%]"
                }`}
              >
                <Briefcase className="w-5 h-5 text-primary" />
              </div>

              <div className="p-6 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 shadow-lg">
                <h3 className="text-xl font-semibold text-white">{exp.title}</h3>

                <div className="flex items-center space-x-2 mt-2 mb-3 text-gray-300">
                  <Building className="w-4 h-4 text-primary" />
                  <span>{exp.company}</span>
                </div>

                <div className="flex items-center space-x-2 mb-4 text-gray-400">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{exp.period}</span>
                </div>

                <p className="text-gray-300">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

