import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from './book';

@Component({
  selector: 'booklist',
  template: `
      <section class="top">  
        <div class="wrapper content_header clearfix">
            <h2 class="title">Books</h2>
        </div>    
      </section><!-- end top -->

      <section class="wrapper">
        <div class="content">
              <section *ngIf="isLoading && !errorMessage">
              Loading our hyperdrives!!! Retrieving data...
              </section>
                <ul>
                  <li *ngFor="let book of book">
                    <a *ngIf="book.name === null" href="#" [routerLink]="['/books', book.id]">
                      Book {{book.id}}
                    </a>
                    <a href="#" [routerLink]="['/books', book.id]">
                      {{book.name}}
                    </a>
                  </li>
                </ul>
                <section *ngIf="errorMessage">
                  {{errorMessage}}
                </section>
        </div><!-- end content -->
      </section>
  `,
})
export class BookListComponent implements OnInit{ 

  book: Book[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private bookService: BookService){}

   ngOnInit(){
    this.bookService
      .getBooks()
      .subscribe(
         resBookData => this.book = resBookData,
         e => this.errorMessage = e,
         () => this.isLoading = false);
  }
}
