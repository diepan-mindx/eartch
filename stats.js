document.addEventListener("DOMContentLoaded", () => {
  fetch(
    "https://restcountries.com/v3.1/all?fields=name,area,population,languages"
  )
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((data) => {
      let largest = null;
      let smallest = null;
      let mostPopulous = null;
      let leastPopulous = null;
      let mostLanguages = null;

      data.forEach((country) => {
        const area = country.area || 0;
        const population = country.population || 0;
        const languages = country.languages || {};

        if (!largest || area > largest.area) largest = country;
        if (!smallest || area < smallest.area) smallest = country;
        if (!mostPopulous || population > mostPopulous.population)
          mostPopulous = country;
        if (!leastPopulous || population < leastPopulous.population)
          leastPopulous = country;
        if (
          !mostLanguages ||
          Object.keys(languages).length >
            Object.keys(mostLanguages.languages || {}).length
        ) {
          mostLanguages = country;
        }
      });

      const statsDiv = document.getElementById("stats");
      if (!statsDiv) {
        console.error("Element with id 'stats' not found.");
        return;
      }

      statsDiv.innerHTML = `
        <div class="stat-block">
          <h3>🌍 Quốc gia lớn nhất:</h3>
          <p>${largest.name.common} - ${largest.area.toLocaleString()} km²</p>
        </div>
        <div class="stat-block">
          <h3>🏝️ Quốc gia nhỏ nhất:</h3>
          <p>${smallest.name.common} - ${smallest.area.toLocaleString()} km²</p>
        </div>
        <div class="stat-block">
          <h3>👥 Quốc gia đông dân nhất:</h3>
          <p>${
            mostPopulous.name.common
          } - ${mostPopulous.population.toLocaleString()} người</p>
        </div>
        <div class="stat-block">
          <h3>👶 Quốc gia ít dân nhất:</h3>
          <p>${
            leastPopulous.name.common
          } - ${leastPopulous.population.toLocaleString()} người</p>
        </div>
        <div class="stat-block">
          <h3>🗣️ Quốc gia có nhiều ngôn ngữ nhất:</h3>
          <p>${mostLanguages.name.common} - ${
        Object.keys(mostLanguages.languages).length
      } ngôn ngữ</p>
        </div>
      `;
    })
    .catch((err) => {
      console.error("Failed to fetch country data:", err);
      const statsDiv = document.getElementById("stats");
      if (statsDiv) {
        statsDiv.innerHTML = `<p>⚠️ Không thể tải dữ liệu quốc gia. Vui lòng thử lại sau.</p>`;
      }
    });
});
