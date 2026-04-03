// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar scroll effect
const navbar = document.getElementById("navbar")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  // Add scrolled class to navbar
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  // Update scroll progress
  updateScrollProgress()

  // Update active navigation link
  updateActiveNavLink()

  // Animate sections on scroll
  animateOnScroll()
})

// Update scroll progress indicator
function updateScrollProgress() {
  const scrollProgress = document.querySelector(".scroll-progress")
  const scrollTop = window.pageYOffset
  const docHeight = document.body.scrollHeight - window.innerHeight
  const scrollPercent = (scrollTop / docHeight) * 100
  scrollProgress.style.width = scrollPercent + "%"
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section")
  const scrollPos = window.scrollY + 100
  let currentSectionId = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      currentSectionId = sectionId
    }
  })

  // Check if user is at the absolute bottom of the page
  if (Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
    const lastSection = sections[sections.length - 1]
    if (lastSection) {
      currentSectionId = lastSection.getAttribute("id")
    }
  }

  // Apply the active class
  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (currentSectionId && link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active")
    }
  })
}

// Animate sections when they come into view
function animateOnScroll() {
  const sections = document.querySelectorAll("section")
  const triggerBottom = window.innerHeight * 0.8

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top

    if (sectionTop < triggerBottom) {
      section.classList.add("visible")
    }
  })
}

// Add hover effect to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Add click effect to buttons
document.querySelectorAll(".cta-button, .contact-link").forEach((button) => {
  button.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add CSS for ripple effect
const style = document.createElement("style")
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Parallax effect for floating shapes
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const shapes = document.querySelectorAll(".shape")

  shapes.forEach((shape, index) => {
    const speed = 0.5 + index * 0.1
    shape.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Add typing effect to hero text (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize animations when page loads
document.addEventListener("DOMContentLoaded", () => {
  // Initial scroll check
  animateOnScroll()
  updateScrollProgress()
  updateActiveNavLink()

  // Add entrance animations to skill tags
  const skillTags = document.querySelectorAll(".skill-tag")
  skillTags.forEach((tag, index) => {
    tag.style.opacity = "0"
    tag.style.transform = "translateY(20px)"

    setTimeout(() => {
      tag.style.transition = "all 0.5s ease"
      tag.style.opacity = "1"
      tag.style.transform = "translateY(0)"
    }, 100 * index)
  })
})

// Add smooth reveal animation for project cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe project cards for animation
document.querySelectorAll(".project-card").forEach((card, index) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(30px)"
  card.style.transition = `all 0.6s ease ${index * 0.1}s`
  observer.observe(card)
})

// Add easter egg - Konami code
let konamiCode = []
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
]

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.code)

  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift()
  }

  if (konamiCode.join(",") === konamiSequence.join(",")) {
    // Easter egg activated!
    document.body.style.filter = "hue-rotate(180deg)"
    setTimeout(() => {
      document.body.style.filter = "none"
    }, 3000)

    // Show a fun message
    const message = document.createElement("div")
    message.textContent = "🎉 Konami Code Activated! 🎉"
    message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--gradient);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            font-size: 1.2rem;
            font-weight: bold;
            z-index: 9999;
            animation: fadeInUp 0.5s ease;
        `

    document.body.appendChild(message)

    setTimeout(() => {
      message.remove()
    }, 3000)

    konamiCode = []
  }
})


// Theme Toggle System
const themeToggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Check local storage for theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  body.classList.add("dark-mode");
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDarkMode = body.classList.contains("dark-mode");
    
    // Update local storage
    if (isDarkMode) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}






