// Loading Screen
window.addEventListener("load", () => {
  const loader = document.getElementById("loader")
  const mainContent = document.getElementById("mainContent")

  setTimeout(() => {
    loader.classList.add("hidden")
    mainContent.classList.add("visible")
  }, 3000)
})

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

resizeCanvas()

const codeSymbols = [
  "<",
  ">",
  "{",
  "}",
  "[",
  "]",
  "(",
  ")",
  "/",
  "\\",
  ";",
  ":",
  "=",
  "+",
  "-",
  "*",
  "function",
  "const",
  "let",
  "var",
  "if",
  "else",
  "return",
  "class",
  "import",
  "export",
  "await",
  "async",
  "=>",
  "&&",
  "||",
  "!",
  "?",
  ".",
  ",",
]

class CodeParticle {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.symbol = codeSymbols[Math.floor(Math.random() * codeSymbols.length)]
    this.fontSize = Math.random() * 12 + 10
    this.speedY = Math.random() * 0.5 + 0.2
    this.speedX = Math.random() * 0.3 - 0.15
    this.opacity = Math.random() * 0.3 + 0.1
    this.color = Math.random() > 0.5 ? "rgba(0, 240, 255," : "rgba(0, 102, 255,"
  }

  update() {
    this.y += this.speedY
    this.x += this.speedX

    if (this.y > canvas.height + 20) {
      this.y = -20
      this.x = Math.random() * canvas.width
    }

    if (this.x > canvas.width + 20) this.x = -20
    if (this.x < -20) this.x = canvas.width + 20
  }

  draw() {
    ctx.font = `${this.fontSize}px 'Courier New', monospace`
    ctx.fillStyle = `${this.color} ${this.opacity})`
    ctx.fillText(this.symbol, this.x, this.y)
  }
}

const codeParticlesArray = []
const numberOfCodeParticles = window.innerWidth < 768 ? 40 : 80

for (let i = 0; i < numberOfCodeParticles; i++) {
  codeParticlesArray.push(new CodeParticle())
}

class GlowOrb {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.radius = Math.random() * 150 + 100
    this.speedX = Math.random() * 0.3 - 0.15
    this.speedY = Math.random() * 0.3 - 0.15
    this.hue = Math.random() > 0.5 ? 180 : 200
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.speedX *= -1
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.speedY *= -1
    }
  }

  draw() {
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
    gradient.addColorStop(0, `hsla(${this.hue}, 100%, 50%, 0.05)`)
    gradient.addColorStop(0.5, `hsla(${this.hue}, 100%, 50%, 0.02)`)
    gradient.addColorStop(1, "transparent")

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
  }
}

const orbsArray = []
const numberOfOrbs = window.innerWidth < 768 ? 2 : 3

for (let i = 0; i < numberOfOrbs; i++) {
  orbsArray.push(new GlowOrb())
}

function animateCodeBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < orbsArray.length; i++) {
    orbsArray[i].update()
    orbsArray[i].draw()
  }

  for (let i = 0; i < codeParticlesArray.length; i++) {
    codeParticlesArray[i].update()
    codeParticlesArray[i].draw()
  }

  requestAnimationFrame(animateCodeBackground)
}

animateCodeBackground()

window.addEventListener("resize", () => {
  resizeCanvas()
})

// Typing Effect
const typingTexts = [
  "console.log('Hello World!');",
  "const code = 'passion';",
  "function build() { return 'success'; }",
  "while(alive) { code(); }",
]

let textIndex = 0
let charIndex = 0
let isDeleting = false
const typedTextElement = document.getElementById("typedText")

function typeText() {
  const currentText = typingTexts[textIndex]

  if (isDeleting) {
    typedTextElement.textContent = currentText.substring(0, charIndex - 1)
    charIndex--
  } else {
    typedTextElement.textContent = currentText.substring(0, charIndex + 1)
    charIndex++
  }

  let typeSpeed = isDeleting ? 50 : 100

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    textIndex = (textIndex + 1) % typingTexts.length
    typeSpeed = 500
  }

  setTimeout(typeText, typeSpeed)
}

