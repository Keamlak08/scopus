"use client"

import { useState, useEffect } from "react"
import Starfield from "@/components/intro/starfield"
import Telescope from "@/components/intro/telescope"

type Phase = "idle" | "zooming" | "hyperspeed" | "flash" | "done"

interface IntroProps {

    onComplete: () => void
}

export default function Intro({ onComplete }: IntroProps) {
    const [phase, setPhase] = useState<Phase>("idle")
    const [textVisible, setTextVisible] = useState(false)
    const [btnVisible,  setBtnVisible ] = useState(false)  
    const [drawn,       setDrawn      ] = useState(false)  
    const [letterCount, setLetterCount] = useState(0)  

    const title = "Scopus"
    useEffect(() => {
        const t1 = setTimeout(() => setDrawn(true), 400)
        const t2 = setTimeout(() => setTextVisible(true), 1800)
        const t3 = setTimeout(() => setBtnVisible(true), 3200)

        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
            clearTimeout(t3)
        }
    }, [])

    useEffect(() => {
        if (!textVisible) return
        if (letterCount >= title.length) return

        const t = setTimeout(() => {
            setLetterCount(count => count + 1)
        }, 120)

        return () => clearTimeout(t)
    }, [letterCount, textVisible])

    const handleStart = () => {
        setPhase("zooming")

        setTimeout(() => setPhase("hyperspeed"), 1200)
        setTimeout(() => setPhase("flash"), 2400)
        setTimeout(() => {
            setPhase("done")
            onComplete()
        }, 3400)
    }

    if (phase === "done") return null

    return (
        <div className={`
            fixed inset-0 z-[100]
            bg-bg-base
            flex flex-col items-center justify-center
            overflow-hidden
            transition-all duration-300
        `}>
            <Starfield mode={phase === "hyperspeed" ? "hyperspeed" : "idle"} />

            <Telescope drawn={drawn} zooming={phase === "zooming" || phase === "hyperspeed"} />
            
            {/* title text * */}
            <div className="relative z-10 flex flex-col items-center gap-8 pointer-events-none">

                <h1 className={`
                    font-display text-6xl font-light tracking-[0.3em]
                    text-text-base
                    transition-opacity duration-500
                    ${textVisible ? "opacity-100" : "opacity-0"}
                `}>
                    {title.slice(0, letterCount)}
                    {letterCount < title.length && (
                        <span className="animate-pulse text-accent-base">|</span>
                    )}
                </h1>
                
                {/* start button */}
                <button
                    onClick={handleStart}
                    className={`
                        pointer-events-auto
                        font-mono text-xs tracking-[0.3em] uppercase
                        border border-acccent-dim text-accent-base
                        px-8 py-3 rounded-sm
                        hover:bg-accent-base hover:text-bg-base
                        transition-all duration-300
                        ${btnVisible && phase === "idle" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                    `}
                >
                    Start
                </button>
            </div>
        </div>
    )
}