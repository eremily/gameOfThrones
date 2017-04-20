import { Component } from '@angular/core';
import { HouseService } from './house.service';
import { CharacterService } from './character.service';
import { BookService } from './book.service';

@Component({
  selector: 'my-app',

  template:`
  	<header>
      <div class="logo">
        <a href="index.html"><img src="img/logo.png" title="gameofthrone" alt="gameofthrone"/></a>
      </div><!-- end logo -->

      <div id="menu_icon"></div>
      <nav>
        <ul>
          <li><a href="index.html" class="selected">Home</a></li>
          <li><a [routerLink]="['/houses']">Houses</a></li>
          <li><a [routerLink]="['/characters']">Characters</a></li>
          <li><a [routerLink]="['/books']">Books</a></li>
        </ul>
      </nav><!-- end navigation menu -->

      <div class="footer clearfix">
        <div class="rights">
          <p>Developed by: emily</p>
        </div><!-- end rights -->
      </div ><!-- end footer -->
    </header><!-- end header -->

  <router-outlet></router-outlet>
  `,
  providers: [HouseService,CharacterService,BookService],
 
})
export class AppComponent {
  title:string = 'Game Of Thrones!';
}
