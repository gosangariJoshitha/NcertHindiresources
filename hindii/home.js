const searchBox = document.getElementById("searchBox");
const classFilter = document.getElementById("classFilter");
const tables = document.querySelectorAll(".resource-table");
const noResults = document.getElementById("noResults");

function filterResources() {
  const searchText = searchBox.value.toLowerCase();
  const selectedClass = classFilter.value;
  let visibleCount = 0;

  tables.forEach(table => {
    const tableClass = table.getAttribute("data-class");
    let rowVisible = false;

    if (selectedClass === "all" || tableClass === selectedClass) {
      table.style.display = "table";
      const rows = table.getElementsByTagName("tr");

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const text = row.textContent.toLowerCase();
        const matchesSearch = text.includes(searchText);

        if (matchesSearch) {
          row.style.display = "";
          rowVisible = true;
          visibleCount++;
        } else {
          row.style.display = "none";
        }
      }

      if (!rowVisible) {
        table.style.display = "none";
      }
    } else {
      table.style.display = "none";
    }
  });

  noResults.style.display = (visibleCount === 0) ? "block" : "none";
}

searchBox.addEventListener("input", filterResources);
classFilter.addEventListener("change", filterResources);
