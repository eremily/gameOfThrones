import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';

import { Character } from './character';
import { CharacterService } from './character.service';

@Component({
  selector: 'character-details',
  template:`
      <div *ngIf="character">
        <section class="top">   
            <div class="wrapper content_header clearfix">
              <h1 class="title">Character Name: {{character.name}}
                <a *ngIf="character.name == '' ">
                      {{character.name}}
                      Unknown
                </a>
              </h1>
            </div>      
        </section><!-- end top -->

        <section class="wrapper">
            <div class="content">
                <h4 class="title">Gender</h4>
                <p>{{character.gender}}</p>

                <h4 class="title">Culture</h4>

                <p>{{character.culture}}</p>

                <h4 class="title">Born</h4>

                <p>{{character.born}}</p>

                <h4 class="title">Died</h4>

                <p>{{character.died}}<p>
                
            </div><!-- end content -->
            <button class="btn btn-default"(click)="gotoCharacterList()">Back to Characters list</button>
        </section>
      </div>
  `,
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
