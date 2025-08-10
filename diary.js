let entries = [];
let currentIndex = -1;

fetch("entries_light.json")
  .then((res) => res.json())
  .then((data) => {
    entries = data;
    renderList();
  });

function renderList() {
  const container = document.getElementById("entry-list");
  container.innerHTML = "";
  entries.forEach((entry, index) => {
    const box = document.createElement("div");
    box.className = "entry-box";
    box.textContent = entry.date;
    box.addEventListener("click", () => showEntry(index));
    container.appendChild(box);
  });
}

function showEntry(index) {
  currentIndex = index;
  const entry = entries[index];
  document.getElementById("entry-date").textContent = entry.date;
  document.getElementById("entry-body").textContent = entry.content;
  document.getElementById("entry-list").classList.add("hidden");
  document.getElementById("entry-detail").classList.remove("hidden");
}

document.getElementById("prev-entry").addEventListener("click", () => {
  if (currentIndex > 0) showEntry(currentIndex - 1);
});

document.getElementById("next-entry").addEventListener("click", () => {
  if (currentIndex < entries.length - 1) showEntry(currentIndex + 1);
});

document.getElementById("back-button").addEventListener("click", () => {
  const isDetailVisible = !document.getElementById("entry-detail").classList.contains("hidden");

  if (isDetailVisible) {
    // 本文表示中なら → 一覧に戻る
    document.getElementById("entry-detail").classList.add("hidden");
    document.getElementById("entry-list").classList.remove("hidden");
  } else {
    // 一覧表示中なら → 日記選択（diary.html）へ戻る
    window.location.href = "diary.html";
  }
});
