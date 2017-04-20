import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Book } from './book';

@Injectable()
export class BookService { 
  private baseUrl: string = "https://anapioficeandfire.com/api";
 
    constructor(private http : Http){}

    // get all books data
    getBooks(): Observable <Book[]>{
      let book$ = this.http
        .get(`${this.baseUrl}/books`, {headers: this.getHeaders()})
        .map(mapBooks) 
        .catch(handleError);
        return book$;
    }

  get(id: number) : Observable <Book>{
    let book$ = this.http
      .get(`${this.baseUrl}/books/${id}`, {headers: this.getHeaders()})
      .map(mapBook);
      return book$;
  }

  private getHeaders(){
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      return headers;
  }
}

function mapBooks(response:Response): Book[]{
   // uncomment to see retrieve objects:
   //console.log(response.json());

   return response.json().map(toBook);
}

function toBook(b:any): Book{
  let book = <Book>({
    id: extractId(b),
    name: b.name,
    url: b.url,
    isbn: b.isbn,
    author: b.author,
    publisher: b.publisher,
    country: b.country,
  });
  console.log('Parsed book:', book);
  return book;
}

// to avoid breaking the rest of our app
// extract the id from the book url
function extractId(bookData:any){
  let extractedId = bookData.url.replace('https://anapioficeandfire.com/api/books/','').replace('/','');
  return parseInt(extractedId);
}

function mapBook(response:Response): Book{
  return toBook(response.json());
}

// this could also be a private method of the component class
function handleError (error: any) {
  // log error
  let errorMsg = error.message || `Couldn't retrieve data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}
