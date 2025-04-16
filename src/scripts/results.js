document.addEventListener('DOMContentLoaded', () => {
 
fetch('/api/results')
  .then(res => res.json())
  .then(data => {

    // ----- 投票結果エリア -----
    const voteResults = document.getElementById('vote__results');
    voteResults.innerHTML = ''; // 初期化

    // 最新のニックネームを取得(data => {ニックネーム:[n回目:[順番,番号]]})
    const latestNickname = Object.keys(data).pop(); // 最後のキーを取得
    const allRounds = data[latestNickname];
      const userHeading = document.createElement('h2');
      // ニックネームの文字列取得
      userHeading.textContent = `${latestNickname}さん`;
      // <h2>ニックネーム</h2>をvoteResultsに追加
      voteResults.appendChild(userHeading);

      allRounds.forEach(([roundTitle, rankings]) => {
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

        // rankingsが0なら投票なし
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
  //ポイントの入力値を取得、pointValuesリストで保持（例:[3,2,1.5,1]）
  const updatePointValues = () => {
    const inputs = document.querySelectorAll('.card__sub input[type="number"]');
    console.log('Inputs:', inputs); // デバッグ用
    const newPointValues = Array.from(inputs).map(input => parseFloat(input.value) || 0);
    console.log('Point Values:', newPointValues); // デバッグ用
    return newPointValues;
  };
  
  // 投票ボタンが押されたタイミングでポイントを更新
  document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault(); // フォームのデフォルト動作を防止
    const pointValues = updatePointValues();

    // 集計結果エリアの初期化
    const aggregateResults = document.getElementById('aggregate__results');
    aggregateResults.innerHTML = ''; // 初期化
    const totalRoundPoints = {}; // 各ラウンドの合計ポイントを保持

    // 全てのニックネームの番号データを取得(data => {ニックネーム:[n回目:[順番,番号]]})
    for (const allRounds of Object.values(data)) {
      // [n回目:[順番,番号]]の配列を取得
      allRounds.forEach(([roundTitle, rankings]) => {
        // そのラウンドタイトル（例: "1回目"）がまだ初期化されていなければ
        if (!totalRoundPoints[roundTitle]) {
          // ラウンドごとのポイントを初期化（「この回」の集計用オブジェクトを作る）
          totalRoundPoints[roundTitle] = {};
        }

        // [順番,番号]が0でなければ
        if (rankings[0][0] !== null) {
          // 各順位のポイントを計算して合算
          rankings.forEach(([rank, number]) => {
            const points = pointValues[rank - 1] || 0;
            totalRoundPoints[roundTitle][number] =
              (totalRoundPoints[roundTitle][number] || 0) + points;
          });
        }
      });
    }

    /*
    合算したラウンドごとのポイントを表示するための処理
    totalRoundPoints = {
      "1回目": { 7: 3, 2: 2, ... },
      "2回目": { 6: 3, 12: 2, ... },
      ...
    }
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

      if (Object.keys(roundPointMap).length === 0) {
        // 投票がない場合
        pointText.textContent = '投票なし';
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
    });
      // LINE共有ボタンの処理
      document.getElementById('shareToLineBtn').addEventListener('click', () => {
        const resultsText = document.getElementById('aggregate__results').innerText;
        const encodedText = encodeURIComponent(resultsText);
        const lineUrl = `https://social-plugins.line.me/lineit/share?text=${encodedText}`;
        window.open(lineUrl, '_blank');
      });
});

});