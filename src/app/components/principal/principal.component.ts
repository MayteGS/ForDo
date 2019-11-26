import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForDoService } from '../../services/for-do.service';
import { contentThing, Thing } from '../../interfaces/thing.interfaces';
import { log } from 'util';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: []
})
export class PrincipalComponent implements OnInit {

  public Formulario:FormGroup

  public Things:contentThing[];

  constructor(private _forDoServices:ForDoService) {
    this.ShowThings();
  }

  ngOnInit() {
    this.crearFormulario()
  }

  private crearFormulario(){
    this.Formulario = new FormGroup({
      things: new FormControl(null,[Validators.required,Validators.minLength(5)])
    })
  }

  public ObtenerThings(){
    this._forDoServices.PostThing(this.Formulario.value).subscribe(
      (data)=>{
        console.log(data);
        
      }
    )
  }

  public ShowThings(){
    this._forDoServices.getThings().subscribe(
      (data:Thing)=> this.Things=data.Things     
    )
  }

  public CambiarStatus(thing){
    thing.complete=!thing.complete;
    console.log(thing.complete);
  }

}
