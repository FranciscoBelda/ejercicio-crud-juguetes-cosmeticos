import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, of, switchMap} from 'rxjs';
import {Cosmetico} from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CosmeticoSearchService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private text: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private cosmeticosSearched$: Observable<Cosmetico[]> = this.text.pipe(
    switchMap(textSearched => {
      if (textSearched === '') {return of([])}
      return this.httpClient.get<Cosmetico[]>(
        'https://api-cosmeticos.vercel.app/api/v2/cosmeticos/cosmeticoByName/'+textSearched
      ).pipe(
        catchError(error => of([]))
      )
    })
  );

  search(data: string){
    this.text.next(data);
  }

  start(): Observable<Cosmetico[]>{
    return this.cosmeticosSearched$;
  }
}
