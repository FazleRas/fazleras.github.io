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
