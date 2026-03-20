"use client"

import { useEffect, useRef } from "react"

interface TelescopeProps {
    drawn: boolean
    zooming: boolean
}

export default function Telescope({ drawn, zooming }: TelescopeProps) {
    const svgRef = useRef<SVGSVGElement>(null)

    useEffect(() => {
        const svg = svgRef.current
        if (!svg) return

        const paths = svg.querySelectorAll("path, line, circle, ellipse")

        paths.forEach(path => {
            const el = path as SVGPathElement


            const length = el.getTotalLength()

            if (!drawn) {
                el.style.strokeDasharray = `${length}`
                el.style.strokeDashoffset = `${length}`
                el.style.transition = "none"
            } else {
                el.style.strokeDasharray = `${length}`
                el.style.strokeDashoffset = "0"
                el.style.transition = "stroke-dashoffset 2 ease-in-out"
            }
        })
    }, [drawn])

    return (
        <div className={`
            absolute inset-0 flex items-center justify-center
            transition-transform duration-1000 ease-in-out
            ${zooming ? "scale-[8]" : "scale-100"}
        `}>

            <svg 
                ref={svgRef} 
                viewBox="0 0 100 100" 
                className="w-[600px] max-w-[90vw] opacity-60"
                fill="none"
                stroke="#a78bfa"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {/* main body */}
                <path d="M80 185 L80 215 L420 230 L420 170 Z" />

                {/* objective lens */}
                <ellipse cx="80" cy="200" rx="18" ry="42" />

                {/* eyepiece */}
                <ellipse cx="420" cy="200" rx="10" ry="28" />

                {/* focuser barrel */}
                <rect x="240" y="152" width="60" height="22" rx="4" />
                <rect x="248" y="140" width="44" height="14" rx="3" />

                {/* tripod mount ring*/}
                <path d="M280 230 L280 270"/>
                <ellipse cx="280" cy="200" rx="14" ry="18" />

                {/* tripod legs */}
                <path d="M280 270 L200 360" />
                <path d="M280 270 L280 370" />
                <path d="M280 270 L360 360" />

                {/* tripod leg supports */}
                <path d="M220 325 L280 340 L340 325" />

                {/* window frame */}
                <path d="M480 40 L480 370" />
                <path d="M540 40 L540 370" />
                <path d="M480 40 L540 40"  />
                <path d="M480 200 L540 200" />

                {/* wall lines */}
                <path d="M540 40  L600 20"  strokeOpacity="0.3" />
                <path d="M540 370 L600 390" strokeOpacity="0.3" />
                <path d="M600 20  L600 390" strokeOpacity="0.15" />

                {/* stars */}
                <circle cx="502" cy="90"  r="1.5" fill="#a78bfa" strokeWidth="0" fillOpacity="0.6" />
                <circle cx="520" cy="130" r="1"   fill="#a78bfa" strokeWidth="0" fillOpacity="0.4" />
                <circle cx="508" cy="160" r="1.2" fill="#a78bfa" strokeWidth="0" fillOpacity="0.5" />
                <circle cx="528" cy="80"  r="0.8" fill="#a78bfa" strokeWidth="0" fillOpacity="0.35"/>
            
            </svg>
        </div>
    )
}