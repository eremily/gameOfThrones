import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';

import { Book } from './book';
import { BookService } from './book.service';

@Component({
  selector: 'book-details',
  template:`
      <div *ngIf="book">
        <section class="top">   
            <div class="wrapper content_header clearfix">
              <h1 class="title">Book Name: {{book.name}}
                <a *ngIf="book.name == '' ">
                      {{book.name}}
                      Unknown
                </a>
              </h1>
            </div>      
        </section><!-- end top -->

        <section class="wrapper">
            <div class="content">
                <h4 class="title">isbn</h4>
                <p>{{book.isbn}}</p>

                <h4 class="title">authors</h4>

                <p>{{book.author}}</p>

                <h4 class="title">publisher</h4>

                <p>{{book.publisher}}</p>

                <h4 class="title">country</h4>

                <p>{{book.country}}<p>

                <h4 class="title">released</h4>

                <p>{{book.released}}<p>
                
            </div><!-- end content -->
            <button class="btn btn-default"(click)="gotoBookList()">Back to Books list</button>
        </section>
      </div>
  `,
})
export class BookDetailsComponent implements OnInit, OnDestroy {
    book: Book;
    sub: any;

    constructor(private bookService: BookService,
                private route: ActivatedRoute,
                private router: Router){
    }

    ngOnInit(){
      this.sub = this.route.params.subscribe(params => {
        let id = Number.parseInt(params['id']);
        console.log('getting book with id: ', id);
        this.bookService
          .get(id)
          .subscribe(c => this.book = c);
      });
    }
    
    ngOnDestroy(){
        this.sub.unsubscribe();
    }

    gotoBookList(){
        let link = ['/books'];
        this.router.navigate(link);
    }
}
