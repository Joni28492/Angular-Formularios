import { Component,  OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {


  @ViewChild('miFormulario') miFormulario!:NgForm;

  initForm = {
    producto: 'RTX 4080ti',
    precio: 10,
    existencias: 10
  }

  constructor() { }

  ngOnInit(): void {
  }

  nombreValido():boolean{
    // this.miFormulario?.controls['precio']?.setErrors({'precio':true})
    // this.miFormulario?.controls['precio']?.setErrors(null)
    return this.miFormulario?.controls['producto']?.invalid &&
           this.miFormulario?.controls['producto']?.touched
  }


  precioValido():boolean{
    return this.miFormulario?.controls['precio']?.value < 0
    && this.miFormulario?.controls['precio']?.touched 
  }

  // guardar(miFormulario:NgForm){
  guardar(){
    // console.log(this.miFormulario)
    console.log("Posteo Correcto")
    this.miFormulario.resetForm({
      producto:'algo',
      precio:0,
      existencias:0,
    });
   
  }

}
