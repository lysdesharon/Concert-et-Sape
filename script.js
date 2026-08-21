/* Festival Sape & Lumière — JavaScript Vanilla */

/* À REMPLACER AVANT LIVRAISON */
const WHATSAPP_NUMBER = "242000000000";
const FESTIVAL_OPENING_DATE = null;
// Exemple de date : "2026-12-04T18:00:00+01:00"

const header = document.querySelector(".site-header");
const nav = document.querySelector(".main-nav");
const navToggle = document.querySelector(".nav-toggle");

function closeMenu() {
  nav.classList.remove("open");
  navToggle.classList.remove("active");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Ouvrir le menu");
  document.body.classList.remove("menu-open");
}

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.classList.toggle("active", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
  document.body.classList.toggle("menu-open", isOpen);
});

document.querySelectorAll(".main-nav a").forEach(link => link.addEventListener("click", closeMenu));

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
}, { passive: true });

/* Compte à rebours */
const festivalDate = new Date("2026-12-04T18:00:00+01:00").getTime();

const countdown = setInterval(function () {

    const now = new Date().getTime();

    const difference = festivalDate - now;

    if (difference <= 0) {

        clearInterval(countdown);

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        document.getElementById("countdown-message").textContent =
            "Le Festival Sape & Lumière a commencé !";

        return;
    }

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (difference % (1000 * 60)) /
        1000
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}, 1000);

/* Programme */
const tabs = document.querySelectorAll(".tab");
const schedulePanels = document.querySelectorAll(".schedule-panel");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const day = tab.dataset.day;
    tabs.forEach(item => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    schedulePanels.forEach(panel => {
      const active = panel.id === `jour-${day}`;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
  });
});

/* Line-up */
const filters = document.querySelectorAll(".filter");
const artistCards = document.querySelectorAll(".artist-card");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    const selected = filter.dataset.filter;
    filters.forEach(item => item.classList.toggle("is-active", item === filter));
    artistCards.forEach(card => {
      card.hidden = !(selected === "all" || card.dataset.category === selected);
    });
  });
});

/* FAQ : un seul panneau ouvert */
const faqItems = document.querySelectorAll(".faq-list details");
faqItems.forEach(item => item.addEventListener("toggle", () => {
  if (!item.open) return;
  faqItems.forEach(other => {
    if (other !== item) other.removeAttribute("open");
  });
}));

/* WhatsApp */
function buildWhatsAppUrl(passName) {
  const message = `Bonjour, je souhaite réserver le ${passName} pour le Festival Sape & Lumière.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll(".whatsapp-link").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    if (WHATSAPP_NUMBER === "242000000000") {
      alert("Le numéro WhatsApp de l'organisation doit être renseigné dans script.js.");
      return;
    }
    window.open(buildWhatsAppUrl(link.dataset.pass), "_blank", "noopener,noreferrer");
  });
});

/* Formulaire */
const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");

function setFieldError(name, message) {
  const target = document.querySelector(`[data-error-for="${name}"]`);
  if (target) target.textContent = message;
}

form.addEventListener("submit", event => {
  event.preventDefault();
  ["name","phone","message"].forEach(name => setFieldError(name, ""));
  status.textContent = "";

  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const message = form.message.value.trim();
  let valid = true;

  if (name.length < 2) { setFieldError("name", "Veuillez renseigner votre nom complet."); valid = false; }
  if (!/^[0-9+()\s.-]{7,}$/.test(phone)) { setFieldError("phone", "Veuillez renseigner un numéro de téléphone valide."); valid = false; }
  if (message.length < 10) { setFieldError("message", "Votre message doit contenir au moins 10 caractères."); valid = false; }

  if (!valid) {
    status.textContent = "Veuillez corriger les champs indiqués.";
    return;
  }

  status.textContent = "Message validé. Le formulaire est prêt à être relié au service de contact de l'organisation.";
  form.reset();
});

/* Apparitions au scroll */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}
