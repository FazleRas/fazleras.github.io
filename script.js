// Theme toggle: cycles light/dark, persisted in localStorage.
// With no saved choice the site follows the system scheme (see styles.css).
const toggle = document.getElementById("theme-toggle");

function currentTheme() {
  const set = document.documentElement.dataset.theme;
  if (set) return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

toggle.addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
});

document.getElementById("year").textContent = new Date().getFullYear();

// Intro fade: the greeting slides up and fades out as you scroll past it.
const introInner = document.querySelector(".intro-inner");
const scrollCue = document.querySelector(".scroll-cue");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Section reveal: fade sections up as they enter the viewport.
const sections = document.querySelectorAll("main .section");

if ("IntersectionObserver" in window && !reduceMotion.matches) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px" }
  );
  sections.forEach((s) => io.observe(s));
} else {
  sections.forEach((s) => s.classList.add("in-view"));
}

// Insurance: never leave content invisible when the reveal can't fire.
// Skips the fade too; frozen renderers never finish a transition.
const revealAll = () =>
  sections.forEach((s) => {
    s.style.transition = "none";
    s.classList.add("in-view");
  });

// Headless renderers and background tabs (link-preview bots, screenshot
// tools) throttle the observer and freeze transitions.
if (document.hidden) revealAll();

// Printing never scrolls, so un-revealed sections would print blank.
window.addEventListener("beforeprint", revealAll);

if (introInner && !reduceMotion.matches) {
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    const progress = Math.min(1, y / (window.innerHeight * 0.55));
    introInner.style.opacity = String(1 - progress);
    introInner.style.transform = `translateY(${-y * 0.25}px)`;
    if (scrollCue && y > 0) {
      // Kill the entrance/bob animations; their fill would override this fade.
      scrollCue.style.animation = "none";
      scrollCue.style.opacity = String(Math.max(0, 1 - progress * 2));
    }
    // Reveal anything a fast jump scrolled past before it could intersect.
    for (const s of sections) {
      if (s.getBoundingClientRect().bottom < 0) s.classList.add("in-view");
    }
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
}
