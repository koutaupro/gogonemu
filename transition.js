window.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("transition-overlay");

  if (!overlay) return;

  // 🌸 フェードイン（白→ページ表示）
  // 最初はフェードアウトさせることで、ページがスッと見える
  requestAnimationFrame(() => {
    overlay.classList.add("fade-out");
  });

  // 🌙 リンククリック時のフェードアウト（ページ離脱）
  document.querySelectorAll('a[data-transition]').forEach(link => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // 無効リンク or アンカー or 同一ページはスキップ
      if (!href || href.startsWith("#") || href === window.location.pathname) return;

      e.preventDefault();

      // フェードアウト（白になる）
      overlay.classList.remove("fade-out");

      // ページ遷移を少し遅らせる
      setTimeout(() => {
        window.location.href = href;
      }, 600); // CSSと同じ 0.6s
    });
  });
});

