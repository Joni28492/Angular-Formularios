import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {


  miFormulario:FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPatter)]],
    email: ['', [Validators.required,Validators.pattern(this.validatorService.emailPattern)], [ this.emailValidator]],
    username:  ['', [ Validators.required, this.validatorService.noPuedeSerStrider ]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],

  },{//zona asincrona
    validators: [ this.validatorService.camposIguales('password', 'password2') ]
  })


  // emailErrorMsg:string='';
  get emailErrorMsg():string{
    const errors = this.miFormulario.get('email')?.errors;

    if(errors?.['required']){
      return 'Email es obligatorio';
    } else if (errors?.['pattern']){
      return 'El valor ingresado no tienen formato de correo'
    } else if(errors?.['emailTomado']){
      return 'El email ya fue tomado'
    }

    return ''
  }

  constructor(private fb:FormBuilder, private validatorService:ValidatorService,
              private emailValidator:EmailValidatorService
    ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Joni Fdez',
      email: 'test1@test.com',
      username: 'joni3d',
      password: '123456',
      password2: '123456',
    })
  }

  campoNoValido(campo:string){
    return this.miFormulario.get(campo)?.invalid 
      && this.miFormulario.get(campo)?.touched 
  }





  // emailRequired(){
  //   return this.miFormulario.get('email')?.hasError('required')
  //   && this.miFormulario.get('email')?.touched 
  // }

  // emailFormato(){
  //   return this.miFormulario.get('email')?.hasError('pattern')
  //   && this.miFormulario.get('email')?.touched 
  // }

  // emailTomado(){
  //   return this.miFormulario.get('email')?.hasError('emailTomado')
  //   && this.miFormulario.get('email')?.touched 
  // }

  submitFormulario(){
    console.log(this.miFormulario.value)
    this.miFormulario.markAllAsTouched();
  }

}
