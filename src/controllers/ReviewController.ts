import { Request, Response } from 'express';
import { addReview, getAllReviews } from '../models/ReviewModel';
import { parseDatabaseError } from '../utils/db-utils';
import { getUserById } from '../models/UserModel';
import { getBookById } from '../models/BookModel';

// type NewReviewRequest = {};

async function getReview(req: Request, res: Response): Promise<void> {
  res.json(await getAllReviews());
}

async function addNewReview(req: Request, res: Response): Promise<void> {
  if (!req.session.isLoggedIn) {
    res.sendStatus(401);
    return;
  }
  const { authenticatedUser } = req.session;

  const user = await getUserById(authenticatedUser.userId);

  const { rating, reviewText } = req.body as NewReviewRequest;

  const { bookId } = req.params as BookIdRequest;

  const book = await getBookById(bookId);
  if (!user || !book) {
    res.sendStatus(404);
    return;
  }
  try {
    const newReview = await addReview(rating, reviewText, user, book);
    console.log(newReview);
    res.sendStatus(200);
  } catch (err) {
    // The email was taken so we need to send an error message
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export { getReview, addNewReview };
