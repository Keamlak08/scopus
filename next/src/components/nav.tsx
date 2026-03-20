"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function Nav() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav className={`
        fixed top-0 left-0 right-0 z-50
        flex items-center justify-between
        px-8 py-5
        border-b border-transparent
        transition-all duration-300
        ${scrolled ? "bg-bg-surface/90 backdrop-blur-md border-border-dim" : ""}
    `}>
        
        {/* Logo */}
        <Link href="/" className="font display text-xl font-semibold tracking-widest text-accent-base">
            Scopus
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
            {[
                ["About", "#about"],
                ["Tiers", "#tiers"],
                ["Instruments", "#instruments"],
                ["How It Works", "#how"],
            ].map(([label, href]) => (
                <li key={href}>
                    <Link 
                      href={href} 
                      className="font-mono text-xs tracking-widest uppercase text-text-muted hover:text-accent-base transition-colors"
                    >
                      {label}
                    </Link>
                </li>
            ))}
        </ul>

        {/* rsvp button */}
        <Link
            href="#rsvp"
            className="font-mono text-xs tracking-widest uppercase bg-accent-base text-bg-base px-5 py-2 rounded-sm hover:bg-accent-light transition-colors"
        >
            RSVP
        </Link>
        
        </nav> 
    )
}
