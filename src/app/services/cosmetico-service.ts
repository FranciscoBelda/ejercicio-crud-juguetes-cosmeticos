import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponseCosmeticos, ApiResponseMessage, Cosmetico} from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CosmeticoService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly urlBase  = 'https://api-cosmeticos.vercel.app/api/v2/cosmeticos/';

  getCosmeticosByPage(page: number): Observable<ApiResponseCosmeticos>{
    return this.http.get<ApiResponseCosmeticos>(
      this.urlBase + 'paged?page=' + page + '&limit=10'
    )
  }

  getOneCosmetico(id: string): Observable<Cosmetico>{
    return this.http.get<Cosmetico>(this.urlBase + 'detail/' + id);
  }

  postCosmetico(cosmetico: Cosmetico): Observable<ApiResponseMessage>{
    return this.http.post<ApiResponseMessage>(this.urlBase + 'addOne', cosmetico);
  }

  patchCosmetico(cosmetico: Cosmetico): Observable<ApiResponseMessage>{
    return this.http.patch<ApiResponseMessage>(this.urlBase + 'updateOne/' + cosmetico._id, cosmetico);
  }

  deleteCosmetico(id: string): Observable<ApiResponseMessage> {
    return this.http.delete<ApiResponseMessage>(this.urlBase + 'deleteOne/' + id);
  }
}
