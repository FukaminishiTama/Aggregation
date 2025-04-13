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


// publicフォルダ内のHTML・CSS・JSファイルを公開
app.use(express.static('public'));
// JSON形式のリクエスト（POST時）を自動的に読み取れるようにする
app.use(express.json());

// フロントエンドから送られた投票データを JSON ファイルに保存（POST）
app.post('/api/vote', (req, res) => {
  // フロントから送られてきた {nickname, selections}を受け取る
  const vote = req.body;

  //   
  let votes = {};
  if (fs.existsSync(DATA_PATH)) {
    votes = JSON.parse(fs.readFileSync(DATA_PATH));
  }

  // 同じニックネームがある場合は上書き
  votes[vote.nickname] = vote.selections;

  fs.writeFileSync(DATA_PATH, JSON.stringify(votes, null, 2));
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
