"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const LINKS = [
  { label: "Home",      href: "/" },
  { label: "About",     href: "/about" },
  { label: "Resources", href: "/resources" },
] as const

const CTA = { label: "RSVP & join", href: "/rsvp" }

export default function Nav() {
  const pathname = usePathname()

  const [scrolled, setScrolled] = useState(false)

  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <>
      {/* ── Fixed bar ─── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{

          background: scrolled
            ? "rgba(8, 6, 15, 0.92)"    // --color-bg-base at 92%
            : "rgba(8, 6, 15, 0.60)",   // --color-bg-base at 60%
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled
            ? "1px solid var(--color-border-base)"    // more visible when scrolled
            : "1px solid var(--color-border-dim)",    // subtle when at top
        }}
      >
        <div
          className="mx-auto flex items-center justify-between h-16"
          style={{
            maxWidth: "1160px",
            // Left padding clears the Hack Club flag (fixed at left:15px, width:75px)
            // Right padding stays symmetric for visual balance
            paddingLeft: "100px",
            paddingRight: "24px",
          }}
        >

          {/* ── Wordmark ── */}
          <Link href="/" className="flex items-center gap-2 no-underline group">
            <span
              className="text-xl font-bold tracking-tight"
              style={{
                color: "var(--color-text-base)",
                letterSpacing: "-0.02em",
              }}
            >
              scopus
            </span>
            {/* YSWS badge */}
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-sm"
              style={{
                background: "var(--color-accent)",
                color: "#fff",
                letterSpacing: "0.08em",

                position: "relative",
                top: "-1px",
              }}
            >
              YSWS
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-1.5 rounded-lg text-sm transition-all duration-200"
                style={{
                  color: isActive(href)
                    ? "var(--color-accent-light)"
                    : "var(--color-text-muted)",
                  background: isActive(href)
                    ? "rgba(167, 139, 250, 0.10)"
                    : "transparent",
                  fontWeight: isActive(href) ? 600 : 400,
                  borderBottom: isActive(href)
                    ? "2px solid rgba(167, 139, 250, 0.50)"
                    : "2px solid transparent",

                }}
                data-active={isActive(href)}
              >
                {label}
              </Link>
            ))}

            {/* ── RSVP ── */}
            <Link
              href={CTA.href}
              className="ml-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 hover:-translate-y-px"
              style={{
                background: "var(--color-accent)",
                color: "#fff",
                letterSpacing: "0.01em",
              }}
              // hover glow handled by .nav-cta in globals.css
            >
              {CTA.label}
            </Link>
          </nav>

          {/* ── Hamburger ── */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 rounded-lg"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(prev => !prev)}
            style={{ background: "transparent", border: "none", cursor: "pointer" }}
          >

            {([0, 1, 2] as const).map(i => (
              <span
                key={i}
                className="block rounded-sm transition-all duration-250"
                style={{
                  width: "22px",
                  height: "2px",
                  background: "var(--color-accent-light)",
                  transform:
                    menuOpen && i === 0 ? "translateY(7px) rotate(45deg)"  :
                    menuOpen && i === 2 ? "translateY(-7px) rotate(-45deg)" :
                    "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* ── Mobile menu (visible below md when menuOpen is true) ── */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: menuOpen ? "400px" : "0",
            borderTop: menuOpen ? "1px solid var(--color-border-dim)" : "none",
            background: "rgba(8, 6, 15, 0.97)",
          }}
        >
          <div className="flex flex-col gap-1 px-6 py-4">
            {[...LINKS, CTA].map(({ label, href }) => {
              const active = isActive(href)
              const isCTA = href === CTA.href

              return (
                <Link
                  key={href}
                  href={href}
                  className="block px-4 py-3 rounded-lg text-base transition-all duration-150"
                  style={{
                    color: isCTA ? "#fff" : active ? "var(--color-accent-light)" : "var(--color-text-muted)",
                    background: isCTA
                      ? "var(--color-hc-red)"
                      : active
                      ? "rgba(167, 139, 250, 0.10)"
                      : "transparent",
                    fontWeight: isCTA || active ? 700 : 400,
                    marginTop: isCTA ? "8px" : 0,
                  }}
                >
                  {label}
                </Link>
              )
            })}
          </div>
        </div>
      </header>
         {/* Spacer div to prevent content from being hidden behind the fixed navbar */}
      <div className="h-16" />
    </>
  )
}
