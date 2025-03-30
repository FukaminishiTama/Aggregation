// JavaScriptがHTMLより先に動かないように「ページの内容が全部準備できたら、この中のコードを動かす」
/* HTMLファイルを開くと、ブラウザの中でそれが「document」として扱われる
addEventListener関数 「この場所で何かが起きたら何をするか」を登録
'DOMContentLoaded' 「HTMLが全部読み込まれたとき」
() => {（アロー関数）「関数の中身」の始まり */ 
document.addEventListener('DOMContentLoaded', () => {
    /* HTMLの中から、
    data-dropdown-toggleという名前のボタンを
    querySelectorAll関数で全部見つけて、
    変数dropdownToggles で使えるようにする */
    const dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');
    
    /* 変数dropdownTogglesのボタンのリストを
    forEach関数で1つずつ取り出す
    変数button で使えるようにする */
    dropdownToggles.forEach(button => {
        /* 変数buttonから取り出した1つを
        getAttribute関数で
        data-dropdown-toggleという名前の属性の値を取り出し
        変数targetIdで使えるようにする */
        const targetId = button.getAttribute('data-dropdown-toggle');
        /*  idがtargetIdのタグまるごとを
        変数targetで使えるようにする */
        const target = document.getElementById(targetId);
        /*   */
        if (!target) return;
        /*   */
        button.addEventListener('click', () => {
        /*   */
        const isOpen = button.getAttribute('aria-expanded') === 'true';
        /*   */
        button.setAttribute('aria-expanded', String(!isOpen));
        /*   */
        target.hidden = isOpen;
        /*   */
        target.setAttribute('aria-hidden', String(isOpen));
      });
    });
  });
  