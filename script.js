let selectedRating = 0;
const stars = document.querySelectorAll("#starRating span");

stars.forEach(star => {
  star.addEventListener("click", () => {
    selectedRating = star.getAttribute("data-value");
    stars.forEach(s => s.classList.remove("active"));
    for (let i = 0; i < selectedRating; i++) {
      stars[i].classList.add("active");
    }
  });
});

document.getElementById("surveyForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nama = e.target.nama.value.trim();
  const ulasan = e.target.ulasan.value.trim();

  if (!selectedRating) {
    alert("Silakan pilih bintang!");
    return;
  }

  const data = { nama, rating: selectedRating, ulasan };

  const res = await fetch("/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    document.getElementById("successMessage").classList.remove("hidden");
    e.target.reset();
    stars.forEach(s => s.classList.remove("active"));
    selectedRating = 0;
  }
});
