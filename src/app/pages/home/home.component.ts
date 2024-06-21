import { Component, OnInit, OnDestroy } from '@angular/core';
import { fadeInOut, transformacionAnimacion } from '../../animations/animations';
import { CommonModule } from '@angular/common';
import { marvel } from '../../models/characters.models';
import { SharedModule } from '../../shared/shared.module';
import { MarvelService } from '../../shared/services/marvel.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCharacterModalComponent } from '../modals/edit-chararcter-modal/edit-chararcter-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, SharedModule
  ],
  animations: [fadeInOut, transformacionAnimacion],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public headers = ['id', 'Nombre', 'Dificultad', 'Imagen'];
  public characters: any = [];
  public urlImage: any;
  public selectCharacter: marvel | null = null;
  public dataLoaded: boolean = false;
  public panelOpenState = false;
  public colorDelete = 'rgb(145, 71, 71)';
  public marvelCharacters: any[] = [];
  public limit: number = 30;
  public offset: number = 0;
  public userCharacters: any[] = [];
  public allCharacters: any[] = [];
  public displayedCharacters: any[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public totalPages: number = 0;

  constructor(
    private marvelService: MarvelService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    window.addEventListener('beforeunload', this.setReloadFlag);
    if (localStorage.getItem('pageReloaded') === 'true') {
      this.resetLocalStorage();
      localStorage.setItem('pageReloaded', 'false');
      this.getAllCharacters();
    } else {
      this.loadCharactersFromLocalStorage();
    }
  }


  loadCharactersFromLocalStorage(): void {
    const characters = JSON.parse(localStorage.getItem('marvelCharacters') || '[]');
    this.marvelCharacters = characters;
    this.calculateTotalPages();
    this.updateDisplayedCharacters();
  }

  getAllCharacters(): void {
    this.marvelService.getMarvelCharacters().subscribe(
      (allCharacters) => {
        console.log('todos los personajes: ', allCharacters.data.results)
        this.marvelCharacters = allCharacters.data.results;
        localStorage.setItem('marvelCharacters', JSON.stringify(this.marvelCharacters));
        this.calculateTotalPages();
        this.updateDisplayedCharacters();
      },
      (error) => {
        console.error('Error fetching Marvel characters:', error);
      }
    );
  }
  
  updateDisplayedCharacters(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedCharacters = this.marvelCharacters.slice(startIndex, endIndex);
  }

  getUserCharacters(): void {
    const characters = JSON.parse(localStorage.getItem('marvelCharacters') || '[]');
    this.userCharacters = characters;
  }
  
  formatValue(value: any): number {
    console.log('valor: ',value)
    if (value.available == 0) {
      return 0;
    } else if (value && value.available) {
      return value.available;
    } else {
      return value || 'No information available';
    }
  }

  loadMoreCharacters(): void {
    this.offset += this.limit;
    this.getAllCharacters();
    this.loadCharactersFromLocalStorage();
  }

  deleteCharacter(character: any): void {
    if (confirm(`¿Estás seguro de eliminar a ${character.name}?`)) {
      let characters = JSON.parse(localStorage.getItem('marvelCharacters') || '[]');
      characters = characters.filter((char: any) => char.id !== character.id);
      localStorage.setItem('marvelCharacters', JSON.stringify(characters));
      this.marvelCharacters = characters;
      this.updateDisplayedCharacters();
    }
  }

  editCharacter(character: any): void {
    console.log('personaje a modal: ', character)
    const dialogRef = this.dialog.open(EditCharacterModalComponent, {
      width: '600px',
      data: character
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveEditedCharacter(result);
      }
    });
  }

  saveEditedCharacter(updatedCharacter: any): void {
    let characters = JSON.parse(localStorage.getItem('marvelCharacters') || '[]');

    characters = characters.map((char: any) => {
      if (char.id === updatedCharacter.id) {
        return updatedCharacter;
      }
      return char;
    });

    localStorage.setItem('marvelCharacters', JSON.stringify(characters));
    this.marvelCharacters = characters;
    this.updateDisplayedCharacters();
  }

  calculateTotalPages(): void {
    console.log('length: ',this.marvelCharacters.length)
    console.log(this.itemsPerPage)
    this.totalPages = Math.ceil(this.marvelCharacters.length / this.itemsPerPage);
    console.log(this.totalPages)
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedCharacters();
    }
  }

  toggleHide(character: marvel) {
    this.selectCharacter = this.selectCharacter === character ? null : character;
  }

  navigateToCharacterInfo(id: number): void {
    this.marvelService.navigateToCharacterInfo([id]);
  }

  navigateToNewCharacter() {
    this.marvelService.navigateToNewCharacter();
  }

  setReloadFlag() {
    localStorage.setItem('pageReloaded', 'true');
  }

  resetLocalStorage(): void {
    localStorage.removeItem('marvelCharacters');
  }


  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.setReloadFlag);
  }
}
