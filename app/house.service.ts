import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { House } from './house';

@Injectable()
export class HouseService { 
  private baseUrl: string = "http://anapioficeandfire.com/api";
 
    constructor(private http : Http){}

    // get all houses data
    getHouses(): Observable <House[]>{
      let house$ = this.http
      	.get(`${this.baseUrl}/houses`, {headers: this.getHeaders()})
        .map(mapHouses) 
        .catch(handleError);
      	return house$;
    }

	get(id: number) : Observable <House>{
	  let house$ = this.http
	    .get(`${this.baseUrl}/houses/${id}`, {headers: this.getHeaders()})
	    .map(mapHouse);
	    return house$;
	}

	private getHeaders(){
	    let headers = new Headers();
	    headers.append('Accept', 'application/json');
	    return headers;
	}
}

function mapHouses(response:Response): House[]{
   // uncomment to see retrieve objects:
   //console.log(response.json());

   // The response of the API has a results
   // property with the actual results
   return response.json().map(toHouse);
}

function toHouse(h:any): House{
  let house = <House>({
    id: extractId(h),
    url: h.url,
    name: h.name,
    region: h.region,
    coatOfArms: h.coatOfArms,
  });
  console.log('Parsed house:', house);
  return house;
}

// to avoid breaking the rest of our app
// extract the id from the house url
function extractId(houseData:any){
  let extractedId = houseData.url.replace('http://anapioficeandfire.com/api/houses/','').replace('/','');
  return parseInt(extractedId);
}

function mapHouse(response:Response): House{
 
  return toHouse(response.json());
}

// this could also be a private method of the component class
function handleError (error: any) {
  // log error
  let errorMsg = error.message || `Couldn't retrieve data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}
