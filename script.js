document.addEventListener("DOMContentLoaded", function () {

  // 鍵クリックでオーバーレイ表示（nemutaro.html用）
  const key = document.getElementById("secretKey");
  const overlay = document.getElementById("overlay");
  const closeBtn = document.getElementById("closeBtn");
  if (key && overlay && closeBtn) {
    key.addEventListener("click", () => {
      overlay.style.display = "flex";
    });
    closeBtn.addEventListener("click", () => {
      overlay.style.display = "none";
    });
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.style.display = "none";
    });
  }

  // パスワードモーダル（diary.html用）
  const lockedDiary = document.getElementById("lockedDiary");
  const passwordOverlay = document.getElementById("passwordOverlay");
  const closePasswordPopup = document.getElementById("closePasswordPopup");
  const checkPassword = document.getElementById("checkPassword");
  const passwordInput = document.getElementById("passwordInput");
  if (lockedDiary && passwordOverlay && closePasswordPopup && checkPassword && passwordInput) {
    lockedDiary.addEventListener("click", () => {
      passwordOverlay.style.display = "flex";
      passwordInput.value = "";
      passwordInput.focus();
    });
    closePasswordPopup.addEventListener("click", () => {
      passwordOverlay.style.display = "none";
    });
    passwordOverlay.addEventListener("click", (e) => {
      if (e.target === passwordOverlay) passwordOverlay.style.display = "none";
    });
    checkPassword.addEventListener("click", () => {
      if (passwordInput.value === "0606") {
        document.body.classList.add("fade-out");
        setTimeout(() => {
          window.location.href = "diary_dark.html";
        }, 500);
      } else {
        alert("パスワードが違います");
      }
    });
  }

  // ギャラリーモーダル
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const captionText = document.getElementById("caption");
  const sourceLink = document.getElementById("sourceLink");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const closeModal = document.getElementById("closeModal");

  if (modal && modalImg && captionText && sourceLink && closeModal && galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = item.src;
        captionText.textContent = item.alt;
        sourceLink.href = item.dataset.source || "#";
        sourceLink.textContent = "出典を見る";
      });
    });
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // 検索機能
  const searchInput = document.getElementById("searchCharacters");
  if (searchInput && galleryItems.length > 0) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();
      galleryItems.forEach(item => {
        const chars = item.dataset.characters.toLowerCase();
        item.style.display = chars.includes(query) ? "" : "none";
      });
    });
  }
});


document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sideMenu = document.querySelector('.side-menu');

    hamburgerMenu.addEventListener('click', function() {
        // ハンバーガーメニューのクラスを切り替えてバツボタンに変形
        hamburgerMenu.classList.toggle('is-active');

        // サイドメニューのクラスを切り替えてスライドイン/アウト
        sideMenu.classList.toggle('is-open');

        // メニューが開いている状態の場合（is-openクラスがある場合）は、
        // is-activeクラスを削除してバツボタンから元に戻す
        // そして is-open クラスも削除してメニューを閉じる
        // しかし、classList.toggle() が両方を制御するので、このロジックは不要になりました。
        // 単純にtoggle()を使うことで、開く⇔閉じるが切り替わります。
    });

    // サイドメニューのリンクをクリックしたときにメニューを閉じる（変更なし、このままでOK）
    const sideMenuItems = sideMenu.querySelectorAll('a');
    sideMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburgerMenu.classList.remove('is-active'); // バツボタンを元に戻す
            sideMenu.classList.remove('is-open');       // メニューを閉じる
        });
    });

    // 画面幅が変更されたときにメニューを閉じる（PC表示になった際など、変更なし、このままでOK）
    window.addEventListener('resize', function() {
        if (sideMenu.classList.contains('is-open') && window.innerWidth > 768) {
            hamburgerMenu.classList.remove('is-active');
            sideMenu.classList.remove('is-open');
        }
    });
});
