import Author from "../../../db/models/author.model.js";

// POST request to create a new author.
export const createAuthor = async (req, res, next) => {
    const { name, bio, birthDate } = req.body;
    try {
        const newAuthor = await Author.create({ name, bio, birthDate });
        res.status(201).json(newAuthor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// GET request to retrieve all authors.
export const getAuthors = async (req, res, next) => {
    try {
        const authors = await Author.find();
        res.status(200).json({ msg: "done", authors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// GET request to retrieve a single author by its ID.
export const getAuthorByID = async (req, res, next) => {
    const { id } = req.params;
    try {
        const author = await Author.findById(id).populate('books');
        if (!author) {
            return res.status(404).json({ msg: "Author not found" });
        }
        res.status(200).json({ msg: "done", author });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// PATCH request to update an author by its ID.
export const updateAuthor = async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!updatedAuthor) {
            return res.status(404).json({ msg: "Author not found" });
        }
        res.status(200).json({ msg: "done", author: updatedAuthor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// DELETE request to delete an author by its ID.
export const deleteAuthor = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedAuthor = await Author.findByIdAndDelete(id);
        if (!deletedAuthor) {
            return res.status(404).json({ msg: "Author not found" });
        }
        res.status(200).json({ msg: "done", author: deletedAuthor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const pagination = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        const authors = await Author.find({})
            .limit(limitNumber)
            .skip((pageNumber - 1) * limitNumber)
            .sort({ createdAt: -1 });

        const count = await Author.countDocuments();

        return res.status(200).json({
            authors,
            totalPages: Math.ceil(count / limitNumber),
            currentPage: pageNumber,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