setTimeout(typeText, 1000)

const mobileToggle = document.getElementById("mobileToggle")
const navMenu = document.getElementById("navMenu")

mobileToggle.addEventListener("click", (e) => {
  e.stopPropagation()
  mobileToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
})

const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileToggle.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
    mobileToggle.classList.remove("active")
    navMenu.classList.remove("active")
  }
})

// Active Navigation on Scroll
const sections = document.querySelectorAll("section")

window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset

  const header = document.getElementById("header")
  if (scrollY > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight
    const sectionId = section.getAttribute("id")

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
})

// Certificate Modal Functions
const certificatesData = [
  {
    title: "Girl Script Summer Of Code 2025",
    issuer: "GSSoC",
    description:
      "As a Contributor in GirlScript Summer of Code 2025, demonstrating strong commitment, collaboration, and open-source development skills.",
    image: "gssoc.jpg",
    link: "https://drive.google.com/drive/folders/1h_DlyVVtLpo5-R-z83HLbKYsmODChRQL",
  },
  {
    title: "Web Development Intern",
    issuer: "Prodigy Infotech",
    description:
      "Successfully completed a 1-month Web Development Internship at Prodigy Infotech with outstanding performance, gaining hands-on experience in real-world web projects.",
    image: "LOR prodigy Infotech.jpg",
    link: "https://drive.google.com/drive/folders/1h_DlyVVtLpo5-R-z83HLbKYsmODChRQL",
  },
  {
    title: "Paranox2.0 Hackathon",
    issuer: "TechXNinjas",
    description:
      "Recognized as a Top 200 Team member in Paranox 2.0, a national-level innovation hackathon, for creativity, teamwork, and qualifying for the pre-final pitching round.",
    image: "TechXNinjas.jpg",
    link: "https://drive.google.com/drive/folders/1h_DlyVVtLpo5-R-z83HLbKYsmODChRQL",
  },
  {
    title: "Key Contributor",
    issuer: "binnovative",
    description:
      "Awarded Key Contributor at PhysTech Hackday 2025 for impactful contributions, innovation, and active participation in technology-driven problem solving.",
    image: "binnovative.jpg",
    link: "https://drive.google.com/drive/folders/1h_DlyVVtLpo5-R-z83HLbKYsmODChRQL",
  },
  {
    title: "Mckinsey.org Forward Program",
    issuer: "Mckinsey.org",
    description:
      "Successfully completed the McKinsey.org Forward Program, gaining practical skills in problem-solving, communication, adaptability, and professional growth.",
    image: "Mckinsey Badge.jpg",
    link: "https://drive.google.com/drive/folders/1h_DlyVVtLpo5-R-z83HLbKYsmODChRQL",
  },
  {
    title: "Code Carnage",
    issuer: "GFG and Developers Community, Chandigarh University",
    description:
      "GeeksforGeeks and Alexa Developers Community, Chandigarh University, enhancing problem-solving and competitive programming skills.",
    image: "code carnage issuer.jpg",
    link: "https://drive.google.com/drive/folders/1h_DlyVVtLpo5-R-z83HLbKYsmODChRQL",
  },
]

