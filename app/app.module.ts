import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routes';

import { AppComponent }  from './app.component';
import { HouseListComponent }  from './houselist.component';
import { HouseDetailsComponent } from './house-details.component';
import { CharacterListComponent }  from './characterlist.component';
import { CharacterDetailsComponent } from './character-details.component';

@NgModule({
  imports: [ BrowserModule, routing, FormsModule, HttpModule],
  declarations: [ AppComponent, HouseListComponent, HouseDetailsComponent,
  CharacterListComponent, CharacterDetailsComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
