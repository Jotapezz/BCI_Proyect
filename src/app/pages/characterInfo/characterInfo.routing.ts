import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterInfoComponent } from './characterInfo.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CharacterInfoComponent,
        data: {
          title: 'Character Information'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterInfoRouting { }
