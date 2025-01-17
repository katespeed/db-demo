import { AppDataSource } from '../dataSource';
import { Book } from '../entities/Book';

const bookRepository = AppDataSource.getRepository(Book);

async function addBook(title: string, publishedYear: number | undefined): Promise<Book> {
  let newBook = new Book();
  newBook.title = title;
  newBook.publshidYear = publishedYear;

  newBook = await bookRepository.save(newBook);

  return newBook;
}

async function getBookById(bookId: string): Promise<Book | null> {
  return await bookRepository.findOne({ where: { bookId } });
}

async function getAllBooks(): Promise<Book[]> {
  return await bookRepository.find();
}

export { addBook, getBookById, getAllBooks };
