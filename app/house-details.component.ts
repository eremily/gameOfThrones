import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';

import { House } from './house';
import { HouseService } from './house.service';

@Component({
  selector: 'house-details',
  template:`
      <div *ngIf="house">
        <section class="top">   
            <div class="wrapper content_header clearfix">
              <h1 class="title">House Name: {{house.name}}
                <a *ngIf="house.name == '' ">
                      {{house.name}}
                      Unknown
                </a>
              </h1>
            </div>      
        </section><!-- end top -->

        <section class="wrapper">
            <div class="content">
                <h4 class="title">Region</h4>
                <p>{{house.region}}</p>

                <h4 class="title">Coat Of Arms</h4>

                <p>{{house.coatOfArms}}</p>

         
            </div><!-- end content -->
            <button class="btn btn-default" (click)="gotoHouseList()">Back to houses list</button>
        </section>
      </div>
  `,
})
export class HouseDetailsComponent implements OnInit, OnDestroy {
    house: House;
    sub: any;

    constructor(private houseService: HouseService,
                private route: ActivatedRoute,
                private router: Router){
    }

    ngOnInit(){
      this.sub = this.route.params.subscribe(params => {
        let id = Number.parseInt(params['id']);
        console.log('getting house with id: ', id);
        this.houseService
          .get(id)
          .subscribe(h => this.house = h);
      });
    }
    
    ngOnDestroy(){
        this.sub.unsubscribe();
    }

    gotoHouseList(){
        let link = ['/houses'];
        this.router.navigate(link);
    }
    gotoCharacterList(){
        let link = ['/characters'];
        this.router.navigate(link);
    }
}
