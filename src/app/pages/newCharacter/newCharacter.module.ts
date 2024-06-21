import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NewCharacterComponent } from './newCharacter.component';
import { NewCharacterRouting } from './newCharacter.routing';
import { MatTabNavPanel } from '@angular/material/tabs';
import { MatTabNav } from '@angular/material/tabs';
import { MatToolbar } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    NewCharacterComponent,
    NewCharacterRouting,
    MatTabNavPanel,
    MatTabNav,
    MatToolbar
  ]
})
export class NewCharacterModule { }
