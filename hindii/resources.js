const searchBox = document.getElementById("searchBox");
const resourceCards = document.querySelectorAll(".resource-card");
const noResults = document.getElementById("noResults");
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

// Filter function (only search now)
function filterResources() {
  const searchText = searchBox.value.toLowerCase();
  let visibleCount = 0;

  // Only filter inside the active tab
  const activeSection = document.querySelector(".tab-content.active");
  const cards = activeSection.querySelectorAll(".resource-card");

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    const matchesSearch = text.includes(searchText);

    if (matchesSearch) {
      card.style.display = "block";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  noResults.style.display = visibleCount === 0 ? "block" : "none";
}

// Tab switcher
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.target).classList.add("active");
    filterResources();
  });
});

// Handle ?class=VI or class=VII in URL
const params = new URLSearchParams(window.location.search);
const selectedClass = params.get("class");

if (selectedClass) {
  tabs.forEach(t => t.classList.remove("active"));
  tabContents.forEach(c => c.classList.remove("active"));

  const targetTab = document.querySelector(`.tab[data-target="class${selectedClass}"]`);
  const targetSection = document.getElementById(`class${selectedClass}`);

  if (targetTab && targetSection) {
    targetTab.classList.add("active");
    targetSection.classList.add("active");
  }
}

// Listeners
searchBox.addEventListener("input", filterResources); 