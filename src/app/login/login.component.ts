import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  authenticationFailed = false;

  constructor(
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.buildForm();
    this.listenFormChanges();
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      username: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)])
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(5)])
      ]
    });
  }

  private listenFormChanges() {
    this.loginForm.valueChanges.subscribe(() => {
      this.authenticationFailed = false;
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.authService
      .authenticate(this.loginForm.getRawValue())
      .subscribe((authenticated: boolean) => {
        if (authenticated) {
          this.router.navigate(['dashboard']);
        } else {
          this.authenticationFailed = true;
        }
      });
  }
}
