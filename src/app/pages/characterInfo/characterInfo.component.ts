import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarvelService } from '../../shared/services/marvel.service';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { fadeInOut, transformacionAnimacion } from '../../animations/animations';
import { MatIcon } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-characterInfo',
  standalone: true,
  imports: [SharedModule, CommonModule, MatIcon],
  animations: [fadeInOut, transformacionAnimacion],
  templateUrl: './characterInfo.component.html',
  styleUrls: ['./characterInfo.component.scss']
})

export class CharacterInfoComponent implements OnInit {

  characterId: number = 0; 
  character: any = {};
  characterForm: FormGroup;

  marvelCharacters: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private marvelService: MarvelService
  ) {
    this.characterForm = this.fb.group({
      title: ['', Validators.required],
      summary: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.characterId = +params['id'];
      this.loadCharacterDetails();
    });
  }

  loadCharacterDetails(): void {
    const characters = JSON.parse(localStorage.getItem('marvelCharacters') || '[]');
    this.character = characters.find((char: any) => char.id === this.characterId);
  
    if (!this.character) {
      // Si no está localmente, obtener desde la API de Marvel
      this.marvelService.getCharacterById(this.characterId).subscribe(
        (data: any) => {
          if (data && data.data && data.data.results && data.data.results.length > 0) {
            this.character = data.data.results[0];
          } else {
            console.error('Personaje no encontrado en la API de Marvel');
          }
        },
        error => {
          console.error('Error al cargar los detalles del personaje desde la API de Marvel', error);
          Swal.fire({
            title: 'Warning',
            text: `The App couldn't get this character. Please, try again later`,
            icon: 'warning',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.navigateToHome();
            }
          });
        }
      );
    }
  }


  populateForm(): void {
    if (this.character) {
      this.characterForm.patchValue({
        title: this.character.name,
        summary: this.character.description
      });
    }
  }

  navigateToHome() {
    this.marvelService.navigateToHome();
  }

}
