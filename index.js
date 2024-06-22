import express, { json } from 'express';
import connectiontDB from './db/connection.js';
import AuthorRouter from './src/modules/author/author.routes.js';
import bookRouter from './src/modules/Book/book.routes.js';

const app = express()
const port = 3000
connectiontDB()

app.use(express.json())
app.use("/Author",AuthorRouter)
app.use("/Book",bookRouter)


app.use('*', (req, res) => res.send('404 Not Found'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))