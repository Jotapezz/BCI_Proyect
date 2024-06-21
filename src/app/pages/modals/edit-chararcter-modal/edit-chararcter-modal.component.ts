import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

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
      description: [data.description],
      comics: [data.comics.available],
      events: [data.events.available],
      series: [data.series.available],
      stories: [data.stories.available],
      thumbnail: [data.thumbnail.path + "." + data.thumbnail.extension],
      createdBy: [data.createdBy]
    });
  }

  onSave(): void {
    this.dialogRef.close(this.characterForm.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}