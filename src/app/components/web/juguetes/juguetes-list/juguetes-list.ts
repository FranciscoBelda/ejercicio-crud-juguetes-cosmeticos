import {Component, inject, OnInit} from '@angular/core';
import {DataService} from '../../../../services/data-service';
import {ApiResponseJuguetesByPage, Juguete} from '../../../../common/interfaces';
import {CurrencyPipe} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faEdit} from '@fortawesome/free-regular-svg-icons/faEdit';
import {faTrashCan} from '@fortawesome/free-regular-svg-icons/faTrashCan';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {RouterLink} from '@angular/router';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons/faCartShopping';
import {JugueteCartService} from '../../../../services/juguete-cart-service';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import {JugueteSearchService} from '../../../../services/juguete-search-service';

@Component({
  selector: 'app-juguetes-list',
  imports: [
    CurrencyPipe,
    FaIconComponent,
    NgbPagination,
    RouterLink
  ],
  templateUrl: './juguetes-list.html',
  styleUrl: './juguetes-list.css',
})
export class JuguetesList implements OnInit {
  private readonly dataService: DataService = inject(DataService);
  private readonly jugueteCartService: JugueteCartService = inject(JugueteCartService);
  private readonly jugueteSearchService: JugueteSearchService = inject(JugueteSearchService);
  jugueteList: Juguete[] = [];
  apiData!: ApiResponseJuguetesByPage;
  currentPage: number = 1;
  loaded = false;

  ngOnInit() {
    this.loadJuguetes();
    this.loadSearch();
  }

  private loadJuguetes() {
    this.dataService.getJuguetesByPage(this.currentPage).subscribe(
      {
        next: data => {
          this.jugueteList = data.juguetes.juguetes;
          this.apiData = data;
          this.loaded = true;
        },
        error: err => {
          console.error(err);
        }
      }
    )
  }

  protected readonly faEdit = faEdit;
  protected readonly faTrashCan = faTrashCan;

  changePage(event: number) {
    this.currentPage = event;
    this.loadJuguetes();
    this.loadSearch();
  }

  deleteJuguete(juguete: Juguete) {
      this.dataService.deleteJuguete(juguete._id).subscribe(
        {
          next: data => {
            alert(data.message);
            this.loadJuguetes();
          },
          error: err => {
            console.error(err);
          }
        }
      )
    }

  protected readonly faCartShopping = faCartShopping;

  addToCart(juguete: Juguete) {
    this.jugueteCartService.addToCart(juguete);
  }

  buscar(event: any) {
    const text = event.target.value as string;
    console.log(text);
    if (text.trim() === '') {
      this.loadJuguetes();
    }else this.jugueteSearchService.search(text);
  }

  protected readonly faMagnifyingGlass = faMagnifyingGlass;

  private loadSearch() {
    this.jugueteSearchService.start().subscribe(
      {
        next: data => {
          this.jugueteList = data;
        },
        error: err => {
          console.error(err);
        }
      }
    )
  }
}
