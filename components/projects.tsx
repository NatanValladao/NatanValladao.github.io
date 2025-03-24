"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce platform with product management, cart functionality, and payment integration.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Firebase", "Material UI", "Redux"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Fitness Tracker",
    description: "A mobile application for tracking workouts, nutrition, and fitness progress with data visualization.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Flutter", "Dart", "Firebase", "Charts"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Weather Dashboard",
    description: "A weather dashboard with location-based forecasts, historical data, and interactive maps.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["JavaScript", "OpenWeather API", "Chart.js", "Leaflet"],
    liveUrl: "#",
    githubUrl: "#",
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (projectsRef.current) {
      const projectCards = projectsRef.current.querySelectorAll(".project-card")

      gsap.from(projectCards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="py-20 bg-gradient-to-b from-background to-background/90">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          My <span className="text-primary">Projects</span>
        </h2>

        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group relative rounded-xl overflow-hidden shadow-lg shadow-primary/5 transition-all duration-500"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    hoveredIndex === index ? "scale-110" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70" />
              </div>

              <div className="relative p-6 bg-black/30 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center space-x-1 border-primary/30 text-primary hover:bg-primary/20"
                    asChild
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Live Demo
                    </a>
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center space-x-1 border-primary/30 text-primary hover:bg-primary/20"
                    asChild
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

