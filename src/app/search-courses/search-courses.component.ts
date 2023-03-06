import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../course-service.service';
import { ToolbarService } from '../toolbar.service';

@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.scss']
})
export class SearchCoursesComponent implements OnInit {
  dataSource : any;
  loading : boolean = false;
  searchCourseForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,private courseService: CourseService,public toolbarService:ToolbarService) { }

  ngOnInit(): void {
    this.toolbarService.show();
    this.searchCourseForm = this.formBuilder.group({
      searchParam : ['',Validators.required],
    })
  }

  submitSearch(){
    this.courseService.fetchCourses(this.searchCourseForm.value.searchParam).subscribe(data=>{
      this.loading = true;
      this.dataSource = data
      this.loading = false;
    })
  }

}
