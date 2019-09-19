import { Book } from 'src/app/core/interfaces/book.interface';
import { SearchResult } from 'src/app/core/interfaces/search-result.interface';

export interface IndexInterface {
  [key: string]: Map<Book, SearchResult>[];
}
