import { Request, Response } from 'express';
import { addBook, getAllBooks } from '../models/BookModel';
import { parseDatabaseError } from '../utils/db-utils';

async function getBook(req: Request, res: Response): Promise<void> {
  res.json(await getAllBooks());
}

async function addNewReview(req: Request, res: Response): Promise<void> {
  if (!req.session.isLoggedIn) {
    res.sendStatus(401);
    return;
  }
  const { title, publihsedYear } = req.body as NewBookRequest;

  try {
    const newBook = await addBook(title, publihsedYear);
    console.log(newBook);
    res.sendStatus(201);
  } catch (err) {
    // The email was taken so we need to send an error message
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export { getBook, addNewReview };
