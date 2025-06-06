import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Project from './models/Project.js';

// projectId と token を元にプロジェクトを取得する共通認証関数
async function authenticateProject(req, res) {
  const projectId = req.query.projectId || req.body.projectId;
  const token = req.query.token || req.body.token;

  const project = await Project.findOne({ projectId, token });
  if (!project) {
    res.status(403).json({ error: '認証失敗' });
    return null;
  }
  return project;
}

// .env ファイルを読み込んで、そこに書かれた変数を process.env に登録
dotenv.config();

// Webサーバーアプリを作成
const app = express();  
// srcフォルダ内のHTML・CSS・JSファイルを公開
app.use(express.static('src'));
// POSTリクエスト時にJSON形式を自動的に読み取れるようにする
app.use(express.json());

// MongoDB接続
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true
}).then(() => {
  console.log('✅ Connected to MongoDB Atlas');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// サーバ接続確認
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Server running: http://localhost:${PORT}`);
});

// プロジェクトを新規作成する
app.post('/api/create-project', async (req, res) => {
  const { projectId, token } = req.body;
  const newProject = new Project({
      projectId,
      token,
      votes: new Map(),
      votesInfo: new Map(),
    });
    await newProject.save();
    res.status(200).json({ success: true, message: 'プロジェクトを作成しました' });
});

// 14日後の削除日を表示
app.get('/api/create-auto-delete', async (req, res) => {
  const project = await authenticateProject(req, res);
  // 完全削除後で存在しない場合は終了
  if (!project) return;
  const votesObject = Object.fromEntries(project.votes);
  res.json({
      createdAt: project.createdAt,
      votes: votesObject,
    });
  });

// データ更新
app.post('/api/vote', async (req, res) => {
  const { nickname, selections } = req.body;

  const project = await authenticateProject(req, res);
  // 完全削除後で存在しない場合は終了
  if (!project) return;

  project.votes.set(nickname, selections);
  await project.save();

  res.status(201).json({ success: true, message: 'データを更新or保存しました' });
});


// `/api/results?projectId=${projectId}&token=${token}`で投票データを取得する
app.get('/api/results', async (req, res) => {
  const project = await authenticateProject(req, res);
  // 完全削除後で存在しない場合は終了
  if (!project) return;
  const votesObject = Object.fromEntries(project.votes);
  res.json(votesObject);
});

// 管理画面から votesInfo を保存するエンドポイント
app.post('/api/admin/vote-info', async (req, res) => {
  const { projectId, token, number, text } = req.body;

  try {
    const project = await Project.findOne({ projectId, token });
    if (!project) return res.status(404).json({ success: false, error: 'プロジェクトが見つかりません' });

    project.votesInfo.set(number, text);
    await project.save();
    res.status(200).json({ success: true, message: '保存しました' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'サーバーエラー: ' + err.message });
  }
});

// server.js：votesInfo を返すエンドポイント
app.get('/api/vote-info', async (req, res) => {
  const project = await authenticateProject(req, res);
  if (!project) return;
  const infoData = project.votesInfo
    ? Object.fromEntries(project.votesInfo)
    : {};
  res.json(infoData);
});

// 指定されたプロジェクトの中の、特定のニックネーム1人分の投票データだけを削除
app.delete('/api/admin/reset-user', async (req, res) => {
  // projectId と tokenでプロジェクト確認し、その中の nickname を削除
  const { projectId, token, nickname } = req.query;
  const project = await Project.findOne({ projectId, token });
  // 完全削除後で存在しない場合は終了
  if (!project) return;
  project.votes.delete(nickname);
  await project.save();
  res.json({ success: true });
});

// 指定されたプロジェクトを完全削除するエンドポイント
app.delete('/api/admin/delete-project', async (req, res) => {
  const project = await authenticateProject(req, res);
  // 完全削除後で存在しない場合は終了
  if (!project) return;

  await Project.deleteOne({ projectId: project.projectId });
  res.json({ success: true, message: `プロジェクト ${project.projectId} を削除しました` });
});