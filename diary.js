let entries = [];
let currentIndex = -1;

// async/awaitとPromise.allを使ってlightとdark両方のJSONファイルを読み込む関数
async function loadDiaryEntries() {
  const lightFile = "entries_light.json";
  const darkFile = "entries_dark.json";

  try {
    // 2つのfetchを同時に実行
    const [lightRes, darkRes] = await Promise.all([
      fetch(lightFile),
      fetch(darkFile)
    ]);
    
    // エラーハンドリング
    if (!lightRes.ok) throw new Error(`Failed to fetch ${lightFile}`);
    if (!darkRes.ok) throw new Error(`Failed to fetch ${darkFile}`);
    
    // JSONとしてパース
    const lightEntries = await lightRes.json();
    const darkEntries = await darkRes.json();

    // 両方のデータをマージし、1つの配列にまとめる
    entries = [...lightEntries, ...darkEntries];
    
    // 日記一覧をレンダリング
    renderList();

  } catch (error) {
    console.error("Error loading diary entries:", error);
  }
}

// ページロード時に読み込み開始
loadDiaryEntries();

function renderList() {
  const container = document.getElementById("entry-list");
  if (!container) return; // コンテナが存在しない場合は何もしない
  
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

document.getElementById("prev-entry")?.addEventListener("click", () => {
  if (currentIndex > 0) showEntry(currentIndex - 1);
});

document.getElementById("next-entry")?.addEventListener("click", () => {
  if (currentIndex < entries.length - 1) showEntry(currentIndex + 1);
});

document.getElementById("back-button")?.addEventListener("click", () => {
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
