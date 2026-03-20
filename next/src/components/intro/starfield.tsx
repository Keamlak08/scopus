"use client"

import { useEffect, useRef } from "react"

interface StarfieldProps {
    mode: "idle" | "hyperspeed"
}

export default function Starfield({ mode }: StarfieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener("resize", resize)

        type Star = {
            x: number
            y: number
            z: number
            r: number
            opacity: number
        }

        const stars: Star[] = []
        const numStars = 280

        const cx = canvas.width / 2
        const cy = canvas.height / 2

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                z: Math.random(),
                r: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.7 + 0.1,
            })
        }
    
        let frame: number

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // have stars twinkle in idle mode
            if (mode === "idle") {
                stars.forEach(star => {
                    star.opacity += (Math.random() - 0.5) * 0.01
                    star.opacity = Math.max(0.1, Math.min(0.8, star.opacity))

                    ctx.beginPath()
                    ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI)
                    ctx.fillStyle = `rgba(200, 180, 255, ${star.opacity})`
                    ctx.fill()
                })
            } 

            if (mode === "hyperspeed") {

                // warp speed effect
                stars.forEach(star => {
                    const speed = star.z * 18 + 2
                    const dx = star.x - cx
                    const dy = star.y - cy
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1

                    star.x += (dx / dist) * speed
                    star.y += (dy / dist) * speed

                    if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
                        star.x = cx + (Math.random() - 0.5) * canvas.width
                        star.y = cy + (Math.random() - 0.5) * canvas.height
                        star.z = Math.random()
                    }

                    // stars get streaked in hyperspeed mode
                    const tailLength = star.z * 25 + 5
                    const tx = star.x - (dx / dist) * tailLength
                    const ty = star.y - (dy / dist) * tailLength

                    ctx.beginPath()
                    ctx.moveTo(tx, ty)
                    ctx.lineTo(star.x, star.y)
                    ctx.strokeStyle = `rgba(200, 180, 255, ${star.opacity})`
                    ctx.lineWidth = star.z * 1.5 + 0.3
                    ctx.stroke()
                })
            }

            frame = requestAnimationFrame(draw)
        }

        draw()

        // cleanup on unmount

        return () => {
            cancelAnimationFrame
            window.removeEventListener("resize", resize)
        }
    }, [mode])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full w-full h-full"
        />
    )
}