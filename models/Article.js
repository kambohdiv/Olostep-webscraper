import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  url: { type: String, required: true },
  dataHtml: { type: String, required: true },
  dataJson: { type: Array, required: true },
  scrapedAt: { type: Date, default: Date.now },
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
