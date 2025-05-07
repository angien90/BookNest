import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true
  }
});

export default mongoose.model('Reviews', ReviewSchema);