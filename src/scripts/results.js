fetch('/api/results')
  .then(res => res.json())
  // (data => {"pointValues":[pt,pt,pt,pt],ニックネーム:[n回目:[順番,番号]]})
  .then(data => {

    // ----- 投票結果エリア -----
    const voteResults = document.getElementById('vote__results');
    voteResults.innerHTML = ''; // 初期化

      // "pointValues"以外のキーだけ抽出（ニックネーム一覧）
      const userKeys = Object.keys(data).filter(key => key !== 'pointValues');
      // 最新（最後）のニックネームを取得（例："あぼかど"）
      const latestUser = userKeys.at(-1);  // または userKeys[userKeys.length - 1]

      // そのユーザーの選択データを取得
      const allRounds = data[latestUser].selections;
      // <h2>を作成
      const userHeading = document.createElement('h2');
      // ニックネームの文字列取得
      userHeading.textContent = `${latestUser}さん`;
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
    //ポイントの入力値を取得、pointValuesリストで保持（例:[3,2,1.5,1]）
    const pointValues =  data.pointValues || [];
    
    // 表示用の文字列を作成
    const pointText = pointValues.map((pt, index) => `${index + 1}位:${pt}pt`).join('   ');
    // 表示エリアを取得
    const aggregateResultsSection = document.getElementById('aggregate__results-text');
    // 表示用の要素を作成
    const pointDisplay = document.createElement('div');
    // class='point-table'を指定
    pointDisplay.className = 'points-table';
    pointDisplay.textContent = pointText;
    // 表示エリアに追加
    aggregateResultsSection.appendChild(pointDisplay);


    // 集計結果エリアの初期化
    const aggregateResults = document.getElementById('aggregate__results');
    aggregateResults.innerHTML = ''; // 初期化
    const totalRoundPoints = {}; // 各ラウンドの合計ポイントを保持

      // "pointValues"以外のキー（ユーザー名）だけを抽出
      const pointUserKeys = Object.keys(data).filter(key => key !== 'pointValues');

      // 全ユーザーが対象
      pointUserKeys.forEach(user => {
      // 各ユーザーの選択データ（例:["1回目", [ [1, 3], [2, 7] ]],）を取得
        const selections = data[user].selections;
      
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
              const points = pointValues[rank - 1] || 0;
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

      console.log(Object(roundPointMap));

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
        const resultsText = document.getElementById('aggregate__results').innerText;
        const encodedText = encodeURIComponent(resultsText);
        const lineUrl = `https://social-plugins.line.me/lineit/share?text=${encodedText}`;
        window.open(lineUrl, '_blank');
      });

});