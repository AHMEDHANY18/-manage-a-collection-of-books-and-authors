import { Schema, model } from "mongoose";

const bookSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    publishedDate: { type: Date, default: Date.now }
});

const Book = model('Book', bookSchema);

export default Book;
