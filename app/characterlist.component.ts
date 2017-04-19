import { Component, OnInit } from '@angular/core';
import { CharacterService } from './character.service';
import { Character } from './character';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import * as global from './global';

@Component({
  selector: 'characterlist',
  template: `
    <h2>Character List</h2>
    <h3>{{character.name}}</h3>
    <section>
      <section *ngIf="isLoading && !errorMessage">
      Loading our hyperdrives!!! Retrieving data...
      </section>
        <ul>
          <!-- this is the new syntax for ng-repeat -->
          <li *ngFor="let character of character">
            <a *ngIf="isEmptyObject(character.name)" href="#" [routerLink]="['/characters', character.id]">
              Character {{character.id}}
            </a>
            <a href="#" [routerLink]="['/characters', character.id]">
              {{character.name}}
            </a>
          </li>
        </ul>
          <button (click)="gotoPrevCharacterList()">Previous Page</button>
          <button (click)="gotoNextCharacterList()">Next Page</button>
        <section *ngIf="errorMessage">
          {{errorMessage}}
        </section>
    </section>
  `,
})
export class CharacterListComponent implements OnInit{ 

  character: Character[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;
  private currentValue = 0;


  constructor(private characterService: CharacterService,
              private route: ActivatedRoute,
              private router: Router){}
  
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

  //Go to next character pagination 
  gotoNextCharacterList(){
      this.characterService
      .goToNextCharactersPage()
      .subscribe(
         resCharacterData => this.character = resCharacterData,
         e => this.errorMessage = e,
         () => this.isLoading = false);
        console.log("hii" + this.currentValue);
        
  }

  //Go to prev character pagination 
  gotoPrevCharacterList(){
      this.characterService
      .goToPrevCharactersPage()
      .subscribe(
         resCharacterData => this.character = resCharacterData,
         e => this.errorMessage = e,
         () => this.isLoading = false);
        console.log("hii" + this.currentValue);
        
  }
}

