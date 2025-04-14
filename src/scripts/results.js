// 各ユーザーの投票内容を表示し、投票された番号に対してポイントを加算・集計して表示
// fetchで'/api/results'にアクセスしレスポンスをブラウザに要求
fetch('/api/results')
  // Response オブジェクト（JSON形式）が返ってくるので、投票データのJSONに変換
  .then(res => res.json())
  // 取得した投票データの処理
  .then(data => {
    // 投票表示エリア
    const voteResults = document.getElementById('vote__results');
    // ポイント集計エリア
    const aggregateResults = document.getElementById('aggregate__results');

    const pointValues = [3, 2, 1.5, 1]; // ポイント変換

    // HTML構築用（投票結果）「+=」で追記更新していく
    let voteHtml = '';
    // HTML構築用（集計結果）「+=」で追記更新していく
    let aggregateHtml = '';

    for (const [nickname, allRounds] of Object.entries(data)) {
      voteHtml += `<h2>${nickname}さん</h2>`;

      // 例 : round = ["1回目", [ [1, 6], [2, 2] ]]
      allRounds.forEach((round) => {
        // 例 : roundTitle = "1回目", rankings = [[1, 6], [2, 2]]
        const [roundTitle, rankings] = round;

        // 投票結果
        // 例：「1回目」
        voteHtml += `<div class="round">${roundTitle}</div>`;
        // 例：「1,6」なら「1位：6」などを追加、[0,0]なら「投票なし」と表示
        if (rankings[0][0] === null) {
          voteHtml += `<div class="round__rankings"><p>投票なし</p></div>`;
        // 投票がある場合、順位（rank）と番号（number）を1つずつ取り出して整形
        } else {
          voteHtml += `<div class="round__rankings"><p>`;
          voteHtml += rankings.map(([rank, number]) => 
            // 例 : 「1位：6」
            `${rank}位：${number}`).join(', ');
          voteHtml += `</p></div>`;
        }

        // 現時点のポイント
        aggregateHtml += `<div class="points">${roundTitle}</div>`;
        // ポイント集計用
        const roundPointMap = {};
        // 例：「1,6」なら「1位：6」などを追加、[0,0]なら「投票なし」と表示
        if (rankings[0][0] === null) {
          aggregateHtml += `<div class="points__rankings"><p>投票なし</p></div>`;
        // 投票がある場合、順位（rank）と番号（number）を1つずつ取り出して整形
        } else {
          rankings.forEach(([rank, number]) => {
            const points = pointValues[rank - 1] || 0;
            roundPointMap[number] = (roundPointMap[number] || 0) + points;
          });
          
          // ポイントを降順でソート
          const sortedPoints = Object.entries(roundPointMap)
            .sort(([, pointsA], [, pointsB]) => pointsB - pointsA);
          
          // トップ3に色を付けてフォーマット
          const formattedPoints = sortedPoints.map(([num, pt], index) => {
            let colorClass = '';
            if (index === 0) colorClass = 'highlight-yellow'; // 1位: 黄色
            else if (index === 1) colorClass = 'highlight-blue'; // 2位: 青色
            else if (index === 2) colorClass = 'highlight-brown'; // 3位: 茶色
          
            return `<span class="${colorClass}">${num} : ${pt}pt</span>`;
          }).join(', ');
          
          aggregateHtml += `<div class="points__rankings"><p>${formattedPoints}</p></div>`;
        }
      });
    }

    // 「+=」で構築してきたHTML文字列をHTMLに反映
    voteResults.innerHTML = voteHtml;
    aggregateResults.innerHTML = aggregateHtml;
  });