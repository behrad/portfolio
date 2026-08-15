"use client"

import React, { useEffect } from "react"

export default function CoachingPage() {
  useEffect(() => {
    const slidesContainer = document.querySelector(".slides-container")
    const sections = document.querySelectorAll(".slide-section")
    const dotItems = document.querySelectorAll(".dot-item")
    const headerLogo = document.getElementById("header-logo")
    const headerCta = document.getElementById("header-cta")
    
    // 1. Smooth scroll to target sections
    const scrollToSection = (targetId: string) => {
      const targetSection = document.getElementById(targetId)
      if (!targetSection) return
      
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
      
      if (window.history.pushState) {
        window.history.pushState(null, "", `#${targetId}`)
      } else {
        window.location.hash = `#${targetId}`
      }
    }

    // Click on Dot Navigation items
    dotItems.forEach(item => {
      item.addEventListener("click", () => {
        const target = item.getAttribute("data-target")
        if (target) scrollToSection(target)
      })
      item.addEventListener("keydown", (e: any) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          const target = item.getAttribute("data-target")
          if (target) scrollToSection(target)
        }
      })
    })

    // Header logo click
    if (headerLogo) {
      headerLogo.addEventListener("click", (e) => {
        e.preventDefault()
        scrollToSection("hero")
      })
    }

    // Header CTA click
    if (headerCta) {
      headerCta.addEventListener("click", (e) => {
        e.preventDefault()
        scrollToSection("contact")
      })
    }

    // Scroll hints click
    document.querySelectorAll(".scroll-hint").forEach(hint => {
      hint.addEventListener("click", (e) => {
        e.preventDefault()
        const href = hint.getAttribute("href")
        if (href) {
          const targetHref = href.substring(1)
          scrollToSection(targetHref)
        }
      })
    })

    // 2. Active Dot Highlighting & Slide Reveal animations on Scroll
    const observerOptions = {
      root: null,
      threshold: 0.4
    }

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute("id")
          
          entry.target.classList.add("section-active")
          
          dotItems.forEach(dot => {
            const dotTarget = dot.getAttribute("data-target")
            if (dotTarget === activeId) {
              dot.classList.add("active")
            } else {
              dot.classList.remove("active")
            }
          })
        }
      })
    }, observerOptions)

    sections.forEach(section => {
      sectionObserver.observe(section)
    })
    
    // Adjust header styles on scroll
    const header = document.querySelector(".site-header") as HTMLElement
    const handleScroll = () => {
      if (!header) return
      if (window.scrollY > 50) {
        header.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.05)"
        header.style.background = "rgba(255, 255, 255, 0.85)"
      } else {
        header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.01)"
        header.style.background = "rgba(255, 255, 255, 0.7)"
      }
    }
    
    window.addEventListener("scroll", handleScroll)
    
    return () => {
      sectionObserver.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div style={{ direction: "ltr" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        /* CSS variables defining the design tokens */
        :root {
          --font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          
          /* Colors */
          --purple-primary: #7c3aed; /* violet-600 */
          --purple-hover: #6d28d9; /* violet-700 */
          --purple-light: #c084fc; /* purple-400 */
          --purple-glow: rgba(124, 58, 237, 0.15);
          --purple-tint: rgba(124, 58, 237, 0.05);
          
          --text-dark: #0f172a; /* slate-900 */
          --text-muted: #475569; /* slate-600 */
          --text-light: #64748b; /* slate-500 */
          
          --bg-gradient-start: #f8fafc; /* slate-50 */
          --bg-gradient-end: #f1f5f9; /* slate-100 */
          
          /* Glassmorphic values */
          --glass-bg: rgba(255, 255, 255, 0.65);
          --glass-border: rgba(255, 255, 255, 0.5);
          --glass-shadow: 0 12px 30px -10px rgba(109, 40, 217, 0.06), 0 1px 3px rgba(0, 0, 0, 0.02);
          
          --transition-bezier: cubic-bezier(0.16, 1, 0.3, 1);
          --transition-smooth: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Override Global Next.js body background & layout just for coaching page */
        html, body {
          background: var(--bg-gradient-start) !important;
          color: var(--text-dark) !important;
        }

        /* Desktop View Scroll Snapping */
        @media (min-width: 769px) {
          .slides-container {
            height: 100dvh;
            overflow-y: scroll;
            scroll-snap-type: y mandatory;
            scroll-behavior: smooth;
            scrollbar-width: none; /* Firefox */
          }
          
          .slides-container::-webkit-scrollbar {
            display: none; /* Chrome/Safari */
          }
          
          .slide-section {
            height: 100dvh;
            scroll-snap-align: start;
            scroll-snap-stop: always;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            padding: 5.5rem 2rem 2.5rem;
          }
        }

        /* Mobile View Flow Layout */
        @media (max-width: 768px) {
          .slides-container {
            height: auto;
            overflow-y: visible;
          }
          
          .slide-section {
            min-height: 100dvh;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            padding: 6.5rem 1.25rem 4rem;
            border-bottom: 1px solid rgba(124, 58, 237, 0.08);
          }
        }

        /* Background Curves & Decorative Elements */
        .bg-decorations {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
          background: radial-gradient(circle at 10% 20%, rgba(243, 232, 255, 0.6) 0%, rgba(241, 245, 249, 0.3) 90%);
        }

        .bg-decorations svg {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        /* Curved Line Animation */
        .curved-line {
          stroke: var(--purple-primary);
          stroke-width: 1.5;
          fill: none;
          stroke-linecap: round;
          opacity: 0.12;
          transition: var(--transition-smooth);
        }
        
        .curved-line-thick {
          stroke: var(--purple-light);
          stroke-width: 3.5;
          fill: none;
          stroke-linecap: round;
          opacity: 0.08;
        }

        .curved-line-dash {
          stroke: var(--purple-primary);
          stroke-width: 1;
          fill: none;
          stroke-dasharray: 6 12;
          opacity: 0.15;
          animation: drawLine 60s linear infinite;
        }

        @keyframes drawLine {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: 1000; }
        }

        .bg-glow-spot {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(192, 132, 252, 0.08) 0%, rgba(124, 58, 237, 0) 70%);
          filter: blur(40px);
          pointer-events: none;
        }

        .bg-glow-1 { top: -10%; right: -10%; }
        .bg-glow-2 { bottom: -20%; left: -10%; }
        .bg-glow-3 { top: 40%; left: 10%; }

        /* Fixed Glass Header */
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
          transition: var(--transition-smooth);
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.25rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 1rem 1.25rem;
          }
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: var(--text-dark);
          font-weight: 800;
          font-size: 1.15rem;
          letter-spacing: -0.025em;
        }

        .logo-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--purple-primary);
          box-shadow: 0 0 10px var(--purple-primary);
          animation: pulseGlow 2s infinite;
        }

        @keyframes pulseGlow {
          0% { transform: scale(1); box-shadow: 0 0 6px var(--purple-primary); }
          50% { transform: scale(1.2); box-shadow: 0 0 14px var(--purple-primary); }
          100% { transform: scale(1); box-shadow: 0 0 6px var(--purple-primary); }
        }

        .brand-sub {
          font-weight: 500;
          font-size: 0.85rem;
          color: var(--text-light);
          border-left: 1px solid rgba(0, 0, 0, 0.1);
          padding-left: 0.5rem;
          margin-left: 0.25rem;
        }

        @media (max-width: 600px) {
          .brand-sub { display: none; }
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .btn-contact {
          display: inline-flex;
          align-items: center;
          padding: 0.6rem 1.2rem;
          border-radius: 50px;
          background: var(--purple-primary);
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.875rem;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.2);
          transition: var(--transition-smooth);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .btn-contact:hover {
          background: var(--purple-hover);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(124, 58, 237, 0.3);
        }

        /* Fixed Navigation Dots */
        .dots-nav {
          position: fixed;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          z-index: 100;
          transition: var(--transition-smooth);
        }

        @media (max-width: 1024px) {
          .dots-nav {
            display: none; /* Hide on mobile/tablets for simplicity and screen real estate */
          }
        }

        .dot-item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 12px;
          height: 12px;
          cursor: pointer;
        }

        .dot-circle {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(124, 58, 237, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.6);
          transition: var(--transition-smooth);
        }

        .dot-item:hover .dot-circle {
          background: var(--purple-primary);
          transform: scale(1.3);
        }

        .dot-item.active .dot-circle {
          background: var(--purple-primary);
          transform: scale(1.6);
          box-shadow: 0 0 10px var(--purple-glow), 0 0 0 4px rgba(124, 58, 237, 0.1);
        }

        .dot-label {
          position: absolute;
          right: 24px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--purple-primary);
          background: rgba(255, 255, 255, 0.9);
          padding: 0.25rem 0.65rem;
          border-radius: 4px;
          white-space: nowrap;
          opacity: 0;
          transform: translateX(10px);
          transition: var(--transition-smooth);
          border: 1px solid rgba(124, 58, 237, 0.1);
          pointer-events: none;
        }

        .dot-item:hover .dot-label {
          opacity: 1;
          transform: translateX(0);
        }

        /* Container for slide contents */
        .container {
          width: 100%;
          max-width: 1160px;
          margin: 0 auto;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        .content-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 1.5rem 0;
        }

        @media (max-width: 768px) {
          .container {
            height: auto;
          }
          .content-wrap {
            padding: 0;
          }
        }

        /* Global Typography Styles */
        .kicker {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--purple-primary);
          font-weight: 700;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .kicker::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 2px;
          background: var(--purple-primary);
        }

        .slide-title {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.035em;
          color: var(--text-dark);
          margin-bottom: 1.25rem;
        }

        .slide-lede {
          font-size: 1.125rem;
          line-height: 1.6;
          color: var(--text-muted);
          max-width: 720px;
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .slide-title {
            font-size: 2.25rem;
            margin-bottom: 1rem;
          }
          .slide-lede {
            font-size: 1rem;
            margin-bottom: 1.5rem;
          }
        }

        /* Glassmorphic Card base */
        .glass-card {
          background: var(--glass-bg);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--glass-border);
          border-radius: 1.25rem;
          box-shadow: var(--glass-shadow);
          transition: var(--transition-smooth);
        }

        /* Hero */
        .hero-layout {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3rem;
          align-items: center;
        }

        @media (max-width: 992px) {
          .hero-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .hero-text {
          display: flex;
          flex-direction: column;
        }

        .hero-quote-box {
          padding: 1.75rem 2.25rem;
          position: relative;
          margin: 1.5rem 0 2rem;
          border-left: 3px solid var(--purple-primary);
          background: rgba(255, 255, 255, 0.4);
          border-radius: 0 1rem 1rem 0;
        }

        .hero-quote-text {
          font-size: 1.25rem;
          line-height: 1.55;
          font-weight: 500;
          color: var(--text-dark);
          font-style: italic;
        }

        @media (max-width: 768px) {
          .hero-quote-box {
            padding: 1.25rem 1.5rem;
          }
          .hero-quote-text {
            font-size: 1.1rem;
          }
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 1rem;
        }

        @media (max-width: 600px) {
          .hero-stats {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        .hero-stat-card {
          padding: 1.25rem;
          text-align: left;
        }

        .stat-num {
          display: block;
          font-size: 2rem;
          font-weight: 800;
          color: var(--purple-primary);
          line-height: 1;
          margin-bottom: 0.35rem;
          letter-spacing: -0.02em;
        }

        .stat-desc {
          font-size: 0.825rem;
          font-weight: 600;
          line-height: 1.4;
          color: var(--text-muted);
        }

        /* Scroll Hint */
        .scroll-hint {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          cursor: pointer;
          text-decoration: none;
          color: var(--text-light);
          font-size: 0.8rem;
          font-weight: 700;
          gap: 0.5rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: var(--transition-smooth);
          animation: bounceHint 2s infinite;
          z-index: 10;
        }
        
        .scroll-hint:hover {
          color: var(--purple-primary);
        }

        @keyframes bounceHint {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
          60% { transform: translateY(-4px); }
        }

        /* Symptoms */
        .symptoms-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        @media (max-width: 992px) {
          .symptoms-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .symptoms-grid {
            grid-template-columns: 1fr;
          }
        }

        .symptom-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.4);
        }

        .symptom-card:hover {
          transform: translateY(-5px);
          border-color: rgba(124, 58, 237, 0.25);
          background: rgba(255, 255, 255, 0.85);
          box-shadow: 0 20px 40px -15px rgba(109, 40, 217, 0.08), 0 0 15px rgba(124, 58, 237, 0.03);
        }

        .symptom-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .symptom-idx {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--purple-primary);
          background: var(--purple-tint);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }

        .symptom-icon-warning {
          color: #ea580c; /* orange-600 */
          display: flex;
          align-items: center;
        }

        .symptom-card h3 {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-dark);
          letter-spacing: -0.01em;
        }

        .symptom-card p {
          font-size: 0.875rem;
          line-height: 1.5;
          color: var(--text-muted);
        }

        /* Offers */
        .offers-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .offers-grid-top {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .offers-grid-bottom {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        @media (max-width: 992px) {
          .offers-grid-top,
          .offers-grid-bottom {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        .offer-card {
          padding: 1.15rem 1.35rem;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 0.5rem;
          min-height: 215px;
        }

        @media (max-width: 768px) {
          .offer-card {
            min-height: auto;
          }
        }

        .offer-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.8);
          border-color: rgba(124, 58, 237, 0.3);
          box-shadow: 0 25px 50px -12px rgba(109, 40, 217, 0.1);
        }

        .offer-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.25rem;
        }

        .offer-idx {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--purple-primary);
          border: 1.5px solid var(--purple-primary);
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .offer-header-text h3 {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-dark);
          margin-bottom: 0.15rem;
          letter-spacing: -0.015em;
        }

        .offer-tagline {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--purple-primary);
          font-style: italic;
        }

        .offer-bullets-list {
          list-style: none;
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.4rem;
          margin-top: 0.25rem;
        }
        
        @media (min-width: 993px) {
          .offers-grid-bottom .offer-bullets-list {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.4rem 1.25rem;
          }
        }

        .offer-bullets-list li {
          font-size: 0.85rem;
          line-height: 1.45;
          color: var(--text-muted);
          position: relative;
          padding-left: 1.25rem;
        }

        .offer-bullets-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.45rem;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--purple-primary);
        }
        
        .offer-bullets-list li strong {
          color: var(--text-dark);
          font-weight: 600;
        }

        /* Timeline */
        .timeline-layout {
          position: relative;
          margin: 1.5rem 0;
          padding-left: 2rem;
        }

        @media (min-width: 769px) {
          .timeline-layout {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
            padding-left: 0;
            margin-top: 3rem;
          }
          
          .timeline-layout::before {
            content: '';
            position: absolute;
            top: 2rem;
            left: 2rem;
            right: 2rem;
            height: 2px;
            background: rgba(124, 58, 237, 0.15);
            z-index: 0;
          }
        }

        .timeline-card {
          padding: 1.5rem;
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.4);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .timeline-card {
            margin-bottom: 1.5rem;
          }
          
          .timeline-layout::before {
            content: '';
            position: absolute;
            left: 8px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: rgba(124, 58, 237, 0.15);
          }
        }

        .timeline-node {
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 50%;
          background: white;
          border: 2px solid var(--purple-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.95rem;
          color: var(--purple-primary);
          box-shadow: 0 0 0 5px rgba(124, 58, 237, 0.05);
          margin-bottom: 0.5rem;
          z-index: 2;
        }

        @media (max-width: 768px) {
          .timeline-node {
            position: absolute;
            left: -2rem;
            transform: translateX(-50%);
            margin-left: 8px;
            margin-bottom: 0;
            top: 1.5rem;
          }
        }

        .timeline-time {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--purple-primary);
        }

        .timeline-card h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-dark);
          letter-spacing: -0.01em;
        }

        .timeline-card p {
          font-size: 0.85rem;
          line-height: 1.5;
          color: var(--text-muted);
        }

        .cadence-banner {
          margin-top: 1.5rem;
          padding: 1.25rem 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          border: 1px solid rgba(124, 58, 237, 0.15);
          background: rgba(124, 58, 237, 0.03);
        }

        @media (max-width: 600px) {
          .cadence-banner {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.25rem;
            gap: 0.5rem;
          }
        }

        .cadence-banner p {
          font-size: 0.95rem;
          color: var(--text-dark);
          line-height: 1.5;
        }

        .cadence-banner strong {
          color: var(--purple-primary);
        }

        /* Outcomes */
        .outcomes-layout {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 1.5rem;
          margin-top: 1rem;
        }

        @media (max-width: 992px) {
          .outcomes-layout {
            grid-template-columns: 1fr;
          }
        }

        .outcomes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        @media (max-width: 600px) {
          .outcomes-grid {
            grid-template-columns: 1fr;
          }
        }

        .outcome-card {
          padding: 1.5rem;
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          border: 1px solid rgba(255, 255, 255, 0.4);
        }

        .outcome-check {
          flex-shrink: 0;
          width: 1.75rem;
          height: 1.75rem;
          border-radius: 50%;
          background: rgba(124, 58, 237, 0.08);
          color: var(--purple-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .outcome-text-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .outcome-text-wrap h3 {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-dark);
        }

        .outcome-text-wrap p {
          font-size: 0.85rem;
          line-height: 1.5;
          color: var(--text-muted);
        }

        .outcomes-highlight-box {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border: 1px solid rgba(124, 58, 237, 0.25);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(243, 232, 255, 0.4) 100%);
          position: relative;
          overflow: hidden;
        }

        .outcomes-highlight-box h3 {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--purple-primary);
          margin-bottom: 0.75rem;
          letter-spacing: -0.015em;
        }

        .outcomes-highlight-box p {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-muted);
        }

        /* About & Contact */
        .about-layout {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3rem;
          align-items: center;
        }

        @media (max-width: 992px) {
          .about-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .about-bio {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .about-bio p {
          font-size: 0.925rem;
          line-height: 1.62;
          color: var(--text-muted);
        }

        .about-bio strong {
          color: var(--text-dark);
          font-weight: 600;
        }

        .about-side {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .fit-panel {
          padding: 1.5rem;
          border: 1px solid rgba(124, 58, 237, 0.15);
          background: rgba(124, 58, 237, 0.02);
        }

        .fit-panel h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--purple-primary);
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .fit-panel p {
          font-size: 0.85rem;
          line-height: 1.55;
          color: var(--text-muted);
        }

        .contact-card {
          padding: 1.75rem;
          border: 1px solid rgba(124, 58, 237, 0.2);
        }

        .contact-card h3 {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-dark);
          margin-bottom: 1.25rem;
          letter-spacing: -0.015em;
        }

        .contact-links {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .contact-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          background: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.5);
          text-decoration: none;
          color: var(--text-dark);
          font-size: 0.9rem;
          font-weight: 600;
          transition: var(--transition-smooth);
        }

        .contact-row:hover {
          transform: translateX(4px);
          background: white;
          border-color: rgba(124, 58, 237, 0.25);
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.05);
        }

        .contact-label-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .contact-icon {
          color: var(--purple-primary);
          display: flex;
          align-items: center;
        }

        .contact-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .contact-value {
          font-family: monospace;
          font-size: 0.95rem;
          color: var(--text-dark);
        }

        /* Footers */
        .slide-footer {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid rgba(124, 58, 237, 0.08);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-light);
          z-index: 1;
          margin-top: auto;
        }

        .footer-no {
          font-weight: 800;
          color: var(--purple-primary);
        }

        @media (max-width: 768px) {
          .slide-footer {
            display: none;
          }
        }

        /* Reveal animations */
        .fade-in-up {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .section-active .fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }

        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
        .delay-4 { transition-delay: 0.4s; }
        .delay-5 { transition-delay: 0.5s; }
        .delay-6 { transition-delay: 0.6s; }
        .delay-7 { transition-delay: 0.7s; }
        .delay-8 { transition-delay: 0.8s; }
        .delay-9 { transition-delay: 0.9s; }
      ` }} />

      {/* Background Decorations */}
      <div className="bg-decorations" aria-hidden="true">
        <div className="bg-glow-spot bg-glow-1"></div>
        <div className="bg-glow-spot bg-glow-2"></div>
        <div className="bg-glow-spot bg-glow-3"></div>
        
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path className="curved-line" d="M-100,100 C300,50 600,450 1000,200 C1250,50 1400,250 1600,150" />
          <path className="curved-line-thick" d="M-150,150 C250,100 550,500 950,250 C1200,100 1350,300 1550,200" />
          <path className="curved-line-dash" d="M-50,250 C350,150 700,550 1100,300 C1300,180 1450,400 1650,300" />
          <path className="curved-line" d="M-200,600 C200,450 500,850 900,600 C1200,400 1300,800 1600,650" />
          <path className="curved-line-thick" d="M-250,650 C150,500 450,900 850,650 C1150,450 1250,850 1550,700" />
        </svg>
      </div>

      {/* Header */}
      <header className="site-header">
        <div className="header-container">
          <a href="#hero" className="brand-logo" id="header-logo">
            <span className="logo-dot"></span>
            <span>Behrad Zari</span>
            <span className="brand-sub">Leadership Coaching</span>
          </a>
          <div className="nav-actions">
            <a href="#contact" className="btn-contact" id="header-cta">Get in Touch</a>
          </div>
        </div>
      </header>

      {/* Side Dots Navigation */}
      <nav className="dots-nav" aria-label="Proposal Section Navigation">
        <div className="dot-item active" data-target="hero" role="button" tabIndex={0} aria-label="Go to Slide 1: Introduction">
          <span className="dot-label">01. Overview</span>
          <div className="dot-circle"></div>
        </div>
        <div className="dot-item" data-target="symptoms" role="button" tabIndex={0} aria-label="Go to Slide 2: Symptoms">
          <span className="dot-label">02. Frictions</span>
          <div className="dot-circle"></div>
        </div>
        <div className="dot-item" data-target="services" role="button" tabIndex={0} aria-label="Go to Slide 3: What I Offer">
          <span className="dot-label">03. Offerings</span>
          <div className="dot-circle"></div>
        </div>
        <div className="dot-item" data-target="process" role="button" tabIndex={0} aria-label="Go to Slide 4: Engagement Process">
          <span className="dot-label">04. Process</span>
          <div className="dot-circle"></div>
        </div>
        <div className="dot-item" data-target="outcomes" role="button" tabIndex={0} aria-label="Go to Slide 5: Expected Outcomes">
          <span className="dot-label">05. Outcomes</span>
          <div className="dot-circle"></div>
        </div>
        <div className="dot-item" data-target="contact" role="button" tabIndex={0} aria-label="Go to Slide 6: About &amp; Contact">
          <span className="dot-label">06. About &amp; Contact</span>
          <div className="dot-circle"></div>
        </div>
      </nav>

      {/* Sections Container */}
      <main className="slides-container">

        {/* HERO SECTION */}
        <section id="hero" className="slide-section section-active">
          <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <div className="content-wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", paddingBottom: "2rem" }}>
              <span className="kicker fade-in-up" style={{ justifyContent: "center" }}>Engineering Leadership</span>
              <h1 className="slide-title fade-in-up delay-1" style={{ maxWidth: "850px", margin: "0 auto 1.5rem" }}>Engineering Leadership &amp; Technical Coaching</h1>
              <p className="slide-lede fade-in-up delay-2" style={{ maxWidth: "800px", margin: "0 auto", fontSize: "1.15rem", lineHeight: "1.75" }}>
                I work with product engineering teams to raise both the quality of their software and the way they build it — through hands-on mentoring, solution design, and team development. The work is embedded in real work, not theory delivered in isolation.
              </p>
            </div>

            <div className="slide-footer">
              <span>Engineering Leadership &amp; Technical Coaching Proposal</span>
              <a href="#symptoms" className="scroll-hint" aria-label="Scroll to next section">
                <span>Scroll Down</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1={12} y1={5} x2={12} y2={19}></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              </a>
              <span className="footer-no">01 / 06</span>
            </div>
          </div>
        </section>

        {/* SYMPTOMS SECTION */}
        <section id="symptoms" className="slide-section">
          <div className="container">
            <div className="content-wrap">
              <span className="kicker fade-in-up">Where I Help</span>
              <h2 className="slide-title fade-in-up delay-1" style={{ marginBottom: "2.5rem" }}>Symptoms You May Recognize</h2>

              <div className="symptoms-grid">
                <div className="glass-card symptom-card fade-in-up delay-1">
                  <div className="symptom-head">
                    <span className="symptom-idx">01</span>
                    <span className="symptom-icon-warning"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1={12} y1={9} x2={12} y2={13}></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></span>
                  </div>
                  <h3>High Maintenance Code</h3>
                  <p>Engineers ship features, but the codebase gets harder to change, test, and reason about over time.</p>
                </div>
                <div className="glass-card symptom-card fade-in-up delay-2">
                  <div className="symptom-head">
                    <span className="symptom-idx">02</span>
                    <span className="symptom-icon-warning"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1={12} y1={9} x2={12} y2={13}></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></span>
                  </div>
                  <h3>Reactive Design Decisions</h3>
                  <p>Architecture and trade-offs are made on the fly, without a clear system design or a shared way to evaluate them.</p>
                </div>
                <div className="glass-card symptom-card fade-in-up delay-3">
                  <div className="symptom-head">
                    <span className="symptom-idx">03</span>
                    <span className="symptom-icon-warning"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></span>
                  </div>
                  <h3>Rushed Refinement</h3>
                  <p>Work enters sprints half-thought-through, leading to rework, missed edge cases, and surprises late in delivery.</p>
                </div>
                <div className="glass-card symptom-card fade-in-up delay-4">
                  <div className="symptom-head">
                    <span className="symptom-idx">04</span>
                    <span className="symptom-icon-warning"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></span>
                  </div>
                  <h3>Product–Engineering Gap</h3>
                  <p>Priorities are unclear, expectations don't match, and engineers implement specs instead of solving business problems.</p>
                </div>
                <div className="glass-card symptom-card fade-in-up delay-5">
                  <div className="symptom-head">
                    <span className="symptom-idx">05</span>
                    <span className="symptom-icon-warning"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></span>
                  </div>
                  <h3>Knowledge Silos</h3>
                  <p>Knowledge concentrated in a few key people. The team doesn't level up together; bus-factor risk grows quietly.</p>
                </div>
                <div className="glass-card symptom-card fade-in-up delay-6">
                  <div className="symptom-head">
                    <span className="symptom-idx">06</span>
                    <span className="symptom-icon-warning"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></span>
                  </div>
                  <h3>Hollow Ceremonies</h3>
                  <p>Standups, planning, and retros run on schedule, but actual delivery speed and engineering quality don't improve.</p>
                </div>
                <div className="glass-card symptom-card fade-in-up delay-7">
                  <div className="symptom-head">
                    <span className="symptom-idx">07</span>
                    <span className="symptom-icon-warning"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></span>
                  </div>
                  <h3>Vague Communication</h3>
                  <p>Frequent but unclear communication. Assumptions go unchecked and quietly turn into weeks of wasted work.</p>
                </div>
                <div className="glass-card symptom-card fade-in-up delay-8">
                  <div className="symptom-head">
                    <span className="symptom-idx">08</span>
                    <span className="symptom-icon-warning"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={2} stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></span>
                  </div>
                  <h3>Chaotic AI Adoption</h3>
                  <p>The team uses AI or agentic tools, but inconsistently and without shared quality guardrails, lowering output review standards.</p>
                </div>
                <div className="glass-card symptom-card fade-in-up delay-9">
                  <div className="symptom-head">
                    <span className="symptom-idx">09</span>
                    <span className="symptom-icon-warning"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={2} stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></span>
                  </div>
                  <h3>Inconsistent Quality</h3>
                  <p>The same classes of mistakes recur across sprints. Code reviews feel repetitive instead of developmental.</p>
                </div>
              </div>
            </div>

            <div className="slide-footer">
              <span>Engineering Leadership &amp; Technical Coaching Proposal</span>
              <a href="#services" className="scroll-hint" aria-label="Scroll to next section">
                <span>Scroll Down</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={2} strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              </a>
              <span className="footer-no">02 / 06</span>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="slide-section">
          <div className="container">
            <div className="content-wrap">
              <span className="kicker fade-in-up">What I Offer</span>
              <h2 className="slide-title fade-in-up delay-1" style={{ marginBottom: "2.5rem" }}>Five Areas, One Integrated System</h2>

              <div className="offers-container">
                <div className="offers-grid-top">
                  
                  <div className="glass-card offer-card fade-in-up delay-1">
                    <div className="offer-card-header">
                      <div className="offer-header-text">
                        <h3>1. Craft &amp; Systems</h3>
                        <span className="offer-tagline">"Code that works" to "code that lasts"</span>
                      </div>
                      <span className="offer-idx">01</span>
                    </div>
                    <ul className="offer-bullets-list">
                      <li><strong>Architecture &amp; design:</strong> Structuring systems, boundaries, and trade-offs.</li>
                      <li><strong>Modularity &amp; scale:</strong> Focus on modularity, reversibility, and separating critical decisions.</li>
                      <li><strong>Domain-Driven Design:</strong> Modeling domain properly so code reflects the business.</li>
                      <li><strong>Systems thinking:</strong> Managing 2nd order effects and local-to-whole impacts.</li>
                      <li><strong>Tooling judgment:</strong> Pragmatic stack evaluation instead of chasing trend hype.</li>
                    </ul>
                  </div>

                  <div className="glass-card offer-card fade-in-up delay-2">
                    <div className="offer-card-header">
                      <div className="offer-header-text">
                        <h3>2. Solution Design</h3>
                        <span className="offer-tagline">Thinking *before* coding is valuable</span>
                      </div>
                      <span className="offer-idx">02</span>
                    </div>
                    <ul className="offer-bullets-list">
                      <li><strong>High-quality refinement:</strong> Turning vague specs into clear, actionable sprint tasks.</li>
                      <li><strong>Solution design sessions:</strong> Surfacing technical risks and edge cases early.</li>
                      <li><strong>Agile process tuning:</strong> Process serves delivery, not the other way around.</li>
                    </ul>
                  </div>

                  <div className="glass-card offer-card fade-in-up delay-3">
                    <div className="offer-card-header">
                      <div className="offer-header-text">
                        <h3>3. Product Alignment</h3>
                        <span className="offer-tagline">Close the gap on "why it matters"</span>
                      </div>
                      <span className="offer-idx">03</span>
                    </div>
                    <ul className="offer-bullets-list">
                      <li><strong>Technical product sense:</strong> Building understanding of why a feature matters.</li>
                      <li><strong>Better collaboration:</strong> Shared language, clear priorities, and trade-off alignment.</li>
                      <li><strong>Constructive alignment:</strong> Proposing viable alternatives instead of silent implementation.</li>
                    </ul>
                  </div>

                </div>
                
                <div className="offers-grid-bottom">
                  
                  <div className="glass-card offer-card fade-in-up delay-4">
                    <div className="offer-card-header">
                      <div className="offer-header-text">
                        <h3>4. Team Culture &amp; Communication</h3>
                        <span className="offer-tagline">Tighter, self-sustaining team relationships</span>
                      </div>
                      <span className="offer-idx">04</span>
                    </div>
                    <ul className="offer-bullets-list">
                      <li><strong>Cohesion &amp; Trust:</strong> Habits of trust, ownership, and high shared standards.</li>
                      <li><strong>Critical thinking:</strong> Challenging tech assumptions constructively.</li>
                      <li><strong>Soft skills:</strong> Formulating clear questions, writing technical documents.</li>
                      <li><strong>Multiplier effect:</strong> Growing seniors into multipliers, accelerating mid-levels.</li>
                    </ul>
                  </div>

                  <div className="glass-card offer-card fade-in-up delay-5">
                    <div className="offer-card-header">
                      <div className="offer-header-text">
                        <h3>5. Agentic AI Practices</h3>
                        <span className="offer-tagline">AI-assisted development as a discipline, not a shortcut</span>
                      </div>
                      <span className="offer-idx">05</span>
                    </div>
                    <ul className="offer-bullets-list">
                      <li><strong>Shared guardrails:</strong> Quality baselines for AI-assisted development.</li>
                      <li><strong>Engineering judgment:</strong> Knowing when to use AI, and how to verify output.</li>
                      <li><strong>Raising the floor:</strong> AI raises quality without lowering human judgment.</li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>

            <div className="slide-footer">
              <span>Engineering Leadership &amp; Technical Coaching Proposal</span>
              <a href="#process" className="scroll-hint" aria-label="Scroll to next section">
                <span>Scroll Down</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1={12} y1={5} x2={12} y2={19}></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              </a>
              <span className="footer-no">03 / 06</span>
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section id="process" className="slide-section">
          <div className="container">
            <div className="content-wrap">
              <span className="kicker fade-in-up">How It Works</span>
              <h2 className="slide-title fade-in-up delay-1">How an Engagement Works</h2>
              <p className="slide-lede fade-in-up delay-2">
                The structure is highly focused and structured, but the specific technical goals are tailored entirely to your team.
              </p>

              <div className="timeline-layout">
                <div className="glass-card timeline-card fade-in-up delay-1">
                  <span className="timeline-node">1</span>
                  <span className="timeline-time">Weeks 1 – 2</span>
                  <h3>Assessment</h3>
                  <p>I embed into the codebase context, review current delivery flows, and map team dynamics. We define explicit improvement signals to track progress.</p>
                </div>

                <div className="glass-card timeline-card fade-in-up delay-2">
                  <span className="timeline-node">2</span>
                  <span className="timeline-time">Ongoing</span>
                  <h3>Embedded Coaching</h3>
                  <p>Hands-on 1:1 mentorship, leading solution design sessions, pairing on critical architecture, code reviews, and structured stacks/tools workshops.</p>
                </div>

                <div className="glass-card timeline-card fade-in-up delay-3">
                  <span className="timeline-node">3</span>
                  <span className="timeline-time">Bi-weekly</span>
                  <h3>Checkpoints</h3>
                  <p>Frequent, transparent review of outcomes against agreed metrics, adjusting focus areas to match shifting product delivery goals.</p>
                </div>

                <div className="glass-card timeline-card fade-in-up delay-4">
                  <span className="timeline-node">4</span>
                  <span className="timeline-time">Handoff</span>
                  <h3>Self-Sufficiency</h3>
                  <p>The ultimate goal is my departure. I leave behind documentations, standards, and self-sustaining engineering habits that keep compounding.</p>
                </div>
              </div>

              <div className="glass-card cadence-banner fade-in-up delay-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--purple-primary)", flexShrink: 0 }}><rect x={3} y={4} width={18} height={18} rx={2} ry={2}></rect><line x1={16} y1={2} x2={16} y2={6}></line><line x1={8} y1={2} x2={8} y2={6}></line><line x1={3} y1={10} x2={21} y2={10}></line></svg>
                <p><strong>Engagement Cadence:</strong> Typically part-time embedded (a few days per week) over a quarter, renewable based on progress checkpoints.</p>
              </div>
            </div>

            <div className="slide-footer">
              <span>Engineering Leadership &amp; Technical Coaching Proposal</span>
              <a href="#outcomes" className="scroll-hint" aria-label="Scroll to next section">
                <span>Scroll Down</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1={12} y1={5} x2={12} y2={19}></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              </a>
              <span className="footer-no">04 / 06</span>
            </div>
          </div>
        </section>

        {/* OUTCOMES SECTION */}
        <section id="outcomes" className="slide-section">
          <div className="container">
            <div className="content-wrap">
              <span className="kicker fade-in-up">Expected Impact</span>
              <h2 className="slide-title fade-in-up delay-1">What You Should Expect</h2>
              <p className="slide-lede fade-in-up delay-2">
                No empty claims. I focus on concrete operational improvements that directly scale engineering output quality.
              </p>

              <div className="outcomes-layout">
                <div className="outcomes-grid">
                  <div className="glass-card outcome-card fade-in-up delay-1">
                    <div className="outcome-check">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <div className="outcome-text-wrap">
                      <h3>Defensible Architecture</h3>
                      <p>Engineers design systems and make explicit, business-aligned trade-offs, instead of coding reactively.</p>
                    </div>
                  </div>

                  <div className="glass-card outcome-card fade-in-up delay-2">
                    <div className="outcome-check">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <div className="outcome-text-wrap">
                      <h3>Reduced Rework</h3>
                      <p>Better solution design and thorough upfront technical refinement mean fewer late-sprint surprises.</p>
                    </div>
                  </div>

                  <div className="glass-card outcome-card fade-in-up delay-3">
                    <div className="outcome-check">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <div className="outcome-text-wrap">
                      <h3>Modular Codebase</h3>
                      <p>Code that remains easy to test, read, and extend as business features iterate over time.</p>
                    </div>
                  </div>

                  <div className="glass-card outcome-card fade-in-up delay-4">
                    <div className="outcome-check">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <div className="outcome-text-wrap">
                      <h3>Sharper Communication</h3>
                      <p>Clearer alignment, cleaner technical writing, and less time lost on unspoken engineering assumptions.</p>
                    </div>
                  </div>

                  <div className="glass-card outcome-card fade-in-up delay-5">
                    <div className="outcome-check">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <div className="outcome-text-wrap">
                      <h3>Engineer Growth</h3>
                      <p>Mid-level developers stepping into senior scopes, and senior engineers serving as multipliers for others.</p>
                    </div>
                  </div>

                  <div className="glass-card outcome-card fade-in-up delay-6">
                    <div className="outcome-check">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <div className="outcome-text-wrap">
                      <h3>Disciplined AI Use</h3>
                      <p>Safe, productive, and consistent use of AI generation tools, maintaining high engineering review standards.</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card outcomes-highlight-box fade-in-up delay-5">
                  <div className="bg-glow-spot" style={{ background: "radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, rgba(255,255,255,0) 70%)", top: "-20px", right: "-20px", width: "300px", height: "300px" }}></div>
                  <h3>Long-Term Self-Sufficiency</h3>
                  <p>
                    I measure my success by how quickly the team doesn't need me anymore. The true deliverable is leaving behind self-sustaining processes, standards, and mentorship patterns that keep scaling when my engagement concludes.
                  </p>
                </div>
              </div>
            </div>

            <div className="slide-footer">
              <span>Engineering Leadership &amp; Technical Coaching Proposal</span>
              <a href="#contact" className="scroll-hint" aria-label="Scroll to next section">
                <span>Scroll Down</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={2} strokeLinecap="round" strokeLinejoin="round"><line x1={12} y1={5} x2={12} y2={19}></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              </a>
              <span className="footer-no">05 / 06</span>
            </div>
          </div>
        </section>

        {/* ABOUT & CONTACT SECTION */}
        <section id="contact" className="slide-section">
          <div className="container">
            <div className="content-wrap">
              <span className="kicker fade-in-up">About Me</span>
              <h2 className="slide-title fade-in-up delay-1">23 Years Across the Full Lifecycle</h2>
              
              <div className="about-layout">
                <div className="about-bio fade-in-up delay-2">
                  <p>
                    I have worked across the full lifecycle — from writing code in high-performance startups to managing systems architecture at national scale. I have shipped production software across <strong>5+ technology stacks</strong> and led engineering teams across four core languages: <strong>Java, Go, Node.js, and Python.</strong>
                  </p>
                  <p>
                    I know what it takes to build from zero. I have <strong>launched five national-scale and startup products from scratch</strong>, several of which continue to run at scale today. Having also founded my own marketing automation startup, I speak the language of both engineering and business.
                  </p>
                  <p>
                    A core passion of mine is leveling up engineers. I have <strong>mentored developers from junior to senior</strong>, helping them prepare for and pass interviews at top tech companies. I have raised delivery quality at organizations including <strong>Bank Shahr, Adanic, Atiye Dadeh Pardaz, Sazito, and Logistics Bazar.</strong>
                  </p>
                </div>

                <div className="about-side">
                  <div className="glass-card contact-card fade-in-up delay-3">
                    <h3>Let's Talk</h3>
                    <div className="contact-links">
                      <a href="mailto:behradz@gmail.com" className="contact-row">
                        <div className="contact-label-group">
                          <span className="contact-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></span>
                          <span className="contact-label">Email</span>
                        </div>
                        <span className="contact-value">behradz@gmail.com</span>
                      </a>

                      <a href="https://www.linkedin.com/in/behradz/" target="_blank" rel="noopener noreferrer" className="contact-row">
                        <div className="contact-label-group">
                          <span className="contact-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={2} strokeLinecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x={2} y={9} width={4} height={12}></rect><circle cx={4} cy={4} r={2}></circle></svg></span>
                          <span className="contact-label">LinkedIn</span>
                        </div>
                        <span className="contact-value">in/behradz</span>
                      </a>

                      <a href="https://behradz.ir" target="_blank" rel="noopener noreferrer" className="contact-row">
                        <div className="contact-label-group">
                          <span className="contact-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={2} strokeLinecap="round" stroke-linejoin="round"><circle cx={12} cy={12} r={10}></circle><line x1={2} y1={12} x2={22} y2={12}></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></span>
                          <span className="contact-label">Website</span>
                        </div>
                        <span className="contact-value">behradz.ir</span>
                      </a>

                      <a href="tel:+989125336383" className="contact-row">
                        <div className="contact-label-group">
                          <span className="contact-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={2} strokeLinecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></span>
                          <span className="contact-label">Phone</span>
                        </div>
                        <span className="contact-value">+98 912 533 6383</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="slide-footer">
              <span>Engineering Leadership &amp; Technical Coaching Proposal</span>
              <span className="footer-no">06 / 06</span>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
