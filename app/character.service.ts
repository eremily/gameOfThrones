import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Character } from './character';

@Injectable()

export class CharacterService { 
  private baseUrl: string = "http://anapioficeandfire.com/api";
  private page: number = 1; maxPage: number = 214;
  private pageSize: number = 10;

 
    constructor(private http : Http){}

    // get all characters data
    getCharacters() : Observable <Character[]>{
      let character$ = this.http
        .get(`${this.baseUrl}/characters/?page=${this.page}&pageSize=${this.pageSize}`, {headers: this.getHeaders()})
        .map(mapCharacters);
        return character$;
    } 

    goToNextCharactersPage() : Observable <Character[]>{
      this.page += 1;
      let character$ = this.http
        .get(`${this.baseUrl}/characters/?page=${this.page}&pageSize=${this.pageSize}`, {headers: this.getHeaders()})
        .map(mapCharacters);
        return character$;
    }

    goToPrevCharactersPage() : Observable <Character[]>{
      this.page -= 1;
      let character$ = this.http
        .get(`${this.baseUrl}/characters/?page=${this.page}&pageSize=${this.pageSize}`, {headers: this.getHeaders()})
        .map(mapCharacters);
        return character$;
    }  

    get(id: number) : Observable <Character>{
      let character$ = this.http
        .get(`${this.baseUrl}/characters/${id}`, {headers: this.getHeaders()})
        .map(mapCharacter);
        return character$;
    }

    private getHeaders(){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }
}

function mapCharacters(response:Response): Character[]{
   // uncomment to see retrieve objects:
   //console.log(response.json());

   // The response of the API has property with the actual results
   return response.json().map(toCharacter);
}

function toCharacter(c:any): Character{
  let character = <Character>({
    id: extractId(c),
    url: c.url,
    name: c.name,
    gender: c.gender,
    culture: c.culture,
    born: c.born,
    died: c.died,
  });
  console.log('Parsed character:', character);
  return character;
}

// extract the id from the character url
function extractId(characterData:any){
  let extractedId = characterData.url.replace('https://anapioficeandfire.com/api/characters/','').replace('/','');
  return parseInt(extractedId);
}

function mapCharacter(response:Response): Character{
 
  return toCharacter(response.json());
}

function handleError (error: any) {
  // log error
  let errorMsg = error.message || `Couldn't retrieve data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}
