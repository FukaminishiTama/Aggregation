// Expressフレームワーク（Node.jsでWebサーバーを簡単に構築できるフレームワーク）
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 今のファイルのURL（例: file:///Users/user/server.js）を通常のファイルパスに変換（例: /Users/user/server.js）
const __filename = fileURLToPath(import.meta.url);
// ディレクトリ部分だけを取り出す（例: /Users/user）
const __dirname = path.dirname(__filename);
// Webサーバーアプリを作成
const app = express();  
// 同じ階層の data フォルダ内にある votes.json(投票データ)を保存・取得するファイルの場所を設定
const DATA_PATH = path.join(__dirname, 'data', 'votes.json');


// srcフォルダ内のHTML・CSS・JSファイルを公開
app.use(express.static('src'));
// POSTリクエスト時にJSON形式を自動的に読み取れるようにする
app.use(express.json());

// フロントエンドから送られた投票データを JSON ファイルに保存（POST）
app.post('/api/vote', (req, res) => {
  // フロントから送られてきた {pointValues,nickname, selections}を受け取る
  const vote = req.body;

  // 受け取ったデータを votes.json に保存するための準備
  let votes = {};
  if (fs.existsSync(DATA_PATH)) {
    // エンコーディングと空白除去
    const content = fs.readFileSync(DATA_PATH, 'utf8').trim();
    // if文(条件 ? 真のときの値 : 偽のときの値)
    // content があれば JSON.parse(content) をして votes に代入。なければ {} を代入する。
    votes = content ? JSON.parse(content) : {};
  }  

  // まず pointValues を保存
  if (vote.pointValues) {
    votes.pointValues = vote.pointValues;
  }
  // その後、nickname と selections を保存
  if (vote.nickname) {
    votes[vote.nickname] = {
      selections: vote.selections || []
    };
  }

  // 書き込むときの文字コード
  const jsonString = JSON.stringify(votes, null, 2);
  fs.writeFileSync(DATA_PATH, jsonString, 'utf-8');

  // 書き込み完了後、フロントエンドに成功レスポンスを返す
  res.status(200).send({ success: true });
});

// 投票データ全体を取得（GET）
app.get('/api/results', (req, res) => {
  const data = fs.existsSync(DATA_PATH)
    ? JSON.parse(fs.readFileSync(DATA_PATH))
    : {};
  res.json(data);
});

// ポート3000でサーバー起動。ログ表示でURL確認
const PORT = 3000;
app.listen(PORT, () => console.log(`🌐 Server running: http://localhost:${PORT}`));
