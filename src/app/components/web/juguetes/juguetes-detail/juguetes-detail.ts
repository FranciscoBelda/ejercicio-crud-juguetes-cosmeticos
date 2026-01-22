import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DataService} from '../../../../services/data-service';
import {CurrencyPipe} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faTrashCan} from '@fortawesome/free-regular-svg-icons/faTrashCan';
import {faEdit} from '@fortawesome/free-regular-svg-icons/faEdit';
import {Router} from '@angular/router';
import {FormValidators} from '../../../../validators/FormValidators';

@Component({
  selector: 'app-juguetes-detail',
  imports: [
    CurrencyPipe,
    FaIconComponent,
    ReactiveFormsModule
  ],
  templateUrl: './juguetes-detail.html',
  styleUrl: './juguetes-detail.css',
})
export class JuguetesDetail implements OnInit {
  @Input('id') idJuguete!: string;
  private readonly dataService: DataService = inject(DataService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  formJuguete: FormGroup = this.formBuilder.group({
    _id: [''],
    nombre: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(50),
      FormValidators.notOnlyWhiteSpace, FormValidators.forbiddenWord('sex')]],
    imagen: ['',[Validators.required, Validators.minLength(7),
      FormValidators.notOnlyWhiteSpace, FormValidators.forbiddenWord('sex')]],
    categoria: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),
      FormValidators.notOnlyWhiteSpace, FormValidators.forbiddenWord('sex')]],
    edadMinima: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    precio: [0, [Validators.required, Validators.min(0)]],
  });
  loaded: boolean = false;

  private router: Router = inject(Router);
  // GETTERS
  get nombre(): any{
    return this.formJuguete.get('nombre');
  }
  get categoria(): any{
    return this.formJuguete.get('categoria');
  }
  get edadMinima(): any{
    return this.formJuguete.get('edadMinima');
  }
  get precio(): any{
    return this.formJuguete.get('precio');
  }
  get imagen(): any{
    return this.formJuguete.get('imagen');
  }

  ngOnInit() {
    this.loadJuguete();
  }

  private loadJuguete() {
    if (this.idJuguete) {
      // EDITANDO JUGUETE
      this.dataService.getOneJuguete(this.idJuguete).subscribe(
        {
          next: data => {
            this.formJuguete.setValue(data);
            console.log(this.formJuguete);
            this.loaded= true;
          },
          error: error => {
            console.error(error);
          }
        }
      )
    }else {
      // CREANDO JUGUETE
      this.formJuguete.reset();
      this.loaded= true;
    }
  }

  protected readonly faTrashCan = faTrashCan;
  protected readonly faEdit = faEdit;

  onSubmit() {
    if (this.formJuguete.invalid) {
      this.formJuguete.markAllAsTouched();
      return;
    }
    if (this.idJuguete){
      // PUT
      this.dataService.putJuguete(this.formJuguete.value).subscribe(
        {
          next: data => {
            alert(data.message);
            this.router.navigateByUrl('/juguetes/list');
          },
          error: error => {
            console.error(error);
          }
        }
      )
    }else {
      // POST
      this.dataService.postJuguete(this.formJuguete.value).subscribe(
        {
          next: data => {
            alert(data.message);
            this.router.navigateByUrl('/juguetes/list');
          },
          error: error => {
            console.error(error);
          }
        }
      )
    }
  }
}
