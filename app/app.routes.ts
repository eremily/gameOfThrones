import { Routes, RouterModule } from '@angular/router';

import { HouseListComponent } from './houselist.component';
import { HouseDetailsComponent } from './house-details.component';
import { CharacterListComponent } from './characterlist.component';
import { CharacterDetailsComponent } from './character-details.component';
import { BookListComponent } from './booklist.component';
import { BookDetailsComponent } from './book-details.component';


// Route config let's you map routes to components
const routes: Routes = [
  {
    path: 'books',
    component: BookListComponent,
    pathMatch: 'full'
  },
  {
    path: 'books/:id',
    component: BookDetailsComponent,
  },
  {
    path: 'characters',
    component: CharacterListComponent,
    pathMatch: 'full'
  },
  {
    path: 'characters/:id',
    component: CharacterDetailsComponent,
  },
  {
    path: 'houses',
    component: HouseListComponent,
    pathMatch: 'full'
  },
  {
    path: 'houses/:id',
    component: HouseDetailsComponent,
  },
  // map '/' to '/characters' as our default route
  {
    path: '',
    redirectTo: '/houses',
    pathMatch: 'full'
  },
];

export const routing = RouterModule.forRoot(routes);
