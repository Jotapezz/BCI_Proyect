import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'characterinfo/:id',
        loadChildren: () => import('./pages/characterInfo/characterInfo.module').then(m => m.CharacterInfoModule)
      },
      {
        path: 'newCharacter',
        loadChildren: () => import('./pages/newCharacter/newCharacter.module').then(m => m.NewCharacterModule)
      }

];
