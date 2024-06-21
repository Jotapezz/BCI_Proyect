import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewCharacterComponent } from './newCharacter.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: NewCharacterComponent,
        data: {
          title: 'New Character'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewCharacterRouting { }
