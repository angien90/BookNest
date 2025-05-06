import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genres: {
    type: Array,
    required: true
  },
  images: {
    type: String,
    required: true
  },
  published_year: {
    type: Number,
    required: true
  }
});

export default mongoose.model('Books', BookSchema);