let entries = [];
let currentIndex = -1;

// JSONファイルをフェッチ
fetch("entries_dark.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to fetch entries_dark.json: ${res.status} ${res.statusText}`);
    }
    return res.json();
  })
  .then((data) => {
    entries = data;
    renderList();
  })
  .catch((error) => console.error("Error loading diary entries:", error));

function renderList() {
  const container = document.getElementById("entry-list");
  if (!container) return; 
  
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
  
  const entryImage = document.getElementById("entry-image");
  if (entryImage && entry.image) {
    entryImage.src = entry.image;
    entryImage.style.display = 'block';
  } else if (entryImage) {
    entryImage.style.display = 'none';
  }

  document.getElementById("entry-list").classList.add("hidden");
  document.getElementById("entry-detail").classList.remove("hidden");
}

document.getElementById("prev-entry")?.addEventListener("click", () => {
  if (currentIndex > 0) showEntry(currentIndex - 1);
});

document.getElementById("next-entry")?.addEventListener("click", () => {
  if (currentIndex < entries.length - 1) showEntry(currentIndex + 1);
});

document.getElementById("back-button")?.addEventListener("click", () => {
  const isDetailVisible = !document.getElementById("entry-detail").classList.contains("hidden");

  if (isDetailVisible) {
    document.getElementById("entry-detail").classList.add("hidden");
    document.getElementById("entry-list").classList.remove("hidden");
  } else {
    window.location.href = "diary.html";
  }
});
