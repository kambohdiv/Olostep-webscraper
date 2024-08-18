import mongoose, { Document, Schema } from 'mongoose';

interface IArticle extends Document {
  userId: string;
  url: string;
  dataHtml: string;
  dataJson: Array<{ tag: string; content: string }>;
  scrapedAt: Date;
}

const articleSchema = new Schema<IArticle>({
  userId: { type: String, required: true },
  url: { type: String, required: true },
  dataHtml: { type: String, required: true },
  dataJson: [
    {
      tag: { type: String, required: true },
      content: { type: String, required: true },
    }
  ],
  scrapedAt: { type: Date, default: Date.now },
});

const Article = mongoose.models.Article || mongoose.model<IArticle>('Article', articleSchema);

export default Article;
