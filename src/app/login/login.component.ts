import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../course-service.service';
import { ToolbarService } from '../toolbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm !:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private courseService:CourseService,
    public toolbarService: ToolbarService,
    private router: Router) { }

  ngOnInit(): void {
    localStorage.clear();
    this.toolbarService.hide();
    this.loginForm = this.formBuilder.group({
      userName: ['',Validators.required],
      password : ['',Validators.required]
    });
  }

  login(){
    if(this.loginForm.valid){
      this.courseService.login(this.loginForm.value).subscribe({
        next: (res)=>{
          this.loginForm.reset();
          localStorage.setItem("loginInfo",JSON.stringify(res));
          this.toolbarService.show();
          this.router.navigate(['']);
        },
        error:()=>{
        }
      })
    }
    
  }

}
