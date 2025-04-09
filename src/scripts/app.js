// ページの HTML がすべて読み込まれた後にJS処理を実行
/* HTMLファイルを開くと、ブラウザの中でそれが「document」として扱われる
addEventListener関数:「この場所で何かが起きたら何をするか」を登録
'DOMContentLoaded':「HTMLが全部読み込まれたとき」*/ 
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
  console.log(dropdownToggles);
  
  // 各ドロップダウンボタンに対して順番に処理
  dropdownToggles.forEach(button => {
    // ボタンに書かれているdata-dropdown-toggle属性から「このボタンがどの要素を開閉対象にしているか」のIDを取得
    // getAttributeメソッド：「data-dropdown-toggle="xxxxx"」のxxxxx部分を取得
    const targetId = button.getAttribute('data-dropdown-toggle');
    console.log(targetId);
    // 上記で取得したIDに該当する要素（例えば<ul>以下全部）をdocument.getElementById()で取得
    const target = document.getElementById(targetId);
    console.log(target);
    console.log(button);

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
  }

  // ニックネーム未入力アラート
    const form = document.getElementById('form');
    const nicknameInput = document.getElementById('form__input');
  
    // form配下のsubmit（投票）がクリックされたらアラートを表示
    form.addEventListener('submit', (event) => {
      if (!nicknameInput.value.trim()) {
        alert('ニックネームを入力してください');
        // サーバーに送信しないようにストップ（フォームのデフォルトの送信動作を止める）
        event.preventDefault();
      }
    });

// 4つまでの数字ボタン選択と表示、リセットボタンの表示
  // 各セクションのリセットボタンと選択結果表示エリアを取得
  const sections = document.querySelectorAll('.number-buttons');
  
  sections.forEach(section => {
    const display = section.querySelector('.selected-ranking');
    const resetBtn = section.querySelector('.reset-button');
    // 全ての数字ボタン
    const numberButtons = section.querySelectorAll('.number-button');
    // 選択は4つまで
    const maxSelections = 4;
    let selectedNumbers = [];
    
    // リストに順位と選んだ数字を格納
    const renderSelections = () => {
      display.innerHTML = selectedNumbers.map((num, i) => 
        // 右にマージンをつけて、「1位：数字」形式を空白で繋げて文字列表示
        `<span style="margin-right: 1rem;">${i + 1}位：${num}</span>`).join(' ');
    };
  
    // どれか数字をクリックしたときの処理
    numberButtons.forEach(button => {
      button.addEventListener('click', () => {
        // ボタンのテキスト（数字）を取得（文字列の前後の空白（スペース・改行）を削除）
        const value = button.textContent.trim();
        // すでに選択済み、もしくは最大選択数（4）に達していたら無視して終了
        if (selectedNumbers.includes(value) || selectedNumbers.length >= maxSelections) return;
  
        // 配列に追加
        selectedNumbers.push(value);
        // 選ばれたボタンにclass付与（CSS装飾）
        button.classList.add('selected');
        // リセットボタン表示
        resetBtn.setAttribute('aria-expanded', String('true'));
        // 選択結果を更新
        renderSelections();
      });
    });
  
    // リセットボタンを押したら、ボタンを非表示にして、リストを空にする
    resetBtn.addEventListener('click', () => {
      // 選択リストをリセット
      selectedNumbers = [];
      numberButtons.forEach(btn => btn.classList.remove('selected'));
      // リセットボタンを非表示 
      resetBtn.setAttribute('aria-expanded', String('false'));
      // 選択結果をクリア
      renderSelections();
    });
  });
});




