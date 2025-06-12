  const searchInput = document.getElementById("search-input");
  const cards = document.querySelectorAll(".card");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    cards.forEach(card => {
      const title = card.querySelector(".lesson-title").textContent.toLowerCase();
      const desc = card.querySelector(".lesson-description").textContent.toLowerCase();
      const keywords = Array.from(card.querySelectorAll(".keyword")).map(k => k.textContent.toLowerCase()).join(" ");

      const matches = title.includes(query) || desc.includes(query) || keywords.includes(query);

  card.style.display = matches ? "" : "none";

    });
  });



    document.addEventListener("DOMContentLoaded", function () {
      const cards = document.querySelectorAll(".cards-grid .card");
      var subjectName = document.getElementById("subject").innerText.trim();
      cards.forEach((card, index) => {
        const lessonNumber = index + 1;
        card.addEventListener("click", function () {
          window.location.href = `../Notes/${subjectName}-notes.html#lesson${lessonNumber}`;
        });
      });
    });