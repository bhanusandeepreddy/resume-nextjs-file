"use client"

import { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { track } from '@vercel/analytics'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ContactPopup } from '@/components/ContactPopup'
import { Toaster } from "@/components/ui/toaster"

const translations = {
  en: {
    name: "Bhanu Sandeep Reddy Chirra",
    title: "V&V Engineer - Business Analyst",
    experience: "Experience",
    education: "Education",
    projects: "Projects",
    skills: "Skills",
    certifications: "Certifications",
    languages: "Languages",
    programmingLanguages: "Programming Languages",
    testingTools: "Testing Tools",
    methodologies: "Methodologies",
    workExperience: "Work Experience",
    entwicklungsEngineer: "Development Engineer, IAV GmbH",
    entwicklungsEngineer1: "Development Engineer, PEPP GmbH & Co KG",
    designEngineer: "Design Engineer, IAV GmbH",
    masters: "MS in Scientific Instrumentation",
    bachelors: "B.Tech in Mechanical Engineering",
    project1: "Automated Test Framework for IoT Devices",
    project2: "AI-Powered Test Case Generation Tool",
    project3: "Performance Testing Dashboard",
    allRightsReserved: "All rights reserved.",
    welcome: "Welcome!",
    thankYou: "Thank you for visiting. I hope you find the information you're looking for.",
    cookieMessage: "This site uses cookies to enhance your browsing experience and provide analytics. Do you accept the use of cookies?",
    acceptCookies: "Yes, I accept",
    declineCookies: "No, thanks"
  },
  de: {
    name: "Bhanu Sandeep Reddy Chirra",
    title: "V&V Ingenieur - Business Analyst",
    experience: "Erfahrung",
    education: "Ausbildung",
    projects: "Projekte",
    skills: "Fähigkeiten",
    certifications: "Zertifizierungen",
    languages: "Sprachen",
    programmingLanguages: "Programmiersprachen",
    testingTools: "Testwerkzeuge",
    methodologies: "Methodiken",
    workExperience: "Berufserfahrung",
    entwicklungsEngineer: "Entwicklungsingenieur, IAV GmbH",
    entwicklungsEngineer1: "Entwicklungsingenieur, PEPP GmbH & Co KG",
    designEngineer: "Konstrukteur, PEPP GmbH",
    masters: "Master in Scientific Instrumentation",
    bachelors: "Bachelor in Machinenbau",
    project1: "Automatisiertes Testframework für IoT-Geräte",
    project2: "KI-gestütztes Testfall-Generierungstool",
    project3: "Performance-Testing-Dashboard",
    allRightsReserved: "Alle Rechte vorbehalten.",
    welcome: "Willkommen!",
    thankYou: "Danke für Ihren Besuch. Ich hoffe, Sie finden die Informationen, die Sie suchen.",
    cookieMessage: "Diese Website verwendet Cookies, um Ihr Browsing-Erlebnis zu verbessern und Analysen bereitzustellen. Akzeptieren Sie die Verwendung von Cookies?",
    acceptCookies: "Ja, ich akzeptiere",
    declineCookies: "Nein, danke"
  }
}

