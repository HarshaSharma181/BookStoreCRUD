const router = require("express").Router();
const bookModel = require("../models/booksModel");

// POST REQUEST
router.post("/add", async (req, res) => {
    try {
        const data = req.body;
        const newBook = new bookModel(data);
        newBook.save().then(() => {
            res.status(200).json({ message: "Book Added Successfully" });
        });
    } catch (error) {
        console.log(error);
    }
});


// GET REQUEST
router.get("/getBooks", async (req, res) => {
    let books;
    try {
        books = await bookModel.find();
        res.status(200).json({ books });
    } catch (error) {
        console.log(error);
    }
});

// GET REQ. WITH ID
router.get("/getBooks/:id", async (req, res) => {
    try {
        const book = await bookModel.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);  // ✅ Send the book directly
    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).json({ message: "Server error" });
    }
});


// UPDATE BOOKS BY ID
router.put("/updateBook/:id", async (req, res) => {
    const { bookname, description, author, image, price } = req.body;
    try {
        const updatedBook = await bookModel.findByIdAndUpdate(
            req.params.id,
            { bookname, description, author, image, price },
            { new: true }  // ✅ Return the updated document
        );

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Data Updated", book: updatedBook });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ message: "Failed to update book" });
    }
});


// DELETE BOOK BY ID
router.delete("/deleteBook/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deletedBook = await bookModel.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "DELETED SUCCESSFULLY" });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: "Server error" });
    }
});




module.exports = router;
