import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public sending: Boolean = false;
  public error: string | null = null;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['',Validators.required],
      pass: ['',[Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  submit(){
    const value = this.form.value;
    this.sending = true;
    this.authService.login(value.name,value.pass).then(result=>{
      this.router.navigate(['/']);
    },error=>{
      this.sending = false;
      this.error = error.message;
    })

  }

  signup(){
    const value = this.form.value;
    this.sending = true;
    this.authService.signup(value.name,value.pass).then(result=>{
      this.sending = false;
    },error=>{
      this.sending = false;
      this.error = error.message;
    })
  }

}
