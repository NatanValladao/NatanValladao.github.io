"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code2, Database, Smartphone, Globe, Server, Layers } from "lucide-react"

const skills = [
  {
    title: "Frontend Development",
    icon: <Globe className="w-10 h-10 text-primary" />,
    description: "HTML, CSS, JavaScript, React, Next.js, Tailwind CSS",
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Backend Development",
    icon: <Server className="w-10 h-10 text-primary" />,
    description: "Node.js, Express, Python, Django, REST APIs",
    color: "from-green-500 to-emerald-400",
  },
  {
    title: "Mobile Development",
    icon: <Smartphone className="w-10 h-10 text-primary" />,
    description: "Flutter, React Native, iOS, Android",
    color: "from-purple-500 to-pink-400",
  },
  {
    title: "Database",
    icon: <Database className="w-10 h-10 text-primary" />,
    description: "MongoDB, PostgreSQL, MySQL, Firebase",
    color: "from-yellow-500 to-orange-400",
  },
  {
    title: "Programming Languages",
    icon: <Code2 className="w-10 h-10 text-primary" />,
    description: "JavaScript, TypeScript, Python, Dart, Java",
    color: "from-red-500 to-rose-400",
  },
  {
    title: "DevOps",
    icon: <Layers className="w-10 h-10 text-primary" />,
    description: "Docker, Kubernetes, CI/CD, AWS, Vercel",
    color: "from-indigo-500 to-violet-400",
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".skill-card")

      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="py-20 bg-gradient-to-b from-background/90 to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          My <span className="text-primary">Skills</span>
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card group relative p-6 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" />
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">{skill.icon}</div>
                <h3 className="text-xl font-semibold">{skill.title}</h3>
                <p className="text-gray-400">{skill.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