function WelcomePopup({ language }: { language: 'en' | 'de' }) {
  const [isOpen, setIsOpen] = useState(false)
  const t = translations[language]

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenWelcomePopup')
    if (!hasSeenPopup) {
      setIsOpen(true)
    }
  }, [])

  const handleClose = (accepted: boolean) => {
    setIsOpen(false)
    localStorage.setItem('hasSeenWelcomePopup', 'true')
    track('Welcome Popup', { accepted })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white shadow-lg rounded-lg">
        <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-gray-900">{t.welcome}</DialogTitle>
          <DialogDescription className="text-gray-600">
            {t.thankYou}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center py-4">
          <Image
            src="/bhanu.jpg?height=200&width=200"
            alt="Welcome"
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>
        <DialogDescription>
          {t.cookieMessage}
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleClose(false)}>
            {t.declineCookies}
          </Button>
          <Button onClick={() => handleClose(true)}>{t.acceptCookies}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function Resume() {
  const [activeSection, setActiveSection] = useState<'experience' | 'education' | 'projects'>('experience')
  const [language, setLanguage] = useState<'en' | 'de'>('en')
  const t = translations[language]

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0]
    setLanguage(browserLang === 'de' ? 'de' : 'en')
  }, [])

  const handleSectionChange = (section: 'experience' | 'education' | 'projects') => {
    setActiveSection(section)
    track('Section Changed', { section })
  }

  const handleLanguageChange = (lang: 'en' | 'de') => {
    setLanguage(lang)
    track('Language Changed', { language: lang })
  }

  return (
    <div className="max-w-4xl mx-auto p-8 pt-16 bg-white text-gray-800 font-serif relative">
      <WelcomePopup language={language} />
      <div className="absolute top-1 right-1 p-0.5 space-x-2">
        <Button
          variant={language === 'en' ? 'default' : 'outline'}
          onClick={() => setLanguage('en')}
          className={`w-8 h-8 p-0 text-1xl ${language === 'en' ? 'bg-black text-white' : ''}`}
          aria-label="Switch to English"
        >
          🇬🇧
        </Button>
        <Button
          variant={language === 'de' ? 'default' : 'outline'}
          onClick={() => setLanguage('de')}
          className={`w-8 h-8 p-0 text-1xl ${language === 'de' ? 'bg-black text-white' : ''}`}
          aria-label="Auf Deutsch umschalten"
        >
          🇩🇪
        </Button>
      </div>

      <header className="mb-8 border-b-3 border-navy pb-4">
        <h1 className="text-4xl font-sans font-bold text-navy">{t.name}</h1>
        <h2 className="text-xl text-gray-600">{t.title}</h2>
        <div className="flex flex-wrap gap-4 mt-2 text-sm">
          <a href="tel:+4917643882710" className="flex items-center hover:text-navy transition-colors">
            <Phone size={16} className="mr-2 text-navy" />
            (176) 4388-2710
          </a>
          <a href="mailto:bhanusandeepreddy@gmail.com" className="flex items-center hover:text-navy transition-colors">
            <Mail size={16} className="mr-2 text-navy" />
            bhanusandeepreddy@gmail.com
          </a>
          <a href="https://www.google.com/maps/search/?api=1&query=Frankfurt,DE" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-navy transition-colors">
            <MapPin size={16} className="mr-2 text-navy" />
            Frankfurt, DE
          </a>
          <a href="https://www.linkedin.com/in/bhanusandeep" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-navy transition-colors">
            <Linkedin size={16} className="mr-2 text-navy" />
            linkedin.com/in/bhanusandeep
          </a>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <section className="mb-6">
            <h3 className="text-lg font-sans font-semibold text-navy border-b border-gray-300 mb-2">{t.skills}</h3>
            <div className="space-y-2">
              <SkillCategory name={t.programmingLanguages} skills={["Python", "Matlab"]} />
              <SkillCategory name={t.testingTools} skills={["ecu.test", "vTESTstudio"]} />
              <SkillCategory name={t.methodologies} skills={["Agile", "TDD", "BDD", "CI/CD"]} />
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-lg font-sans font-semibold text-navy border-b border-gray-300 mb-2">{t.certifications}</h3>
            <ul className="list-disc list-inside">
              <li>{language === 'en' ? 'ISTQB Certified Engineer' : 'ISTQB zertifizierter ingenieur'}</li>
              <li>{language === 'en' ? 'IREB Requirements Engineer' : 'IREB Anforderungsingenieur'}</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-sans font-semibold text-navy border-b border-gray-300 mb-2">{t.languages}</h3>
            <ul className="list-disc list-inside">
              <li>{language === 'en' ? 'Telugu (Native)' : 'Telugu (Muttersprache)'}</li>
              <li>{language === 'en' ? 'English (Fluent)' : 'English (Fleißend)'}</li>
              <li>{language === 'en' ? 'German (Intermediate)' : 'Deutsch (mittelstufe)'}</li>
            </ul>
          </section>
        </div>

        <div className="md:col-span-2">
        <div className="flex space-x-2 mb-4">
            <Button
              variant={activeSection === 'experience' ? 'default' : 'outline'}
              onClick={() => setActiveSection('experience')}
              className={activeSection === 'experience' ? 'bg-black text-white' : ''}
            >
              {t.experience}
            </Button>
            <Button
              variant={activeSection === 'education' ? 'default' : 'outline'}
              onClick={() => setActiveSection('education')}
              className={activeSection === 'education' ? 'bg-black text-white' : ''}
            >
              {t.education}
            </Button>
            <Button
              variant={activeSection === 'projects' ? 'default' : 'outline'}
              onClick={() => setActiveSection('projects')}
              className={activeSection === 'projects' ? 'bg-black text-white' : ''}
            >
              {t.projects}
            </Button>
          </div>

          {activeSection === 'experience' && (
            <section>
              <h3 className="text-lg font-sans font-semibold text-navy border-b border-gray-300 mb-2">{t.workExperience}</h3>
              <div className="mb-4">
                <h4 className="font-semibold">{t.entwicklungsEngineer}</h4>
                <p className="text-sm text-gray-600">{language === 'en' ? 'January 2019 - Present' : 'Januar 2019 - heute'}</p>
                <ul className="list-disc list-inside mt-2">
                  <li>{language === 'en' ? 'Developed test processes and built functional test cases using IBM DOORS' : 'Entwickelte Testprozesse und erstellte funktionale Testfälle mit IBM DOORS'}</li>
                  <li>{language === 'en' ? 'Implemented tests in vTest Studio and maintained Jira Kanban Board for ticketing system' : 'Implementierte Tests in vTest Studio und pflegte Jira Kanban Board für das Ticketsystem'}</li>
                  <li>{language === 'en' ? 'Analyzed and reviewed requirements for testability, supporting Requirements Engineers in AD projects' : 'Analysierte und überprüfte Anforderungen auf Testbarkeit, unterstützte Anforderungsingenieure in AD-Projekten'}</li>
                  <li>{language === 'en' ? 'Automated test result processing using VBA and developed Python tools with GUI for repetitive tasks' : 'Automatisierte die Verarbeitung von Testergebnissen mit VBA und entwickelte Python-Tools mit GUI für sich wiederholende Aufgaben'}</li>
                  <li>{language === 'en' ? 'Researched automotive regulations and physical differences in objects across countries' : 'Recherchierte Automobilvorschriften und physikalische Unterschiede von Objekten in verschiedenen Ländern'}</li>
                </ul>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold">{t.entwicklungsEngineer1}</h4>
                <p className="text-sm text-gray-600">{language === 'en' ? 'September 2018 - December 2018' : 'September 2018 - Dezember 2018'}</p>
                <ul className="list-disc list-inside mt-2">
                  <li>{language === 'en' ? 'Participated in Automated Driving project for an OEM using Simulink and Matlab' : 'Beteiligte sich an einem Projekt für automatisiertes Fahren für einen OEM unter Verwendung von Simulink und Matlab'}</li>
                  <li>{language === 'en' ? 'Performed ECU Unit Tests for ASPICE Standards' : 'Führte ECU-Unit-Tests für ASPICE-Standards durch'}</li>
                </ul>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold">{t.designEngineer}</h4>
                <p className="text-sm text-gray-600">{language === 'en' ? 'February 2018 - August 2018' : 'Februar 2018 - August 2018'}</p>
                <ul className="list-disc list-inside mt-2">
                  <li>{language === 'en' ? 'Designed 3D Printed Water Jacket for Single Cylinder Engine (Prototype)' : 'Entwarf 3D-gedruckten Wassermantel für Einzylindermotor (Prototyp)'}</li>
                  <li>{language === 'en' ? 'Designed Cylinder Heads for various OEMs considering manufacturing through Casting' : 'Entwarf Zylinderköpfe für verschiedene OEMs unter Berücksichtigung der Herstellung durch Gießen'}</li>
                </ul>
              </div>
            </section>
          )}

          {activeSection === 'education' && (
            <section>
              <h3 className="text-lg font-sans font-semibold text-navy border-b border-gray-300 mb-2">{t.education}</h3>
              <div className="mb-4">
                <h4 className="font-semibold">{t.masters}</h4>
                <p>Fachhochschule Jena, 2014-2018</p>
                <ul className="list-disc list-inside mt-2">
                  <li>{language === 'en' ? 'Grade: 1.7' : 'Note: 1,7'}</li>
                  <li>{language === 'en' ? 'Activities: AIESEC Engineering Manager' : 'Aktivitäten: AIESEC Engineering Manager'}</li>
                  <li>{language === 'en' ? 'Specialization in Advanced Design (Autodesk Inventor), Finite Element Methods (ANSYS), Scientific Computing (Matlab) and Material Sensors' : 'Spezialisierung in Advanced Design (Autodesk Inventor), Finite-Elemente-Methoden (ANSYS), Scientific Computing (Matlab) und Materialsensoren'}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">{t.bachelors}</h4>
                <p>Jawaharlal Nehru Technological University, 2009-2013</p>
                <ul className="list-disc list-inside mt-2">
                  <li>{language === 'en' ? 'Grade: 73%' : 'Note: 73%'}</li>
                  <li>{language === 'en' ? 'Activities: Debate Organizing Team for LITAM Quest 2k11, Overall Co-ordinator for LITAM Quest 2k12, NSS Member of the College, ISTE Member, IE Member' : 'Aktivitäten: Organisationsteam für Debatten bei LITAM Quest 2k11, Gesamtkoordinator für LITAM Quest 2k12, NSS-Mitglied des Colleges, ISTE-Mitglied, IE-Mitglied'}</li>
                </ul>
              </div>
            </section>
          )}

          {activeSection === 'projects' && (
            <section>
              <h3 className="text-lg font-sans font-semibold text-navy border-b border-gray-300 mb-2">{t.projects}</h3>
              <div className="mb-4">
                <h4 className="font-semibold">{t.project1}</h4>
                <p className="text-sm text-gray-600">January 2020 - June 2020</p>
                <ul className="list-disc list-inside mt-2">
                  <li>{language === 'en' ? 'Developed a scalable test automation framework for IoT devices using Python and MQTT protocol' : 'Entwickelte ein skalierbares Testautomatisierungsframework für IoT-Geräte unter Verwendung von Python und dem MQTT-Protokoll'}</li>
                  <li>{language === 'en' ? 'Reduced manual testing effort by 60% and improved device reliability by 25%' : 'Reduzierte den manuellen Testaufwand um 60% und verbesserte die Gerätezuverlässigkeit um 25%'}</li>
                  <li>{language === 'en' ? 'Implemented parallel test execution, increasing test throughput by 300%' : 'Implementierte parallele Testausführung, wodurch der Testdurchsatz um 300% erhöht wurde'}</li>
                </ul>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold">{t.project2}</h4>
                <p className="text-sm text-gray-600">July 2019 - December 2019</p>
                <ul className="list-disc list-inside mt-2">
                  <li>{language === 'en' ? 'Created a machine learning model to generate test cases based on code changes using TensorFlow and NLP techniques' : 'Erstellte ein maschinelles Lernmodell zur Generierung von Testfällen basierend auf Codeänderungen unter Verwendung von TensorFlow und NLP-Techniken'}</li>
                  <li>{language === 'en' ? 'Increased test coverage by 35% and identified edge cases missed by manual testing' : 'Erhöhte die Testabdeckung um 35% und identifizierte Randfälle, die bei manuellen Tests übersehen wurden'}</li>
                  <li>{language === 'en' ? 'Integrated the tool with existing CI/CD pipeline, reducing time-to-market by 20%' : 'Integrierte das Tool in die bestehende CI/CD-Pipeline und  reduzierte die Time-to-Market um 20%'}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">{t.project3}</h4>
                <p className="text-sm text-gray-600">March 2018 - August 2018</p>
                <ul className="list-disc list-inside mt-2">
                  <li>{language === 'en' ? 'Designed and implemented a real-time performance testing dashboard using React and D3.js' : 'Entwarf und implementierte ein Echtzeit-Performance-Testing-Dashboard mit React und D3.js'}</li>
                  <li>{language === 'en' ? 'Integrated with JMeter and Gatling to visualize test results and system metrics' : 'Integration mit JMeter und Gatling zur Visualisierung von Testergebnissen und Systemmetriken'}</li>
                  <li>{language === 'en' ? 'Reduced time spent on performance analysis by 40% through automated report generation' : 'Reduzierte den Zeitaufwand für Performanceanalysen durch automatisierte Berichtgenerierung um 40%'}</li>
                </ul>
              </div>
            </section>
          )}
        </div>
      </div>
      <ContactPopup language={language} />
      <footer className="mt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Bhanu Sandeep Reddy Chirra. {t.allRightsReserved}
      </footer>
      <Toaster />
    </div>
  )
}

function SkillCategory({ name, skills }: { name: string; skills: string[] }) {
  return (
    <div>
      <h4 className="font-semibold">{name}</h4>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span key={index} className="bg-gray-200 text-sm px-2 py-1 rounded">{skill}</span>
        ))}
      </div>
    </div>
  )
}