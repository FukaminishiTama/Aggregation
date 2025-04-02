// JavaScriptがHTMLより先に動かないように「ページの内容が全部準備できたら、この中のコードを動かす」
/* HTMLファイルを開くと、ブラウザの中でそれが「document」として扱われる
addEventListener関数 「この場所で何かが起きたら何をするか」を登録
'DOMContentLoaded' 「HTMLが全部読み込まれたとき」
() => {（アロー関数）「関数の中身」の始まり */ 
document.addEventListener('DOMContentLoaded', () => {
    /* HTMLの中から、
    data-dropdown-toggleという名前のボタンを
    querySelectorAll関数で、全部見つけて、タグも、名前も、文字もすべて
    NodeListという「集まり」を返り値として出し、
    変数dropdownToggles で使えるようにする */
    const dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');
    console.log(dropdownToggles);
    
    /* 変数dropdownTogglesのボタンのリストを
    forEach関数で1つずつ取り出す
    変数button で使えるようにする */
    dropdownToggles.forEach(button => {
        /* 変数buttonから取り出した1つを
        getAttribute関数で
        data-dropdown-toggleという名前の属性の値を取り出し
        変数targetIdで使えるようにする */
        const targetId = button.getAttribute('data-dropdown-toggle');
        /* idがtargetIdである要素を
        getElementById関数で１つだけ、タグも、名前も、文字もすべて
        変数targetで使えるようにする */
        const target = document.getElementById(targetId);
        /* target がければ処理を終了して、次のtarget */
        if (!target) return;
          /* buttonがクリックされたらという条件 */
          button.addEventListener('click', () => {
          /* trueならtrue、falseならfalseを
          isOpenに代入 */
          const isOpen = button.getAttribute('aria-expanded') === 'true';
          /* isOpenはtrueだったのが、
          以下の「!」によって逆のfalseになる
          さらにStringで文字列のfalseにして、
          buttonのaria-expanded属性をfalseに更新
          開くか、閉じるか */
          button.setAttribute('aria-expanded', String(!isOpen));
          /* targetのhidden属性に格納して更新
          hidden = true → 隠れる（非表示）
          hidden = false → 表示される
          hiddenはプロパティとして扱い、
          JSが動いている間に使える情報のため以下の書き方 */
          target.hidden = isOpen;
          /* isOpenはfalseだったのが、
          以下の「!」によって逆のtrueになる
          さらにStringで文字列のtrueにして、
          targetのaria-hidden属性をtrueに更新
          スクリーンリーダになるか、ならないか */
          target.setAttribute('aria-hidden', String(isOpen));
          });
    });

    /* 言語選択(Launguage)のドロップダウンメニュー */
    // ドロップダウンを開くためのボタン
    const language_button = document.getElementById('language-selector-toggle-desktop');
    // 実際に開いたり閉じたりするメニュー（<ul id="language-selector-desktop"）を取得
    const language_menu = document.getElementById('language-selector-desktop');
    //  ボタンorメニューがnull値以外を取得できなかったら、終了(null値チェック)
    if (!language_button || !language_menu) return;

    console.log(language_button);
    console.log(language_menu);

    // ドロップダウンを開いたり閉じたりするための関数
    // 表示・非表示や `aria-属性` の切り替え
    function toggleDropdown() {
      // 今ドロップダウンが開いているかどうか("true" なら開いてる)
      const isOpen = language_button.getAttribute('aria-expanded') === 'true';
      language_button.setAttribute('aria-expanded', String(!isOpen));
      language_menu.hidden = isOpen;
      language_menu.setAttribute('aria-hidden', String(isOpen));
    }

    language_button.addEventListener('click', toggleDropdown);

    document.addEventListener('click', (event) => {
      if (
        !language_button.contains(event.target) &&
        !language_menu.contains(event.target) &&
        language_button.getAttribute('aria-expanded') === 'true'
      ) {
        toggleDropdown();
      }
    });
  
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && language_button.getAttribute('aria-expanded') === 'true') {
        toggleDropdown();
      }
    });

  });
  