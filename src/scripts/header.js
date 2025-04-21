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
  
    // HTML内のすべてのdata-dropdown-toggle属性を持つ要素（通常ボタン）を選択して、dropdownTogglesにNodeListとして格納
    const dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');
    
    // 各ドロップダウンボタンに対して順番に処理
    dropdownToggles.forEach(button => {
      // ボタンに書かれているdata-dropdown-toggle属性から「このボタンがどの要素を開閉対象にしているか」のIDを取得
      // getAttributeメソッド：「data-dropdown-toggle="xxxxx"」のxxxxx部分を取得
      const targetId = button.getAttribute('data-dropdown-toggle');
      // 上記で取得したIDに該当する要素（例えば<ul>以下全部）をdocument.getElementById()で取得
      const target = document.getElementById(targetId);
  
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
    const languageMenu = document.getElementById('language-selector-desktop');
  
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
    }
});