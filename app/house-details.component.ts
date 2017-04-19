import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';

import { House } from './house';
import { HouseService } from './house.service';

@Component({
  selector: 'house-details',
  templateUrl: 'app/house-details.component.html'
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
}
