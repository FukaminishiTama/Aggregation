import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  projectId: { type: String, required: true, unique: true },
  token: { type: String, required: true }, // プロジェクト同名回避用のキー
  votes: { type: Map, of: Array }, // { "ニックネーム": [ [...], [...] ] }
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 15 } // TTL 15日
});

export default mongoose.model('Project', projectSchema);
