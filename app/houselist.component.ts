import { Component, OnInit } from '@angular/core';
import { HouseService } from './house.service';
import { House } from './house';

@Component({
  selector: 'houselist',
  template: `
    <h2>House List</h2>
    <h3>{{house.name}}</h3>
    <section>
      <section *ngIf="isLoading && !errorMessage">
      Loading our hyperdrives!!! Retrieving data...
      </section>
        <ul>
          <!-- this is the new syntax for ng-repeat -->
          <li *ngFor="let house of house">
              <a href="#" [routerLink]="['/houses', house.id]">
            {{house.name}}
            </a>
          </li>
        </ul>
        <section *ngIf="errorMessage">
          {{errorMessage}}
        </section>
    </section>
  `,
})
export class HouseListComponent implements OnInit{ 

  house: House[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private houseService: HouseService){}

   ngOnInit(){
    this.houseService
      .getHouses()
      .subscribe(
         /* happy path */ resHouseData => this.house = resHouseData,
         /* error path */ e => this.errorMessage = e,
         /* onComplete */ () => this.isLoading = false);
  }
}