function openCertificate(index) {
  const cert = certificatesData[index]
  const modal = document.getElementById("certificateModal")

  document.getElementById("certModalImg").src = cert.image
  document.getElementById("certModalTitle").textContent = cert.title
  document.getElementById("certModalIssuer").textContent = cert.issuer
  document.getElementById("certModalDescription").textContent = cert.description
  document.getElementById("certModalLink").href = cert.link

  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeCertificate() {
  const modal = document.getElementById("certificateModal")
  modal.classList.remove("active")
  document.body.style.overflow = ""
}

// Project Modal Functions
const projectsData = [
  {
    title: "Fit Tracker Pro",
    description:
      "Fit Tracker Pro is a modern, responsive web application designed to help users monitor their fitness activities and health trends in a visually engaging way. Developed using HTML, CSS, JavaScript, Particle.js, and Chart.js, the platform offers an intuitive dashboard with interactive charts and animations for better data visualization.",
    image: "Fi tracker pro2.png",
    tags: ["HTML", "PARTICLE.JS", "CHART.js", "JAVASCRIPT", "CSS3"],
    repo: "https://github.com/Piyush667-gif/Fit-Tracker-Pro",
    live: "https://fit-tracker-pro.vercel.app/",
  },
  {
    title: "Rent Chain",
    description:
      "RentChain is a blockchain-powered property rental platform that brings transparency, trust, and automation to rental agreements, property management, and verification.",
    image: "rent chain2.png",
    tags: ["HTML", "SUPABASE", "CSS3", "Javascript"],
    repo: "https://github.com/Piyush667-gif/RENT-CHAIN-",
    live: "https://rent-chain-innovatrix.vercel.app/",
  },
  {
    title: "Mood Tracker",
    description:
      "Real-time weather app with location-based forecasts, hourly and weekly predictions, beautiful UI with dynamic backgrounds, and weather alerts. Integrates with multiple weather APIs for accuracy.",
    image: "mood-tracker2.png",
    tags: ["HTML", "CSS3", "JAVASCRIPT"],
    repo: "https://github.com/Piyush667-gif/mood-tracker-calendar",
    live: "https://mood-tracker-calendar-iota.vercel.app/",
  },
]

function openProject(index) {
  const project = projectsData[index]
  const modal = document.getElementById("projectModal")

  document.getElementById("projectModalImg").src = project.image
  document.getElementById("projectModalTitle").textContent = project.title
  document.getElementById("projectModalDescription").textContent = project.description
  document.getElementById("projectModalRepo").href = project.repo
  document.getElementById("projectModalLive").href = project.live

  const tagsContainer = document.getElementById("projectModalTags")
  tagsContainer.innerHTML = ""
  project.tags.forEach((tag) => {
    const tagSpan = document.createElement("span")
    tagSpan.className = "tag"
    tagSpan.textContent = tag
    tagsContainer.appendChild(tagSpan)
  })

  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeProject() {
  const modal = document.getElementById("projectModal")
  modal.classList.remove("active")
  document.body.style.overflow = ""
}

// Close modals when clicking outside
document.addEventListener("click", (e) => {
  if (e.target.id === "projectModal") {
    closeProject()
  }
  if (e.target.id === "certificateModal") {
    closeCertificate()
  }
})

// Form Submission
const contactForm = document.querySelector(".contact-form")
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()
  alert("Thank you for your message! I will get back to you soon.")
  contactForm.reset()
})

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero-content")
  if (hero && scrolled < 600) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`
    hero.style.opacity = 1 - scrolled / 700
  }
})

// Smooth Scroll Animation on View
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

document.querySelectorAll(".stat-item, .envelope-container, .certificate-card, .roadmap-item").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "all 0.6s ease"
  observer.observe(el)
})

// Typing Animation for Code Editor (About Section)
const typedCodeElements = document.querySelectorAll(".typed-code")

const codeVariations = [
  [
    { text: "const", color: "keyword" },
    { text: " developer = {", color: "punctuation" },
  ],
  [
    { text: "  ", color: "punctuation" },
    { text: "name", color: "key" },
    { text: ": ", color: "punctuation" },
    { text: "'Piyush Pandey'", color: "string" },
    { text: ",", color: "punctuation" },
  ],
  [
    { text: "  ", color: "punctuation" },
    { text: "skills", color: "key" },
    { text: ": [", color: "punctuation" },
    { text: "'React'", color: "string" },
    { text: ", ", color: "punctuation" },
    { text: "'JS'", color: "string" },
    { text: ",", color: "punctuation" },
    { text: "'HTML'", color: "string" },
    { text: ",", color: "punctuation" },
    { text: "'CSS'", color: "string" },
    { text: " ]", color: "punctuation" },
  ],
  [
    { text: "  ", color: "punctuation" },
    { text: "passion", color: "key" },
    { text: ": ", color: "punctuation" },
    { text: "'Coding'", color: "string" },
  ],
  [{ text: "};", color: "punctuation" }],
]

const codeVariations2 = [
  [
    { text: "const", color: "keyword" },
    { text: " coder = {", color: "punctuation" },
  ],
  [
    { text: "  ", color: "punctuation" },
    { text: "role", color: "key" },
    { text: ": ", color: "punctuation" },
    { text: "'Front End Dev'", color: "string" },
    { text: ",", color: "punctuation" },
  ],
  [
    { text: "  ", color: "punctuation" },
    { text: "tech", color: "key" },
    { text: ": [", color: "punctuation" },
    { text: "'JavaScript'", color: "string" },
    { text: ", ", color: "punctuation" },
    { text: "'React.Js'", color: "string" },
    { text: "],", color: "punctuation" },
  ],
  [
    { text: "  ", color: "punctuation" },
    { text: "love", color: "key" },
    { text: ": ", color: "punctuation" },
    { text: "'Problem Solving'", color: "string" },
  ],
  [{ text: "};", color: "punctuation" }],
]

const codeVariations3 = [
  [
    { text: "const", color: "keyword" },
    { text: " engineer = {", color: "punctuation" },
  ],
  [
    { text: "  ", color: "punctuation" },
    { text: "expertise", color: "key" },
    { text: ": ", color: "punctuation" },
    { text: "'Web Development'", color: "string" },
    { text: ",", color: "punctuation" },
  ],
  [
    { text: "  ", color: "punctuation" },
    { text: "tools", color: "key" },
    { text: ": [", color: "punctuation" },
    { text: "'Replit'", color: "string" },
    { text: ", ", color: "punctuation" },
    { text: "'VS Code'", color: "string" },
    { text: "],", color: "punctuation" },
  ],
  [
    { text: "  ", color: "punctuation" },
    { text: "goal", color: "key" },
    { text: ": ", color: "punctuation" },
    { text: "'Innovation'", color: "string" },
  ],
  [{ text: "};", color: "punctuation" }],
]

const allVariations = [codeVariations, codeVariations2, codeVariations3]
let currentVariationIndex = 0

function typeCodeLine(element, lineIndex, variation) {
  const parts = variation[lineIndex]
  let currentPartIndex = 0
  let currentCharIndex = 0
  element.innerHTML = ""

  function typeNextChar() {
    if (currentPartIndex >= parts.length) {
      return
    }

    const currentPart = parts[currentPartIndex]
    const fullText = currentPart.text

    if (currentCharIndex < fullText.length) {
      const span = element.querySelector(`.part-${currentPartIndex}`) || document.createElement("span")
      span.className = `color-${currentPart.color} part-${currentPartIndex}`
      span.textContent = fullText.substring(0, currentCharIndex + 1)

      if (!element.querySelector(`.part-${currentPartIndex}`)) {
        element.appendChild(span)
      }

      currentCharIndex++
      setTimeout(typeNextChar, 50)
    } else {
      currentPartIndex++
      currentCharIndex = 0
      if (currentPartIndex < parts.length) {
        setTimeout(typeNextChar, 50)
      }
    }
  }

  typeNextChar()
}

function startTypingAnimation() {
  const currentVariation = allVariations[currentVariationIndex]

  typedCodeElements.forEach((element, index) => {
    const delay = Number.parseFloat(element.getAttribute("data-delay")) * 1000

    setTimeout(() => {
      typeCodeLine(element, index, currentVariation)
    }, delay)
  })

  setTimeout(() => {
    typedCodeElements.forEach((element) => {
      element.innerHTML = ""
    })

    currentVariationIndex = (currentVariationIndex + 1) % allVariations.length

    setTimeout(startTypingAnimation, 500)
  }, 8000)
}

setTimeout(() => {
  if (typedCodeElements.length > 0) {
    startTypingAnimation()
  }
}, 3500)





