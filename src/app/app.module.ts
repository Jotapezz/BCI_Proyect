import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common'

import { SharedModule } from './shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DecimalPipe } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { MatCardModule, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClient,
    MatSlideToggleModule,
    MatCardModule,
    MatCardContent,
    MatIcon,
    MatDialogModule,
    MatTableModule
  ],
  providers: [
    DecimalPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
