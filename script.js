document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("navigation");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", nav.classList.contains("open") ? "true" : "false");
    });
  }

  // Gentle reveal animation for cards as they enter the screen.
  const cards = document.querySelectorAll(".paper-card, .project-card, .timeline-card, .skill-card, .project-detail, .achievement-list article");
  cards.forEach(card => card.classList.add("reveal"));
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    cards.forEach(card => observer.observe(card));
  } else {
    cards.forEach(card => card.classList.add("visible"));
  }

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const subject = encodeURIComponent("Portfolio message from " + name);
      const body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message);
      document.getElementById("formNote").textContent = "Opening your email app...";
      window.location.href = "mailto:mavic.denalo@gmail.com?subject=" + subject + "&body=" + body;
    });
  }
});