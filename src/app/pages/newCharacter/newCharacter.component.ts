import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MarvelService } from '../../shared/services/marvel.service';
import Swal from 'sweetalert2';


export interface Marvel {
  id: number;
  name: string;
  description: string;
  comics: string;
  events: number;
  series: number;
  stories: number;
  thumbnail: string;
  createdBy: string;
}

@Component({
  selector: 'app-newCharacter',
  standalone: true,
  imports: [SharedModule, CommonModule, MatIcon],
  templateUrl: './newCharacter.component.html',
  styleUrls: ['./newCharacter.component.scss']
})
export class NewCharacterComponent implements OnInit {

  characterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private marvelService: MarvelService,
  ) {{
    // Inicializar el FormGroup en el constructor
    this.characterForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      comics: [0, Validators.required],
      events: [0, Validators.required],
      series: [0, Validators.required],
      stories: [0, Validators.required],
      thumbnail: ['', Validators.required]
    });
  }}

  ngOnInit(): void {

  }

  saveCharacter(): void {
    if (!this.characterForm) {
      return;
    }
  
    if (this.characterForm.invalid) {
      const invalidFields = Object.keys(this.characterForm.controls).filter(field => {
        const control = this.characterForm.get(field);
        return control ? control.invalid : false;
      });
  
      Swal.fire({
        title: 'Warning',
        text: `Please fill in the following fields: ${invalidFields.join(', ')}`,
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    const newCharacter: Marvel = {
      id: new Date().getTime(),
      name: this.characterForm.value.name,
      description: this.characterForm.value.description,
      comics: this.characterForm.value.comics,
      events: this.characterForm.value.events,
      series: this.characterForm.value.series,
      stories: this.characterForm.value.stories,
      thumbnail: this.characterForm.value.thumbnail,
      createdBy: "human"
    };

    const characters = JSON.parse(localStorage.getItem('marvelCharacters') || '[]');
    characters.push(newCharacter);
    localStorage.setItem('marvelCharacters', JSON.stringify(characters));

    Swal.fire({
      title: 'Success',
      text: 'Character created successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate(['/']);
    });
  }

  navigateToHome() {
    this.marvelService.navigateToHome();
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
