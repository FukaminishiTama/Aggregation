document.addEventListener('DOMContentLoaded', () => {
    // URLからprojectIdとtokenを取得
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    const token = urlParams.get('token');
  
    // 投票画面タイトル
    const title = document.getElementById('section__main-title');
    if (title) {
      title.innerHTML = `${projectId}<h3 class="section__main-text">投票</h3>`;
    }

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
        // 繋げた文字列を表示する要素を追加
        `<span class="selected-ranking__text" rank=${i + 1} number=${num}>${i + 1}位：${num}</span>`).join('');
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
        // 選ばれたボタンにCSS装飾（class="number-button selected"に変更）
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

// Enter や Space キーを押す、またはマウスでクリックした場合、ページの先頭へスムーズにスクロール
// a.u-visually-hidden にフォーカスを移す（スクリーンリーダー用リンク）
// <main class="template_main template-default_main" id="mainContainer">に移動
  const focusNavigationLink = () => {
      document.querySelector("a.u-visually-hidden").focus();
  };
  const pagetopElement = document.querySelector(".pagetop");
  // 特定のキーが押されたときの処理
  pagetopElement.addEventListener("keydown", (event) => {
      // Enterキーが押されたら
      if (event.key === "Enter")
          // mainに移動
          focusNavigationLink();
      // Spaceキーが押されたら
      if (event.code === "Space") {
          // スペースキーを押すと、ページがスクロールしてしまうので、それを止める
          event.preventDefault();
          // ページを一番上までスクロール
          window.scrollTo({
              // 一番上にスクロール
              top: 0,
              // アニメーション付きでなめらかにスクロール
              behavior: "smooth"
          });
          // mainに移動
          focusNavigationLink();
      }
  });
  // クリックしたら
  pagetopElement.addEventListener("click", () => {
      //mainに移動 
      focusNavigationLink();
  });

// asyncを用いた処理を関数化
async function fetchUserList() {
  // ユーザー一覧表示
  const res = await fetch(`/api/results?projectId=${projectId}&token=${token}`);
  const data = await res.json();
  // ユーザデータ
  const nicknames = Object.keys(data);

  const userList = document.getElementById('userList');
  userList.innerHTML = '';

  // 投票ユーザ一覧表示
  if (nicknames){
    nicknames.forEach(nickname => {
    // ラッパーdivを用意
    const wrapper = document.createElement('div');
    wrapper.className = 'user-row';

    const span = document.createElement('span');
    span.textContent = nickname;
    span.className = 'container__reset-nickname';

    // spanとbuttonを同じdivにまとめて横並びに
    wrapper.appendChild(span);
    userList.appendChild(wrapper);
  });
}
// ユーザがいない場合 
if (nicknames.length === 0 || !data) {
  const div = document.createElement('div');
  div.textContent = '投票ユーザーなし';
  userList.appendChild(div);
  }
}

fetchUserList(); // 上記関数呼び出し

// 投票説明情報表示
async function loadVoteInfo() {
    const res = await fetch(`/api/vote-info?projectId=${projectId}&token=${token}`);
    const infoMap = await res.json();
    Object.entries(infoMap).forEach(([number, textArray]) => {
      const el = document.getElementById(`number-info-${number}`);
      if (!el) return;
    el.textContent = String(textArray);
    });
}

loadVoteInfo(); // 上記関数呼び出し

// nicknameの入力可否と保存
document.querySelector('.vote-button__action').addEventListener('click', async (event) => {
  // フォーム送信を防ぐ
  event.preventDefault();
  // 入力欄 #form__input から名前を取得（空白は除去）
  const nickname = document.getElementById('form__input').value.trim();
  // 返り値が空（null）なら、アラートを表示して終了
  if (!nickname) {
    alert('ニックネームを入力してください');
    return; // 処理を終了
  }

  // 各ラウンドのデータ[n回目,[順位,番号]]を収集
  const selections = [];
  // 各ラウンドを表す要素（.number-buttons）をすべて取得
  document.querySelectorAll('.number-buttons').forEach(section => {
    
    // タイトル部分の取得
    const titleElement = section.querySelector('.section__number-title span');
    let roundTitle = titleElement ? titleElement.textContent.trim() : '';
    // "選択 : " などの不要な部分を取り除いて、"1 回目" のような文字列を得る
    roundTitle = roundTitle.replace(/^選択\s*:\s*/, '');
    
    // ランキング情報の取得
    const selectedSpans = section.querySelectorAll('.selected-ranking__text');
    const rankings = [];
    
    if(selectedSpans.length > 0) {
      // 各選択要素について、rankとnumber属性の値を取り出す
      selectedSpans.forEach(span => {
        const rank = span.getAttribute('rank');    // 例： "1"
        const number = span.getAttribute('number');  // 例： "7"
        // 数値として扱いたい場合は Number() で変換（ここでは数値に変換しています）
        rankings.push([Number(rank), Number(number)]);
      });
    } else {
      // もし選択されている要素がなければ、ランキング情報がないことを示すために [null] とする例
      rankings.push([null]);
    }
    
    // ラウンドタイトルとランキング情報の配列を selections に追加する
    selections.push([roundTitle, rankings]);
  });    

  const payload = { projectId, token, nickname, selections };

  // Web API など外部のサービスと非同期通信する（await:非同期の順番を待つ）
  // fetch 関数が返す Promise が解決されるまで処理が一時停止（POST リクエストが完了し、サーバーからレスポンスを受け取るまで次のコードに進まないようにする）
  // HTTP リクエストを発行する関数(/api/vote というエンドポイントに POST リクエストを送信)
  await fetch('/api/vote', {
    // メソッドとしてPOST（サーバーにデータを送信）を指定
    method: 'POST',
    // リクエストのデータ形式などの追加情報をサーバーに伝える（ここではJSON形式）
    headers: { 'Content-Type': 'application/json' },
    // サーバーに送信するデータ本体（payload を JSON 形式の文字列に変換）
    body: JSON.stringify(payload)
  });

  // 遷移先の URL に projectId を付けて渡す
  const baseUrl = window.location.origin;
  window.location.href = `${baseUrl}/results.html?project=${encodeURIComponent(projectId)}&token=${encodeURIComponent(token)}`;
});

});