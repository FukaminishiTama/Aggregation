import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  projectId: { type: String, required: true, unique: true },
  votes: { type: Map, of: Array }, // { "ニックネーム": [ [...], [...] ] }
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 20 } // TTL 20日
});

export default mongoose.model('Project', projectSchema);
