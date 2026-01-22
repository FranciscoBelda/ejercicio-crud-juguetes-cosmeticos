import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {CosmeticoService} from '../../../../services/cosmetico-service';
import {Cosmetico, CosmeticosData} from '../../../../common/interfaces';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {CurrencyPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {CosmeticoCartService} from '../../../../services/cosmetico-cart-service';
import {CosmeticoSearchService} from '../../../../services/cosmetico-search-service';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';

@Component({
  selector: 'app-cosmeticos-list',
  imports: [
    NgbPagination,
    CurrencyPipe,
    RouterLink,
  ],
  templateUrl: './cosmeticos-list.html',
  styleUrl: './cosmeticos-list.css',
})
export class CosmeticosList implements OnInit {
    private readonly cosmeticoService: CosmeticoService = inject(CosmeticoService);
    private readonly cosmeticoCartService: CosmeticoCartService = inject(CosmeticoCartService);
    private readonly cosmeticoSearchService: CosmeticoSearchService = inject(CosmeticoSearchService);
    cosmeticoList: WritableSignal<Cosmetico[]> = signal<Cosmetico[]>([]);
    apiData!: CosmeticosData;
    currentPage: number = 1;
    loaded = false;

    ngOnInit() {
      this.loadCosmeticos();
      this.loadSearch();
    }

  private loadCosmeticos() {
    this.cosmeticoService.getCosmeticosByPage(this.currentPage).subscribe(
      {
        next: dataAPI => {
          this.cosmeticoList.set(dataAPI.cosmeticos.cosmeticos);
          this.apiData = dataAPI.cosmeticos;
          console.log('Data loaded: ', this.cosmeticoList());
          this.loaded = true;
        },
        error: error => {
          console.error(error);
        }
      }
    )
  }

  onPageChange(event: number) {
    this.currentPage = event;
    this.loadCosmeticos();
  }

  deleteCosmetico(id: string) {
    this.cosmeticoService.deleteCosmetico(id).subscribe(
      {
        next: dataAPI => {
          console.log(dataAPI);
        },
        error: error => {
          console.error(error);
        }
      }
    )
  }

  addToCart(cosmetico: Cosmetico) {
    this.cosmeticoCartService.addToCart(cosmetico);
  }

  buscar(event: any){
      const text: string = event.target.value as string;
      if (text === '') {this.loadCosmeticos();}
      else this.cosmeticoSearchService.search(text);
  }

  loadSearch(){
      this.cosmeticoSearchService.start().subscribe(
        {
          next: dataAPI => {
            this.cosmeticoList.set(dataAPI);
          },
          error: error => {
            console.error(error);
          }
        }
      )
  }

  protected readonly faMagnifyingGlass = faMagnifyingGlass;
}
