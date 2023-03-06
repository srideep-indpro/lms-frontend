import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseService } from '../course-service.service';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent implements OnInit {

  courseForm !:FormGroup;
  actionBtn: String = "Save";

  constructor(private formBuilder:FormBuilder,private courseService: CourseService,
    public dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any
    ) { }

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      name : ['',Validators.required],
      duration : ['',Validators.required],
      description : ['',Validators.required],
      technology : ['',Validators.required],
      launchURL : ['',Validators.required]
    })
    
    if(this.editData){
      this.actionBtn = "Edit"
      this.courseForm.controls['name'].setValue(this.editData.name);
      this.courseForm.controls['duration'].setValue(this.editData.duration);
      this.courseForm.controls['description'].setValue(this.editData.description);
      this.courseForm.controls['technology'].setValue(this.editData.technology);
      this.courseForm.controls['launchURL'].setValue(this.editData.launchURL );
    }
  }

  addCourse(){
    if(this.courseForm.valid){
      this.courseService.addCourse(this.courseForm.value,"ankita").subscribe({
        next: (res)=>{
          
          console.log("Course saved successfully.");
          this.courseForm.reset();
          this.dialogRef.close();
        },
        error:()=>{
          console.log("There is some error saving the course.")
        }
      })
    }
    
  }


}
