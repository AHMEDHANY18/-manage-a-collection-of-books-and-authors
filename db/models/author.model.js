import { Schema, model } from "mongoose";

const authorSchema = new Schema({
    name: { type: String, required: true },
    bio: {String},
    birthDate: {Date},
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
},{timestamps: true});

const Author = model('Author', authorSchema);

export default Author;
