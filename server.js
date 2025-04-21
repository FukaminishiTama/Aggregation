import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';

import Project from './models/Project.js';

// .env ファイルを読み込んで、そこに書かれた変数を process.env に登録
dotenv.config();

// // 今のファイルのURL（例: file:///Users/user/server.js）を通常のファイルパスに変換（例: /Users/user/server.js）
// const __filename = fileURLToPath(import.meta.url);
// // ディレクトリ部分だけを取り出す（例: /Users/user）
// const __dirname = path.dirname(__filename);

// Webサーバーアプリを作成
const app = express();  
// srcフォルダ内のHTML・CSS・JSファイルを公開
app.use(express.static('src'));
// POSTリクエスト時にJSON形式を自動的に読み取れるようにする
app.use(express.json());

// MongoDB接続
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB Atlas');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// /api/vote は projectId に紐づいた votes: Map<nickname, selections> をPOSTすることで、サーバーにすべて保存される。
app.post('/api/vote', async (req, res) => {
  const { projectId, nickname, selections } = req.body;

  if (!projectId || !nickname || !selections) {
    return res.status(400).json({ error: 'Missing data' });
  }

  try {
    // 既存プロジェクトを探す
    let project = await Project.findOne({ projectId });

    if (!project) {
      // なければ新規作成
      project = new Project({ projectId, votes: new Map() });
    }

    // ユーザーの投票データを更新 or 追加
    project.votes.set(nickname, selections);

    // 保存
    await project.save();

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('❌ /api/vote error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// /api/results?projectId=xxxxはvotes: Map<nickname, selections>をGETして、Object.fromEntries() で変換して返す
app.get('/api/results', async (req, res) => {
  const projectId = req.query.projectId;

  if (!projectId) {
    return res.status(400).json({ error: 'Missing projectId' });
  }

  try {
    const project = await Project.findOne({ projectId });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Map → 普通のオブジェクトに変換して返す
    const votesObject = Object.fromEntries(project.votes);

    res.json(votesObject);
  } catch (err) {
    console.error('❌ /api/results error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Server running: http://localhost:${PORT}`);
});

// server.js に追加
app.delete('/api/admin/reset', async (req, res) => {
  const { projectId } = req.query;
  if (!projectId) return res.status(400).json({ error: 'projectIdが必要です' });

  try {
    const project = await Project.findOne({ projectId });
    if (!project) return res.status(404).json({ error: 'プロジェクトが見つかりません' });

    project.votes = new Map(); // 投票データを初期化
    await project.save();
    res.json({ success: true });
  } catch (err) {
    console.error('❌ /api/admin/reset error:', err);
    res.status(500).json({ error: 'サーバーエラー' });
  }
});
