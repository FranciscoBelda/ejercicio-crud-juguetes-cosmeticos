import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, of, switchMap} from 'rxjs';
import {Juguete} from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class JugueteSearchService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private word: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private jugueteSearched$ : Observable<Juguete[]> = this.word.pipe(
    switchMap(searchWord => {
      if (searchWord === '') {return of([])}
      return this.httpClient.get<Juguete[]>(
        'https://api-juguetes.vercel.app/api/v2/juguete/jugueteByName/'+searchWord
      ).pipe(
        catchError(() => of([]))
      )
    })
  );

  search(data: string){
    this.word.next(data);
  }

  start(): Observable<Juguete[]>{
    return this.jugueteSearched$;
  }
}
