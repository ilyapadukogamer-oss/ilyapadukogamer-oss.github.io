const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const storageKey = "ilya-homepage-theme";
let chosenTheme;

try {
  chosenTheme = localStorage.getItem(storageKey);
} catch {
  // The toggle still works when storage is unavailable.
}

function applyTheme() {
  const dark = chosenTheme === "dark" || (chosenTheme !== "light" && systemTheme.matches);
  root.dataset.theme = dark ? "dark" : "light";
  toggle.setAttribute("aria-pressed", String(dark));
}

toggle.addEventListener("click", () => {
  chosenTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme();
  try {
    localStorage.setItem(storageKey, chosenTheme);
  } catch {
    // Keep the selected theme for the current visit.
  }
});

systemTheme.addEventListener("change", applyTheme);
applyTheme();
toggle.hidden = false;
