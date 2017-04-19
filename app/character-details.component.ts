import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';

import { Character } from './character';
import { CharacterService } from './character.service';

@Component({
  selector: 'character-details',
  templateUrl: 'app/character-details.component.html'
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {
    character: Character;
    sub: any;

    constructor(private characterService: CharacterService,
                private route: ActivatedRoute,
                private router: Router){
    }

    ngOnInit(){
      this.sub = this.route.params.subscribe(params => {
        let id = Number.parseInt(params['id']);
        console.log('getting character with id: ', id);
        this.characterService
          .get(id)
          .subscribe(c => this.character = c);
      });
    }
    
    ngOnDestroy(){
        this.sub.unsubscribe();
    }

    gotoCharacterList(){
        let link = ['/characters'];
        this.router.navigate(link);
    }
}
