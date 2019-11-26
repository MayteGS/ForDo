import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForDoService } from '../../services/for-do.service';
import { contentThing, Thing } from '../../interfaces/thing.interfaces';
import Swal from 'sweetalert2';


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

    const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
    })

  this._forDoServices.PostThing(this.Formulario.value).subscribe(
  (data:any)=>{

    Toast.fire({
      icon: 'success',
      title: 'Guardado Correctamente'
    })

    this.Formulario.reset();
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
    
    this._forDoServices.putThing(thing).subscribe(
      (data)=>{
        error=>{console.log(error.statusText)}  
      }
    );
  }

  public EliminarTarea(thingId){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this._forDoServices.deleteThing(thingId).subscribe(
          ()=>{
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        });
        
      }
    })

  }

}
