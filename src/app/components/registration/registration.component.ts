import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';
import { passwordValidator } from 'src/app/shared/password-pattern.directive';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordValidator]],
    confirmPassword: ['', [Validators.required]]
  }, {
    validators: passwordMatchValidator
  })

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private messageService: MessageService,
    private router: Router

    ) {}

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  submitDetails() {
    const userDetails = {...this.registerForm.value}
    delete userDetails.confirmPassword;
    return this.authService.registerUser(userDetails as User).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registered successfully!' });
      this.router.navigate(['login']);
    }, 
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong...' });
      })
  }

}
