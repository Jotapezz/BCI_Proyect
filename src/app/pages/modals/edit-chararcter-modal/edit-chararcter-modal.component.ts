import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './edit-chararcter-modal.component.html',
  styleUrl: './edit-chararcter-modal.component.scss',
  selector: './edit-character-modal',
  standalone: true,
  imports: [CommonModule, SharedModule, MatDialogModule],

})
export class EditCharacterModalComponent {

  characterForm: FormGroup; // Formulario reactivo para la edición

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditCharacterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.characterForm = this.fb.group({
      id: [data.id],
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
      comics: [data.comics.available ? data.comics.available : data.comics, Validators.required],
      events: [data.events.available ? data.events.available : data.events, Validators.required],
      series: [data.series.available ? data.series.available : data.series, Validators.required],
      stories: [data.stories.available ? data.stories.available : data.stories, Validators.required],
      thumbnail: [data.thumbnail.path ?  (data.thumbnail.path + "." + data.thumbnail.extension) : data.thumbnail, Validators.required],
      createdBy: [data.createdBy]
    });
  }

  

  onSave(): void {
    if (this.characterForm.valid) {
      // Realizar aquí alguna lógica adicional para verificar otros criterios de validación
      // Por ejemplo, validar que comics, events, series, stories sean números válidos o no estén vacíos
      const formData = this.characterForm.value;
      this.dialogRef.close(formData);
    } else if (this.characterForm.invalid) {
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
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}