"use client"

import { useState, useEffect } from "react"
import { X, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"

export function ContactPopup({ language = "en" }: { language?: "en" | "de" }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 60000) // 1 minute

    return () => clearTimeout(timer)
  }, [])

  const handleEmailClick = () => {
    toast({
      title: language === "en" ? "Opening email client" : "E-Mail-Client wird geöffnet",
      description:
        language === "en" ? "Redirecting to your email application." : "Weiterleitung zu Ihrer E-Mail-Anwendung.",
    })
  }

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsVisible(false)}></div>
          <div className="relative max-w-md w-full bg-[#f0ede8] rounded-2xl shadow-lg p-6 border border-gray-200">
            <Button
              variant="outline"
              size="icon"
              className="absolute top-3 right-3 rounded-full h-8 w-8 p-0 z-10"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">{language === "en" ? "Close" : "Schließen"}</span>
            </Button>

            {/* Centered doodle image */}
            <div className="flex justify-center mb-4">
              <Image src="/doodle.png" alt="Doodle" width={120} height={30} className="object-contain" />
            </div>

            {/* Content */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-3 text-gray-800">
                {language === "en"
                  ? "The best conversations start with a simple 'hello'."
                  : "Die besten Gespräche beginnen mit einem einfachen 'Hallo'."}
              </h2>

              <p className="text-gray-600 mb-6">
                {language === "en"
                  ? "Curious how we can help each other grow? Let's chat, challenge ideas, and explore smarter ways to improve your business — it all starts with one email"
                  : "Neugierig, wie wir gemeinsam wachsen können? Lassen Sie uns plaudern, Ideen austauschen und intelligentere Wege zur Verbesserung Ihres Unternehmens erkunden — alles beginnt mit einer E-Mail"}
              </p>

              <a
                href="mailto:bhanusandeepreddy@gmail.com"
                className="inline-block bg-[#ff7a6b] hover:bg-[#ff6a59] text-white font-medium py-3 px-6 rounded-full transition-colors shadow-sm"
                onClick={handleEmailClick}
              >
                {language === "en" ? "Send Email!" : "E-Mail senden!"}
              </a>
            </div>
          </div>
        </div>
      )}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-2 right-2 rounded-full shadow-lg"
        onClick={() => setIsVisible(true)}
      >
        <Mail className="h-6 w-6" />
        <span className="sr-only">{language === "en" ? "Contact" : "Kontakt"}</span>
      </Button>
    </>
  )
}

export default ContactPopup
