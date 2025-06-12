let allCountryNames = [];

document.addEventListener("DOMContentLoaded", function () {
  const searchInput1 = document.getElementById("searchInput1");
  const searchInput2 = document.getElementById("searchInput2");
  const suggestions1 = document.getElementById("suggestions1");
  const suggestions2 = document.getElementById("suggestions2");

  // Load only country names for suggestions
  async function loadCountryNames() {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
      const data = await res.json();
      allCountryNames = data.map(c => c.name.common).sort();
    } catch (error) {
      console.error("Lỗi khi tải danh sách quốc gia:", error);
    }
  }

  loadCountryNames();

  function setupSuggestion(input, suggestionBox) {
    let debounceTimer;

    input.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const keyword = input.value.trim().toLowerCase();
        suggestionBox.innerHTML = "";
        suggestionBox.style.display = "none";

        if (keyword.length > 1) {
          const matches = allCountryNames
            .filter(name => name.toLowerCase().includes(keyword))
            .slice(0, 5);

          if (matches.length) {
            suggestionBox.style.display = "block";
            matches.forEach(name => {
              const li = document.createElement("li");
              li.textContent = name;
              li.style.cssText = "padding:10px; cursor:pointer; border-bottom:1px solid #eee;";
              li.addEventListener("click", () => {
                input.value = name;
                suggestionBox.innerHTML = "";
                suggestionBox.style.display = "none";
              });
              suggestionBox.appendChild(li);
            });
          }
        }
      }, 300);
    });

    document.addEventListener("click", (e) => {
      if (!input.contains(e.target) && !suggestionBox.contains(e.target)) {
        suggestionBox.innerHTML = "";
        suggestionBox.style.display = "none";
      }
    });
  }

  setupSuggestion(searchInput1, suggestions1);
  setupSuggestion(searchInput2, suggestions2);
});

// Fetch full country data by name
async function getCountryData(name) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`);
    if (!res.ok) throw new Error(`Không tìm thấy quốc gia: ${name}`);
    const data = await res.json();
    return data[0];
  } catch (error) {
    console.error(error.message);
    alert(error.message);
    return null;
  }
}

// Main compare function
async function compare() {
  const name1 = document.getElementById("searchInput1").value.trim();
  const name2 = document.getElementById("searchInput2").value.trim();
  const container = document.getElementById("compareContainer");
  const result = document.getElementById("compareResult");

  container.innerHTML = "";
  result.innerHTML = "";

  if (!name1 || !name2) {
    alert("Vui lòng nhập đủ tên hai quốc gia.");
    return;
  }

  const country1 = await getCountryData(name1);
  const country2 = await getCountryData(name2);

  if (!country1 || !country2) return;

  [country1, country2].forEach(country => {
    const div = document.createElement("div");
    div.className = "card";

    const capital = country.capital?.[0] || "Không rõ";
    const languages = country.languages ? Object.values(country.languages).join(", ") : "Không rõ";
    const currency = country.currencies
      ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol || ""})`).join(", ")
      : "Không rõ";

    div.innerHTML = `
      <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" class="country-flag-compare" />
      <h3>${country.name.common}</h3>
      <p><strong>Thủ đô:</strong> ${capital}</p>
      <p><strong>Dân số:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Diện tích:</strong> ${country.area.toLocaleString()} km²</p>
      <p><strong>Ngôn ngữ:</strong> ${languages}</p>
      <p><strong>Tiền tệ:</strong> ${currency}</p>
    `;
    container.appendChild(div);
  });

  const largerArea = country1.area > country2.area ? name1 : country1.area < country2.area ? name2 : "Bằng nhau";
  const morePop = country1.population > country2.population ? name1 : country1.population < country2.population ? name2 : "Bằng nhau";
  const langCount1 = country1.languages ? Object.keys(country1.languages).length : 0;
  const langCount2 = country2.languages ? Object.keys(country2.languages).length : 0;
  const moreLang = langCount1 > langCount2 ? name1 : langCount1 < langCount2 ? name2 : "Bằng nhau";

  result.innerHTML = `
    <h3>📊 Kết quả So sánh:</h3>
    <p>🌍 Diện tích lớn hơn: <strong>${largerArea}</strong></p>
    <p>👥 Dân số nhiều hơn: <strong>${morePop}</strong></p>
    <p>🗣️ Ngôn ngữ đa dạng hơn: <strong>${moreLang}</strong></p>
  `;
}
