"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react"

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })

    tl.from(infoRef.current, {
      x: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    }).from(
      formRef.current,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setFormStatus({
        type: "success",
        message: "Your message has been sent successfully!",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-gradient-to-b from-background to-background/90">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div ref={infoRef} className="space-y-8">
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-gray-400">Email</p>
                    <p className="text-lg">contact@example.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-gray-400">Phone</p>
                    <p className="text-lg">+1 (123) 456-7890</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-gray-400">Location</p>
                    <p className="text-lg">San Francisco, CA</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-medium mb-4">Connect with me</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300"
                  >
                    <Github className="w-5 h-5 text-primary" />
                  </a>
                  <a
                    href="#"
                    className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300"
                  >
                    <Linkedin className="w-5 h-5 text-primary" />
                  </a>
                  <a
                    href="#"
                    className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300"
                  >
                    <Twitter className="w-5 h-5 text-primary" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

            {formStatus.type && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  formStatus.type === "success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                }`}
              >
                {formStatus.message}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="bg-black/30 border-white/10 focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Your Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="bg-black/30 border-white/10 focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  required
                  className="bg-black/30 border-white/10 focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={5}
                  required
                  className="bg-black/30 border-white/10 focus:border-primary"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-medium py-3 rounded-lg transition-all duration-300"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

