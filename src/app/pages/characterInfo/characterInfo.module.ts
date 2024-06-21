import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CharacterInfoComponent } from './characterInfo.component';
import { CharacterInfoRouting } from './characterInfo.routing';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    CharacterInfoComponent,
    CharacterInfoRouting,
    MatIconModule
  ]
})
export class CharacterInfoModule { }
