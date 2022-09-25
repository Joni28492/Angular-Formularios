import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, Validator } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent  {

  


  miFormulario:FormGroup = this.fb.group({
    nombre: [ '', [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array([
      ['Metal Gear', Validators.required],
      ['DeathStrnading', Validators.required]
    ], Validators.required )
  })


  nuevoFavorito:FormControl = this.fb.control('', Validators.required);




  constructor(private fb:FormBuilder) { }

  get favoritosArr(){
    return this.miFormulario.get('favoritos') as FormArray;
  }


  agregarFavorito(){
    if(this.nuevoFavorito.invalid) return;

    // ((this.miFormulario.controls['favoritos']) as FormArray).push() //NOOO!!!
  
    // this.favoritosArr.push( new FormControl( this.nuevoFavorito.value ) ) //SII
    this.favoritosArr.push( this.fb.control(this.nuevoFavorito.value, Validators.required) )

    this.nuevoFavorito.reset()

  }

  guardar(){
    if(this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();  
      return;
    }
    console.log(this.miFormulario.value);
  }

  campoEsValido(campo: string){
    return this.miFormulario.controls[campo].errors && 
           this.miFormulario.controls[campo].touched
  }

  borrar(i:number){
    //  this.favoritosArr.controls.splice(i, 1)
    this.favoritosArr.removeAt(i);
  }

}
