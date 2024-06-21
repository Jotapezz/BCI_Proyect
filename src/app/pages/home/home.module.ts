import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    HomeComponent,
    HomeRoutingModule
  ],
})
export class HomeModule { }
