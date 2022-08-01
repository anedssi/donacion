/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { DonacionService } from "./../../../../services/donacion.service";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

enum Action {
  EDIT = 'EDIT',
  NEW = 'NEW',
}

export class TipoDonacion {
  $key: string;
  tipo: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  actionTODO = Action.NEW;
  tipodonacionfoms: any;
  tipodonacion: any;
  message='';
  id= '';
  constructor(
    private fb: FormBuilder,
    private donacionSvc: DonacionService,
    private router: Router,
    private activedrouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.tipodonacionForm();
    const params = this.activedrouter.snapshot.params;
    if(params.id){
      this.actionTODO = Action.EDIT;
      this.id = params.id;
      this.donacionSvc.getdonaciontipo(this.id).subscribe((data) => {
      this.tipodonacion = data;
      this.tipodonacionfoms.patchValue({
        tipo: this.tipodonacion.tipo,
      });
    });
    }else{
      this.actionTODO = Action.NEW;
    }
  }

  tipodonacionForm(): void{
    this.tipodonacionfoms = this.fb.group({
      tipo:  ['',[Validators.required, Validators.minLength(8)]],
    });
  }

  isvalid(field: string): boolean {
    this.getErrorMessage(field);
    return (this.tipodonacionfoms.get(field).invalid && (this.tipodonacionfoms.get(field).dirty || this.tipodonacionfoms.get(field).touched));
  }


  private getErrorMessage(field: string): void {
    const  { errors }   = this.tipodonacionfoms.get(field);
      if (errors) {
        const messages: any = {
          required: 'el campo es requerido',
          minlength: `el valor ingesado es menor a 4 carateres`,
        };
      const errorkey = Object.keys(errors).find(Boolean);
      this.message = messages[errorkey|| ''];
      }
  }

  save(): void{
    if(this.actionTODO === Action.EDIT){
      this.donacionSvc.updatetipo(this.id,this.tipodonacionfoms.value)
      .then(() => {
        this.tipodonacionfoms.reset();
        this.id = '';
        this.router.navigate(['/dashboard/tipodonacion']);
      }).catch((err) => {
        console.log(err);
      });
      this.tipodonacionfoms.reset();
      this.tipodonacion = null;
    }else{
      console.log('new');
      this.donacionSvc.createtipo(this.tipodonacionfoms.value)
      .then(() => {
        this.tipodonacionfoms.reset();
        this.router.navigate(['/dashboard/tipodonacion']);
      }).catch((err) => {
        console.log(err);
      });
      this.tipodonacionfoms.reset();
      this.tipodonacion = null;
    }
  }

}
