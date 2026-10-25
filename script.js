
document.addEventListener("DOMContentLoaded", () => {
  // Automatically update the copyright year
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Smooth navigation to each section
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
});

// ==================================
// PROJECT DETAILS MODAL
// ==================================

const projects = {
  campuspark: {
    title: "CampusPark+",
    description:
      "A smart university parking system developed " +
      "as a capstone project at UDST. The platform " +
      "combines a mobile booking application, " +
      "parking management, OCR, occupancy prediction, " +
      "and database integration.",

    images: [
      "images/CampusPark Mobile App.png",
      "images/AdminDashboard1.png",
      "images/AdminDashboard2.png",
      "images/CampusPark+Logo.png"
    ],

    features: [
      "Led the capstone development team",
      "Developed mobile application features using React Native",
      "Integrated FastAPI backend services",
      "Managed PostgreSQL data through Supabase",
      "Implemented parking reservation workflows",
      "Integrated OCR and parking occupancy features",
      "Contributed to the security dashboard integration"
    ]
  },

  u17: {
    title: "U17 International Cup",
    description:
      "A full-stack football tournament management " +
      "web application developed during my internship " +
      "at Al Kass Sports Channel. The system manages " +
      "tournaments, teams, players, matches, lineups, " +
      "events, and standings.",

    images: [
      "images/U17 1.png"
    ],

    features: [
      "Developed web interfaces using HTML, CSS, and JavaScript",
      "Built backend functionality using Python and Flask",
      "Used PostgreSQL for relational data storage",
      "Used SQLAlchemy ORM for database operations",
      "Implemented CRUD operations",
      "Developed match management and lineup features",
      "Implemented automatic standings calculations"
    ]
  }
};

const modal = document.getElementById("projectModal");
const modalContent = modal.querySelector(".modal-content");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalGallery = document.getElementById("modalGallery");
const modalFeatures = document.getElementById("modalFeatures");
const closeButton = modal.querySelector(".modal-close");

let previousFocus = null;

function closeProjectModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (previousFocus) {
    previousFocus.focus();
  }
}

document.querySelectorAll(".project-btn").forEach(button => {
  button.addEventListener("click", () => {
    const project = projects[button.dataset.project];

    if (!project) return;

    previousFocus = document.activeElement;

    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;

    modalGallery.replaceChildren();
    modalFeatures.replaceChildren();

    project.images.forEach((src, index) => {
      const img = document.createElement("img");
        img.src = src;
        img.alt = `${project.title} screenshot ${index + 1}`;
        img.loading = "lazy";

        img.onerror = () => {
            console.error("Failed to load image:", src);
};

      modalGallery.appendChild(img);
    });

    project.features.forEach(feature => {
      const li = document.createElement("li");
      li.textContent = feature;
      modalFeatures.appendChild(li);
    });

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modalContent.scrollTop = 0;
    closeButton.focus();
  });
});

closeButton.addEventListener("click", closeProjectModal);

modal.querySelector(".modal-overlay")
  .addEventListener("click", closeProjectModal);

document.addEventListener("keydown", event => {
  if (!modal.classList.contains("active")) return;

  if (event.key === "Escape") {
    closeProjectModal();
  }

  if (event.key === "Tab") {
    const focusable = Array.from(
      modalContent.querySelectorAll(
        'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => !el.disabled);

    if (!focusable.length) {
      event.preventDefault();
      modalContent.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

/* ==================================
   MOBILE NAVIGATION
================================== */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (!menuToggle || !navLinks) return;

  function closeMenu() {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  // Close menu after clicking a navigation link
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu when Escape is pressed
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // Reset menu when returning to desktop width
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
});
