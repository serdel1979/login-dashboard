import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthResponse } from '../../interfaces/interfaces';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent  {


  private usr!: AuthResponse;

  miFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) { }

 
  login(){
     const {email, password} = this.miFormulario.value;

     this.authService.login(email,password)
     .subscribe((ok)=>{
        if(ok===true){
           this.router.navigateByUrl('/dashboard');
        }else{
           Swal.fire({
             title: ok,
             icon: 'error',
           })
        }
     })

  }

}
