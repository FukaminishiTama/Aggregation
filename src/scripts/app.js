// ページの HTML がすべて読み込まれた後にJS処理を実行
/* HTMLファイルを開くと、ブラウザの中でそれが「document」として扱われる
addEventListener関数 「この場所で何かが起きたら何をするか」を登録
'DOMContentLoaded' 「HTMLが全部読み込まれたとき」
アロー関数【() => {】「関数の中身」の始まり */ 
document.addEventListener('DOMContentLoaded', () => {
  // ドロップダウン開閉関数(現在のボタンの状態を確認し、ドロップダウンの表示・非表示を切り替える)
  function toggleDropdown(button, target) {
    // trueなら開いている、falseなら閉じている
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    // aria-expandedの切替(trueならfalseにして閉じる)
    button.setAttribute('aria-expanded', String(!isOpen));
    // hiddenに現在の状態を入力(trueならtrueにして非表示)
    target.hidden = isOpen;
    // aria-hiddenに現在の状態を入力(trueならfalseにして読み上げない)
    target.setAttribute('aria-hidden', String(isOpen));
  }

  // data-dropdown-toggle 属性を持つ全てのボタンが対象(イベントリスナーを登録)
  // Nodelist
  const dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');
  console.log(dropdownToggles);
  
  // dropdownTogglesのループ処理
  dropdownToggles.forEach(button => {
    const targetId = button.getAttribute('data-dropdown-toggle');
    console.log(targetId);
    const target = document.getElementById(targetId);
    console.log(target);

    // targetが存在しない場合(none)は処理を終了
    if (!target) return;

    // クリックしたとき
    button.addEventListener('click', (event) => {
      // ドロップダウン開閉関数を実行
      toggleDropdown(button, target);
      // クリックイベントの伝播を止めることで、外部クリック処理と競合しないようにする
      // ボタン内のクリックがさらに上位のイベントリスナーに伝わらなくなる
      event.stopPropagation();
    });
  });

  // 言語選択ドロップダウンの外部クリック
  const languageButton = document.getElementById('language-selector-toggle-desktop');
  console.log(languageButton);
  const languageMenu = document.getElementById('language-selector-desktop');
  console.log(languageMenu);

  // 両方の要素が正しく取得できた場合のみ処理を実行(イベントリスナー登録)
  if (languageButton && languageMenu) {
    // クリックしたとき
    document.addEventListener('click', (event) => {
      if (
        // クリックされた要素が、言語選択ボタン内に含まれていないAND
        !languageButton.contains(event.target) &&
        // クリックされた要素が、言語選択メニュー内に含まれていないAND
        !languageMenu.contains(event.target) &&
        // 現在言語選択ドロップダウンが開いている（aria-expanded が 'true'）
        languageButton.getAttribute('aria-expanded') === 'true'
      ) {
        // ドロップダウン開閉関数を実行
        toggleDropdown(languageButton, languageMenu);
      }
});

    // Escキーによる閉じる処理
    // ドキュメント全体に対してキーダウンイベントリスナーを登録
    document.addEventListener('keydown', (event) => {
      // 押されたキーが「Esc」AND、ドロップダウンが開いている
      if (event.key === 'Escape' && 
        (languageButton.getAttribute('aria-expanded') === 'true')) {
        // ドロップダウン開閉関数を実行
        toggleDropdown(languageButton, languageMenu);
      }
    });


  // 「すべてのメニュー」ドロップダウンの外部クリック
  const OtherMenuButton = document.getElementById('header-dropdown-toggle');
  console.log(OtherMenuButton);
  const OtherMenu = document.getElementById('header-dropdown');
  console.log(OtherMenu);

  if (OtherMenuButton && OtherMenu) {
    // クリックしたとき
    document.addEventListener('click', (event) => {
      if (
        // クリックされた要素が、言語選択ボタン内に含まれていないAND
        !OtherMenuButton.contains(event.target) &&
        // クリックされた要素が、言語選択メニュー内に含まれていないAND
        !OtherMenu.contains(event.target) &&
        // 現在言語選択ドロップダウンが開いている（aria-expanded が 'true'）
        OtherMenuButton.getAttribute('aria-expanded') === 'true'
      ) {
        // ドロップダウン開閉関数を実行
        toggleDropdown(OtherMenuButton, OtherMenu);
      }
    });
  }

    // Escキーによる閉じる処理
    // ドキュメント全体に対してキーダウンイベントリスナーを登録
    document.addEventListener('keydown', (event) => {
      // 押されたキーが「Esc」AND、ドロップダウンが開いている
      if (event.key === 'Escape' && 
        (OtherMenuButton.getAttribute('aria-expanded') === 'true')) {
        // ドロップダウン開閉関数を実行
        toggleDropdown(OtherMenuButton, OtherMenu);
      }
    });
  }
});




