import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../course-service.service';
import { ToolbarService } from '../toolbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm !:FormGroup;
  registrationSuccess : boolean = false;

  constructor(private formBuilder:FormBuilder,
    private courseService:CourseService,
    public toolbarService: ToolbarService,
    private router: Router) { }


  ngOnInit(): void {
    localStorage.clear();
    this.toolbarService.hide();
    this.registerForm = this.formBuilder.group({
      userName: ['',Validators.required],
      userEmail: ['',Validators.required],
      userPassword : ['',Validators.required]
    });
  }

  register(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
      this.courseService.registerUser

      this.courseService.registerUser(this.registerForm.value).subscribe({
         next: (res)=>{
          this.registrationSuccess = true; 
          this.registerForm.reset();
        },
        error:(err)=>{
          console.log(err);
        }
      })
       

      
    }
  }

}
