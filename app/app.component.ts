import { Component } from '@angular/core';
import { HouseService } from './house.service';
import { CharacterService } from './character.service';


@Component({
  selector: 'my-app',
  template: `
  <h1> {{title}} </h1>
  <router-outlet></router-outlet>
  `,
  providers: [HouseService,CharacterService]
})
export class AppComponent {
  title:string = 'Game Of Thrones!';
}
