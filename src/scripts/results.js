document.addEventListener('DOMContentLoaded', async() => {
  const urlParams = new URLSearchParams(window.location.search);  
  // projectIdとtoken を URL から取得
  const projectId = urlParams.get('project');
  const token = urlParams.get('token');
  // /api/results?projectId=${projectId}&token=${token} へリクエスト
  const res = await fetch(`/api/results?projectId=${projectId}&token=${token}`);
  const data = await res.json();
  
  // 投票画面タイトル
  const title = document.getElementById('section__results-title');
  if (title) {
    title.innerHTML = `${projectId}<h3 class="section__results-text">結果</h3>`;
  }

  // ----- 投票結果エリア -----
  const voteResults = document.getElementById('vote__results');
  voteResults.innerHTML = ''; // 初期化

  if (!res.ok) {
    const voteResults = document.getElementById('vote__results');
    voteResults.innerHTML = '<p>該当するプロジェクトが存在しません。削除された可能性があります。</p>';
    return;
  }

  // 最新の nickname を抽出
  const nicknameList = Object.keys(data);
  const userHeading = document.createElement('h2');
  if (nicknameList.length === 0 || !data) {
    userHeading.textContent = '投票ユーザーなし';
    voteResults.appendChild(userHeading);
    return;
  }
  
  const latestNickname = nicknameList[nicknameList.length - 1];
  const selections = data[latestNickname];
  // ユーザ表示
  userHeading.textContent = `${latestNickname}さん`;
  voteResults.appendChild(userHeading);

  selections.forEach(([roundTitle, rankings]) => {
    // <div>
    const roundTitleDiv = document.createElement('div');
    // class='round'を指定
    roundTitleDiv.className = 'round';
    // n回目 
    roundTitleDiv.textContent = roundTitle;
    // <div class="round">n回目</div>をvoteResultsに追加
    voteResults.appendChild(roundTitleDiv);

    const voteBlock = document.createElement('div');
    voteBlock.className = 'round__rankings';
    const voteText = document.createElement('p');

    // rankingsがnullなら投票なし
    if (rankings[0][0] === null) {
      voteText.textContent = '投票なし';
    } else {
    // 存在すれば、例:1位【9】
      voteText.textContent = rankings.map(([rank, number]) =>
        `${rank}位【${number}】`
      ).join('-  ');
    }

    // <p>順位【番号】- 順位【番号】</p>をvoteBlockに追加
    voteBlock.appendChild(voteText);
    // 上記に更に<div class="round__rankings">をvoteBlockに追加
    voteResults.appendChild(voteBlock);

  });

  // ----- 集計結果エリア -----  
  const pointConfirmButton = document.getElementById('point-confirm-button');
  const pointInputs = document.querySelectorAll('.card__sub input[type="number"]');
  pointConfirmButton.addEventListener('click', async () => {
    // 順位によるポイントの入力値を取得、pointValuesリストで保持（例:[3,2,1.5,1]）
    const inputPointValues = Array.from(pointInputs).map(input => parseFloat(input.value) || 0);

    // 配列が空かどうかをチェック
    if (inputPointValues.length === 0) {
      alert('ポイントの入力値がありません');
      return; // ここで処理を終了（関数内ならreturn、または処理を打ち切る）
  }
    // 表示エリアを取得
    const pointTextDisplay = document.getElementById('point-text');
    // 表示用の文字列を作成
    const pointText = inputPointValues.map((pt, index) => `${index + 1}位:${pt}pt`).join('   ');
    // 結果を更新
    pointTextDisplay.textContent = pointText;
    
    // 表示、非表示切り替え
    const aggregateContainer = document.getElementById('aggregate-results__container');
    // hidden属性をfalseにして「LINE共有を表示」
    aggregateContainer.hidden = false;
    // pt結果表示
    aggregateContainer.setAttribute('aria-expanded', String('true'));

    
    // 集計結果エリアの初期化
    const aggregateResults = document.getElementById('aggregate__results');
    aggregateResults.innerHTML = ''; // 初期化
    const totalRoundPoints = {}; // 各ラウンドの合計ポイントを保持

      // 全ユーザーが対象
      Object.values(data).forEach(selections => {
      // 各ユーザーの選択データ（例:["1回目", [ [1, 3], [2, 7] ]],）を取得
        // 1回目から順番に処理
        selections.forEach(([roundTitle, rankings]) => {
          // 各回用の{}を作成
          if (!totalRoundPoints[roundTitle]) {
            totalRoundPoints[roundTitle] = {};
          }

          // [順番,番号]が0でなければ
          if (rankings[0][0] !== null) {
            // 各順位のポイントを計算して合算
            rankings.forEach(([rank, number]) => {
              // 順位に応じてポイントリストから取得
              const points = inputPointValues[rank - 1] || 0;
              // 番号と準じたポイント（例:"1回目": {"3": 1.5,"7": 2}）
              totalRoundPoints[roundTitle][number] =
                (totalRoundPoints[roundTitle][number] || 0) + points;
            });
          }
        });
    });

    /*
    ポイントのを表示するための辞書型(Object)の処理（計算や、ソートなど）
    totalRoundPoints = {
      "1回目": { 7: 3, 2: 2, ... },
      "2回目": { 6: 3, 12: 2, ... },
    */
    Object.entries(totalRoundPoints).forEach(([roundTitle, roundPointMap]) => {
      // ラウンドタイトルを表示
      const pointsTitleDiv = document.createElement('div');
      pointsTitleDiv.className = 'points';
      pointsTitleDiv.textContent = roundTitle;
      aggregateResults.appendChild(pointsTitleDiv);

      const pointBlock = document.createElement('div');
      pointBlock.className = 'points__rankings';
      const pointText = document.createElement('p');

        // roundPointMapが{}なら投票なし
        if (Object.keys(roundPointMap).length === 0) {
        pointText.textContent = '投票なし';
        // ここでappend
        pointBlock.appendChild(pointText);
        aggregateResults.appendChild(pointBlock);
        } else {
        // 例:[[番号,pt],[番号,pt]]の配列を作成
        const sortedPoints = Object.entries(roundPointMap)
        // [,pt]を抜き出し、高pt→低ptで降順ソート
          .sort(([, a], [, b]) => b - a);

      // 1. 同じptごとにグループ化する
      const groups = [];  // 各グループは { pt: 数値, entries: [ [番号, pt], ... ] } の形式

      sortedPoints.forEach(([num, pt]) => {
        // すでに同じptのグループが存在するかをチェック
        const group = groups.find(g => g.pt === pt);
        if (group) {
          group.entries.push([num, pt]);
        } else {
          groups.push({ pt: pt, entries: [[num, pt]] });
        }
      });

      // ソート済みであれば、グループ順も自動的にポイントの高い順になるはず
      groups.sort((a, b) => b.pt - a.pt);

      // 2. 各グループに対して、グループ順に着色する
      const colorMapping = ['highlight-yellow', 'highlight-blue', 'highlight-brown'];

      // 結果を表示するエリア（pointTextなど）に対する処理例
      // （ここではpointTextは既に作成された<p>要素とする）
      groups.forEach((group, groupIndex) => {
        // グループに対応する色（もし3組以上になった場合は、必要に応じて追加の色を指定する）
        const groupColor = colorMapping[groupIndex] || '';
        
        // 各グループのエントリを走査して、span要素を作成
        group.entries.forEach((entry, entryIndex) => {
          const [num, pt] = entry;
          const span = document.createElement('span');
          span.innerHTML = `【${num}】${pt}pt`;
          // グループごとに同じクラスを設定
          span.className = groupColor;
          pointText.appendChild(span);
          
          // 同一グループ内の間は区切り文字を入れる（最後の要素でなければ）
          if (entryIndex < group.entries.length - 1) {
            pointText.appendChild(document.createTextNode('  -'));
          }
        });
        
        // グループ間で、次のグループがあるなら改行を入れる
        if (groupIndex < groups.length - 1) {
          pointText.appendChild(document.createElement('br'));
        }
      });

        pointBlock.appendChild(pointText);
        aggregateResults.appendChild(pointBlock);
        }
      });

      // LINE共有ボタンの処理
      document.getElementById('shareToLineBtn').addEventListener('click', () => {
        const resultsTextElement = document.getElementById('aggregate__results');
        const text = resultsTextElement.innerText || '';
      
        // 空白行の除去（空行は削除、改行はスペースに変換）
        const cleanText = text
        .split('\n') // 改行を分割して配列にする
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('\n'); // 改行を戻す
      
        // 先頭に projectId を追加
        const projectId = new URLSearchParams(window.location.search).get('project') || '集計結果';
        const finalText = `${projectId}： ${cleanText}`;
      
        const encodedText = encodeURIComponent(finalText);
        const lineUrl = `https://social-plugins.line.me/lineit/share?text=${encodedText}`;
        window.open(lineUrl, '_blank');
      });
    });
  });