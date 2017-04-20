import { Component, OnInit } from '@angular/core';
import { CharacterService } from './character.service';
import { Character } from './character';
import { Response } from '@angular/http';

@Component({
  selector: 'characterlist',
  template: `
      <section class="top">  
        <div class="wrapper content_header clearfix">
            <h2 class="title">Characters</h2>
        </div>    
      </section><!-- end top -->

      <section class="wrapper">
        <div class="content">
              <h3>{{character.name}}</h3>
              <section *ngIf="isLoading && !errorMessage">
              Loading our hyperdrives!!! Retrieving data...
              </section>
                <ul>
                  <li *ngFor="let character of character">
                    <a *ngIf="isEmptyObject(character.name)" href="#" [routerLink]="['/characters', character.id]">
                      Character {{character.id}}
                    </a>
                    <a href="#" [routerLink]="['/characters', character.id]">
                      {{character.name}}
                    </a>
                  </li>
                </ul>
                <section *ngIf="errorMessage">
                  {{errorMessage}}
                </section>
        </div><!-- end content -->
        <button class="btn btn-default" (click)="gotoPrevCharacterList()">Previous Page</button>
        <button class="btn btn-default" (click)="gotoNextCharacterList()">Next Page</button>
      </section>
  `,
})
export class CharacterListComponent implements OnInit{ 

  character: Character[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;
  private currentValue = 0;


  constructor(private characterService: CharacterService){}
  
  isEmptyObject(obj: any) {
    return (Object.keys(obj).length === 0);
  }

  ngOnInit(){
    this.characterService
      .getCharacters()
      .subscribe(
         resCharacterData => this.character = resCharacterData,
         e => this.errorMessage = e,
         () => this.isLoading = false);
  }

  //Go to next pagination 
  gotoNextCharacterList(){
      this.characterService
      .goToNextCharactersPage()
      .subscribe(
         resCharacterData => this.character = resCharacterData,
         e => this.errorMessage = e,
         () => this.isLoading = false);
  }

  //Go to prev pagination 
  gotoPrevCharacterList(){
      this.characterService
      .goToPrevCharactersPage()
      .subscribe(
         resCharacterData => this.character = resCharacterData,
         e => this.errorMessage = e,
         () => this.isLoading = false);        
  }
}

