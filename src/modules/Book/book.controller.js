import mongoose from 'mongoose'; // Import mongoose

import Book from "../../../db/models/book.model.js";
import Author from "../../../db/models/author.model.js";

// POST request to create a new book.
export const createBook = async (req, res, next) => {
    const { title, content, authorId, publishedDate } = req.body;
    try {
        const author = await Author.findById(authorId);
        if (!author) {
            return res.status(404).json({ msg: "Author not found" });
        }

        const newBook = await Book.create({ title, content, author: authorId, publishedDate });
        author.books.push(newBook._id);
        await author.save();

        res.status(201).json(newBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// GET request to retrieve all books.
export const getBook = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json({ msg: "done", books });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

// GET request to retrieve a single book by its ID.
export const getBookByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ msg: "Book not found" });
        }
        res.status(200).json({ msg: "done", book });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

// PATCH request to update a book by its ID.
export const updateBook = async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!updatedBook) {
            return res.status(404).json({ msg: "Book not found" });
        }
        res.status(200).json({ msg: "done", book: updatedBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// DELETE request to delete a book by its ID.
export const DeleteBook = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ msg: "Book not found" });
        }
        res.status(200).json({ msg: "done", book: deletedBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Pagination request
export const pagination = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        const books = await Book.find({})
            .limit(limitNumber)
            .skip((pageNumber - 1) * limitNumber)
            .sort({ createdAt: -1 });

        const count = await Book.countDocuments();

        return res.status(200).json({
            books,
            totalPages: Math.ceil(count / limitNumber),
            currentPage: pageNumber,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
