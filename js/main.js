const searchInput = document.querySelector("#searchInput");
const sections = [...document.querySelectorAll(".doc-section")];
const navLinks = [...document.querySelectorAll(".sidebar nav a")];

// Search documentation sections by their visible text.
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  sections.forEach((section) => {
    const matches = section.textContent.toLowerCase().includes(query);
    section.hidden = query !== "" && !matches;
  });
});

// Filter the department reference table.
const departmentSearch = document.querySelector("#departmentSearch");
const departmentRows = [
  ...document.querySelectorAll("#departmentTable tbody tr")
];

departmentSearch.addEventListener("input", () => {
  const query = departmentSearch.value.trim().toLowerCase();

  departmentRows.forEach((row) => {
    row.hidden = !row.textContent.toLowerCase().includes(query);
  });
});

// Copy the example associated with a copy button.
document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const example = button.closest(".example");
    const code = example.querySelector("pre code").textContent;

    try {
      await navigator.clipboard.writeText(code);
      button.textContent = "Copied!";
    } catch {
      button.textContent = "Copy unavailable";
    }
  });
});

// Mark the active navigation item as the reader moves through the page.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    navLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${entry.target.id}`;

      if (active) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  });
}, {
  rootMargin: "-15% 0px -70% 0px"
});

sections.forEach((section) => observer.observe(section));
