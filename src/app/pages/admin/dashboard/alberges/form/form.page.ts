/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { DonacionService } from "./../../../../services/donacion.service";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

enum Action {
  EDIT = 'EDIT',
  NEW = 'NEW',
}

export class Lugar {
  $key: string;
  entrega: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  actionTODO = Action.NEW;
  lugarfoms: any;
  lugar: any;
  message='';
  id= '';
  constructor(
    private fb: FormBuilder,
    private donacionSvc: DonacionService,
    private router: Router,
    private activedrouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.lugarForm();
    const params = this.activedrouter.snapshot.params;
    if(params.id){
      this.actionTODO = Action.EDIT;
      this.id = params.id;
      this.donacionSvc.getlugar(this.id).subscribe((data) => {
      this.lugar = data;
      this.lugarfoms.patchValue({
        entrega: this.lugar.entrega,
      });
    });
    }else{
      this.actionTODO = Action.NEW;
    }
  }

  lugarForm(): void{
    this.lugarfoms = this.fb.group({
      entrega:  ['',[Validators.required, Validators.minLength(8)]],
    });
  }

  isvalid(field: string): boolean {
    this.getErrorMessage(field);
    return (this.lugarfoms.get(field).invalid && (this.lugarfoms.get(field).dirty || this.lugarfoms.get(field).touched));
  }


  private getErrorMessage(field: string): void {
    const  { errors }   = this.lugarfoms.get(field);
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
      this.donacionSvc.updatelugar(this.id,this.lugarfoms.value)
      .then(() => {
        this.lugarfoms.reset();
        this.id = '';
        this.router.navigate(['/dashboard/alberges']);
      }).catch((err) => {
        console.log(err);
      });
      this.lugarfoms.reset();
      this.lugar = null;
    }else{
      console.log('new');
      this.donacionSvc.createlugar(this.lugarfoms.value)
      .then(() => {
        this.lugarfoms.reset();
        this.router.navigate(['/dashboard/alberges']);
      }).catch((err) => {
        console.log(err);
      });
      this.lugarfoms.reset();
      this.lugar = null;
    }
  }
}
