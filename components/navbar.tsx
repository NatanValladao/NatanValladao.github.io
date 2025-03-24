"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

const navItems = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMobile()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false)

    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-black/80 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <a href="#" className="text-2xl font-bold text-white">
            <span className="text-primary">Dev</span>Portfolio
          </a>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.href)
                }}
                className="text-gray-300 hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <Button
            className="hidden md:flex bg-primary hover:bg-primary/90 text-white"
            onClick={() => scrollToSection("#contact")}
          >
            Hire Me
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-primary/20" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-black/95 backdrop-blur-lg z-40">
          <nav className="flex flex-col items-center justify-center h-full space-y-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.href)
                }}
                className="text-xl text-gray-300 hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}

            <Button
              className="mt-4 bg-primary hover:bg-primary/90 text-white"
              onClick={() => scrollToSection("#contact")}
            >
              Hire Me
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

