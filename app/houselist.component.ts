import { Component, OnInit } from '@angular/core';
import { HouseService } from './house.service';
import { House } from './house';

@Component({
  selector: 'houselist',
  template: `
    <section>
      <section *ngIf="isLoading && !errorMessage">
      Retrieving data..
      </section>
          <div *ngFor="let house of house">
            <div class="work">
              <a href="#" [routerLink]="['/houses', house.id]">
                <img src="img/house/{{house.id}}.jpg" class="media" alt=""/>
                <div class="caption">
                  <div class="work_title">
                    <h1>{{house.name}}</h1>
                  </div>
                </div>
              </a>
            </div>
          </div>
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
