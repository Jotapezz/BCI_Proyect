import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  private apiUrl = 'https://gateway.marvel.com/v1/public';
  private publicKey = 'fc5d4580ba3adfd4a50875e08562d3d0';
  private privateKey = '01d1bf36c0164f353d2d16ce949dd4279e3455bd';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  dataLoaded: boolean = false;



  
  getMarvelCharacters(limit: number = 20, offset: number = 0): Observable<any> {
    const timestamp = new Date().getTime().toString();
    const hash = this.generateHash(timestamp);

    let params = new HttpParams()
      .set('ts', timestamp)
      .set('apikey', this.publicKey)
      .set('hash', hash)
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get<any>(`${this.apiUrl}/characters`, { params });
  }

  getCharacterById(characterId: number): Observable<any> {
    const url = `${this.apiUrl}/characters/${characterId}`;
    const timestamp = new Date().getTime().toString();
    const hash = this.generateHash(timestamp);

    const params = new HttpParams()
      .set('ts', timestamp)
      .set('apikey', this.publicKey)
      .set('hash', hash);

    return this.http.get(url, { params });
  }

  private generateHash(timestamp: string): string {
    const hashGenerator = CryptoJS.MD5(timestamp + this.privateKey + this.publicKey);
    return hashGenerator.toString(CryptoJS.enc.Hex);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToCharacterInfo(id: any) {
    this.router.navigate([`/characterinfo/${id}`]);
  }

  navigateToNewCharacter() {
    this.router.navigate(['/newCharacter']);
  }

  resetDataFromEndpoint(): void {
    this.dataLoaded = false;
  }
  
}