"use client"

import { useState } from "react"
import Intro from "@/components/intro"

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)
  
  return (
    <main>
      
      {!introComplete && (
        <Intro onComplete={() => setIntroComplete(true)} />
      )}

      <div className={`
        transition-opacity duration-700
        ${introComplete ? "opacity-100" : "opacity-0"}
      `}>
        <h1 className="text-4xl text-text-base p-8">
          Welcome to Scopus
        </h1>
      </div>
    </main>
  )
}