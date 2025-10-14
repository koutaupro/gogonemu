document.addEventListener("DOMContentLoaded", function () {
  // ----------------------------------------------------
  // 共通機能
  // ----------------------------------------------------

  // ハンバーガーメニューの開閉機能 (統合)
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const sideMenu = document.querySelector(".side-menu");

  if (hamburgerMenu && sideMenu) {
    // 要素が存在する場合のみ実行
    hamburgerMenu.addEventListener("click", function () {
      // is-active と is-open の両方をトグル（元の is-active ロジックを優先）
      hamburgerMenu.classList.toggle("is-active");
      sideMenu.classList.toggle("is-open");
    });

    // メニュー項目をクリックしたらメニューを閉じる
    const sideMenuItems = sideMenu.querySelectorAll("a");
    sideMenuItems.forEach((item) => {
      item.addEventListener("click", function () {
        hamburgerMenu.classList.remove("is-active");
        sideMenu.classList.remove("is-open");
      });
    });

    // リサイズ時にメニューを閉じる
    window.addEventListener("resize", function () {
      // 画面幅が768pxを超えたら強制的に閉じる (CSSのブレイクポイントと合わせることを推奨)
      if (sideMenu.classList.contains("is-open") && window.innerWidth > 768) {
        hamburgerMenu.classList.remove("is-active");
        sideMenu.classList.remove("is-open");
      }
    });
  }

  // ----------------------------------------------------
  // キャラクターページ（またはTOPページ）専用機能
  // ----------------------------------------------------
  const welcomeImg = document.getElementById("welcomeImg");
  const welcomeText = document.getElementById("welcomeText");

  if (welcomeImg && welcomeText) {
    // 要素が存在する場合のみ実行
    const messages = {
      gogotaro: {
        normal: ["わー、きてくれてありがとー！", "いらっしゃーい！"],
        clicked: ["なあに？おれと遊びたいのー？", "くすぐったいよー！"],
      },
      nemutaro: {
        normal: ["...待ってたよ", "きてくれたんだ"],
        clicked: ["...なに？", "ボクに触っても面白くないよ"],
      },
      rico: {
        normal: ["やっほー、リコくんだよ〜", "ン、いらっしゃい〜"],
        clicked: ["何〜？触るならもっと強く叩いてよ〜", "暇だね〜"],
      },
      reon: {
        normal: ["こんにちは", "いらっしゃいませ"],
        clicked: ["...触ると危ないよ", "......やめて"],
      },
      kokoro: {
        normal: ["あっ、こ、こんにちはっ！？", "わ、き、きてくれたんですね...！"],
        clicked: ["わっ、ど、どうされました！？", "あ、あわ、私に触っても面白くないですよっ"],
      },
      koharu: {
        normal: ["...用が済んだらさっさと帰ってよね", "あー、いらっしゃい。さっさと用事済ませてよ"],
        clicked: ["ななな、何！？はやくどっかいって！", "か、勝手に触るとかほんとデリカシーない！"],
      },
    };

    const images = {
      gogotaro: {
        normal: "image/gogotaro_w.png", // HTML側でパスが合っているか確認してください
        clicked: "image/gogotaro_click.png",
      },
      nemutaro: {
        normal: "image/nemutaro_w.png",
        clicked: "image/nemutaro_click.png",
      },
      rico: {
        normal: "image/rico_w.png",
        clicked: "image/rico_click.png",
      },
      reon: {
        normal: "image/reon_w.png",
        clicked: "image/reon_click.png",
      },
      kokoro: {
        normal: "image/kokoro_w.png",
        clicked: "image/kokoro_click.png",
      },
      koharu: {
        normal: "image/koharu_w.png",
        clicked: "image/koharu_click.png",
      },
    };

    let timeoutId = null;
    function pickRandomChar() {
      const chars = Object.keys(messages);
      return chars[Math.floor(Math.random() * chars.length)];
    }
    function getRandomFromArray(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    let currentChar = null;

    function showMessage(type) {
      const text = getRandomFromArray(messages[currentChar][type]);
      const imgSrc = images[currentChar][type];

      welcomeImg.classList.remove("poyon-animation");
      void welcomeImg.offsetWidth;
      welcomeImg.src = imgSrc;
      welcomeImg.classList.add("poyon-animation");

      welcomeText.textContent = text;
    }

    function resetMessage() {
      showMessage("normal");
      timeoutId = null;
    }

    currentChar = pickRandomChar(); // DOMContentLoadedイベント内なので、ここで実行
    // 注意: HTMLで "gogotaro_w.png" のパスが指定されていない場合、ここは失敗する可能性があります
    // HTMLのimgタグのsrc属性を "image/gogotaro_w.png" に修正するか、
    // 上記 images オブジェクトの gogotaro のパスを修正してください。
    showMessage("normal"); 

    welcomeImg.parentElement.addEventListener("click", () => {
      showMessage("clicked");
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        resetMessage();
      }, 10000);
    });
  } // if (welcomeImg && welcomeText) の閉じ括弧

  // ----------------------------------------------------
  // ギャラリーページ専用機能
  // ----------------------------------------------------
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const captionText = document.getElementById("caption");
  const sourceLink = document.getElementById("sourceLink");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const closeModal = document.getElementById("closeModal");
  const searchInput = document.getElementById("searchCharacters");
  const prevArrow = document.getElementById("prevArrow"); // 矢印の要素を取得
  const nextArrow = document.getElementById("nextArrow"); // 矢印の要素を取得

  if (modal && modalImg && captionText && sourceLink && closeModal && galleryItems.length > 0 && searchInput && prevArrow && nextArrow) {
    let currentIndex = 0;
    let visibleGalleryItems = Array.from(galleryItems); // 最初は全てのアイテムが対象

    function updateVisibleItems() {
      visibleGalleryItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    }

    function showImage(index) {
      const item = visibleGalleryItems[index];
      if (!item) {
        modal.style.display = "none";
        return;
      }

      modalImg.src = item.src;
      modalImg.alt = item.alt;
      captionText.textContent = item.alt;

      const source = item.dataset.source;
      if (source) {
        sourceLink.href = source;
        sourceLink.style.display = "inline-block";
        sourceLink.textContent = "出典を見る";
      } else {
        sourceLink.style.display = "none";
      }
    }

    galleryItems.forEach((item) => {
      // indexは不要なので削除
      item.addEventListener("click", () => {
        updateVisibleItems(); // クリック時に表示されているアイテムを再評価
        currentIndex = visibleGalleryItems.indexOf(item);
        if (currentIndex === -1) {
          return;
        }
        modal.style.display = "flex";
        showImage(currentIndex);
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

    // キャラクター検索機能
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();
      galleryItems.forEach(item => {
        const chars = item.dataset.characters ? item.dataset.characters.toLowerCase() : "";
        if (chars.includes(query)) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
      updateVisibleItems(); // 検索結果が変わったので、表示されているアイテムリストを更新
    });

    // ← → 矢印
    prevArrow.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + visibleGalleryItems.length) % visibleGalleryItems.length;
      showImage(currentIndex);
    });

    nextArrow.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % visibleGalleryItems.length;
      showImage(currentIndex);
    });
  } // if (modal && ...) の閉じ括弧

  // ----------------------------------------------------
  // 日記ページ専用機能
  // ----------------------------------------------------
  const diaryList = document.querySelector(".diary-list");
  if (diaryList) {
    // 要素が存在する場合のみ実行
    const diaries = [{
        // 1つ目の鍵付き日記
        id: "lockedDiary", // IDを付与できるようにする
        className: "diary-card dark",
        href: "#", // クリックでモーダルが出るため、hrefはなし（または#）
        img: "image/diary1.png",
        alt: "ある人物の日記",
        text: "🔒 ある人物の日記", // このtextはalt属性になるので表示はされません
        isLocked: true // ロックされているかどうかのフラグ
      },
      {
        // 2つ目の通常日記
        className: "diary-card light",
        href: "diary_light.html",
        img: "image/diary2.png",
        alt: "ある人物の日記",
        text: "📖 ある人物の日記", // このtextはalt属性になるので表示はされません
        isLocked: false
      },
      // 他の日記もここに追加していく
    ];

    diaries.forEach((diary) => {
      const a = document.createElement("a");
      a.className = diary.className;
      if (diary.href) {
        a.href = diary.href;
      }
      if (diary.id) {
        a.id = diary.id;
      }

      const img = document.createElement("img");
      img.src = diary.img;
      img.alt = diary.alt; // alt属性にテキストを設定します
      img.className = "diary-image";

      a.appendChild(img);
      diaryList.appendChild(a);

      // ロックされている日記カードにイベントリスナーを設定
      if (diary.isLocked) {
        a.addEventListener("click", (e) => {
          e.preventDefault(); // リンクへの遷移を防ぐ
          const passwordOverlay = document.getElementById("passwordOverlay");
          const passwordInput = document.getElementById("passwordInput");
          const errorText = document.getElementById("errorText");

          if (passwordOverlay && passwordInput) {
            passwordOverlay.style.display = "flex";
            passwordInput.value = "";
            if (errorText) errorText.style.display = "none";
            passwordInput.focus();
          }
        });
      }
    });
  } // if (diaryList) の閉じ括弧

  // ----------------------------------------------------
  // nemutaro.html 用の鍵クリックでオーバーレイ表示
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // diary.html 用のパスワードモーダル
  // ----------------------------------------------------
  const passwordOverlay = document.getElementById("passwordOverlay");
  const closePasswordPopup = document.getElementById("closePasswordPopup");
  const checkPassword = document.getElementById("checkPassword");
  const passwordInput = document.getElementById("passwordInput");
  const errorText = document.getElementById("errorText"); // HTMLから取得

  // 要素が存在する場合のみイベントリスナーを設定
  if (passwordOverlay && closePasswordPopup && checkPassword && passwordInput) {

    // クローズボタン
    closePasswordPopup.addEventListener("click", () => {
      passwordOverlay.style.display = "none";
      if (errorText) errorText.style.display = "none";
    });

    // オーバーレイ背景クリック
    passwordOverlay.addEventListener("click", (e) => {
      if (e.target === passwordOverlay) {
        passwordOverlay.style.display = "none";
        if (errorText) errorText.style.display = "none";
      }
    });

    // 送信ボタン
    checkPassword.addEventListener("click", () => {
      if (passwordInput.value === "0606") {
        if (errorText) errorText.style.display = "none";
        document.body.classList.add("fade-out");
        setTimeout(() => {
          window.location.href = "diary_dark.html";
        }, 500);
      } else {
        if (errorText) errorText.style.display = "block"; // エラー表示
      }
    });
  }
  
  // ----------------------------------------------------
  // キャラクター画像切り替え機能 (元々2番目のDOMContentLoaded内にあった機能)
  // ----------------------------------------------------
  const characterImage = document.getElementById('character-image');
  const prevButton = document.getElementById('prev-image');
  const nextButton = document.getElementById('next-image');
  const imagePathsElement = document.getElementById('image-paths');

  if (characterImage && prevButton && nextButton && imagePathsElement) {
      // data-paths属性から画像パスの配列を取得
      let imagePaths;
      try {
          imagePaths = JSON.parse(imagePathsElement.dataset.paths);
      } catch (e) {
          console.error('画像パスのパースに失敗しました:', e);
          imagePaths = [];
      }

      // 画像が1枚以下の場合はボタンを非表示にする
      if (imagePaths.length <= 1) {
          if (prevButton) prevButton.style.display = 'none';
          if (nextButton) nextButton.style.display = 'none';
          return;
      }

      let currentIndex = 0; // 現在表示されている画像のインデックス（0からスタート）

      // 画像を切り替える関数
      function changeImage(newIndex) {
          // インデックスが配列の範囲内に収まるように調整 (ループさせる)
          if (newIndex >= imagePaths.length) {
              newIndex = 0; 
          } else if (newIndex < 0) {
              newIndex = imagePaths.length - 1; 
          }

          currentIndex = newIndex;
          characterImage.src = imagePaths[currentIndex];
      }

      // 「前へ」ボタンのイベントリスナー
      prevButton.addEventListener('click', () => {
          changeImage(currentIndex - 1);
      });

      // 「次へ」ボタンのイベントリスナー
      nextButton.addEventListener('click', () => {
          changeImage(currentIndex + 1);
      });
  }
}); // DOMContentLoaded の閉じ括弧はここが最後
