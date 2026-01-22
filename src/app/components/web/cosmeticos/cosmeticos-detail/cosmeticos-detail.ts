import {Component, inject, Input, OnInit} from '@angular/core';
import {CosmeticoService} from '../../../../services/cosmetico-service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';
import {Cosmetico, Toast} from '../../../../common/interfaces';
import {Router} from '@angular/router';
import {NgbToast} from '@ng-bootstrap/ng-bootstrap';
import {FormValidators} from '../../../../validators/FormValidators';

@Component({
  selector: 'app-cosmeticos-detail',
  imports: [
    CurrencyPipe,
    ReactiveFormsModule,
    NgbToast
  ],
  templateUrl: './cosmeticos-detail.html',
  styleUrl: './cosmeticos-detail.css',
})
export class CosmeticosDetail implements OnInit {
  @Input('id') id!: string;
  private readonly cosmeticoService: CosmeticoService = inject(CosmeticoService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly router: Router = inject(Router);
  loaded = false;
  formCosmetico: FormGroup = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(2),
    FormValidators.notOnlyWhiteSpace, FormValidators.forbiddenWord('drug')]],
    image: ['',[Validators.required, Validators.minLength(7),
      FormValidators.notOnlyWhiteSpace, FormValidators.forbiddenWord('drug'),
    FormValidators.allowedExtension(new RegExp(/.jpg|.png/))]],
    type: ['',[Validators.required, Validators.minLength(2),Validators.maxLength(20),
      FormValidators.forbiddenWord('drug'), FormValidators.notOnlyWhiteSpace]],
    brand: ['',[Validators.required, Validators.minLength(2),Validators.maxLength(20),
      FormValidators.forbiddenWord('drug'), FormValidators.notOnlyWhiteSpace]],
    price: [0, [Validators.required, FormValidators.minValue(0)]]
  });
  toast: Toast = {
    text: '',
    className: ''
  };
  show =false;

  // GETTERS
  get name(): any {
    return this.formCosmetico.get('name');
  }

  get image(): any {
    return this.formCosmetico.get('image');
  }

  get type(): any {
    return this.formCosmetico.get('type');
  }

  get brand(): any {
    return this.formCosmetico.get('brand');
  }

  get price(): any {
    return this.formCosmetico.get('price');
  }

  ngOnInit() {
    this.loadCosmetico();
  }

  private loadCosmetico() {
    if (this.id) {
      // EDITANDO

      this.cosmeticoService.getOneCosmetico(this.id).subscribe(
        {
          next: dataAPI => {
            this.formCosmetico.setValue(dataAPI);
            this.loaded = true;
            this.toast.text = 'Cosmético cargado';
            this.toast.className = 'bg-success text-light';
            this.show = true;
            setTimeout(() => {this.show = false},1000)
          },
          error: error => {
            console.error(error);
          }
        }
      )
    } else {
      // NUEVO COSMÉTICO
      this.formCosmetico.reset();
      this.loaded = true;
    }
  }

  onSubmit() {
    if (this.formCosmetico.invalid){
      console.log(this.formCosmetico);
      this.formCosmetico.markAllAsTouched();
      return;
    }
    console.log('Form: ', this.formCosmetico.value);
    if (this.id) {
      const cosmeticoAux: Cosmetico = this.formCosmetico.value as Cosmetico;
      this.cosmeticoService.patchCosmetico(cosmeticoAux).subscribe(
        {
          next: dataAPI => {
            this.toast.text = dataAPI.message;
            this.toast.className = 'bg-success text-light';
            this.show = true;
            setTimeout(() => {this.show = false;
                this.router.navigateByUrl('/cosmeticos/list')
              },1000
            )

          },
          error: error => {
            this.toast.text = error.message;
            this.toast.className = 'bg-danger text-light';
            this.show = true;
          }
        }
      )
    } else {
      this.cosmeticoService.postCosmetico(this.formCosmetico.value).subscribe(
        {
          next: dataAPI => {
            console.log(dataAPI);
              this.toast.text = dataAPI.message;
              this.toast.className = 'bg-success text-light';
              this.show = true;


            setTimeout(() => {this.show = false;
                this.router.navigateByUrl('/cosmeticos/list')
              },1000
            )
          },
          error: error => {
            this.toast.text = error.message;
            this.toast.className = 'bg-success text-light';
            this.show = true;
            console.error(error);
          }
        }
      )
    }
  }
}
