import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../course-service.service';
import { ToolbarService } from '../toolbar.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {
  isAuthenticated!: boolean;
  
  constructor(private router: Router, public toolbarService : ToolbarService,public courseService : CourseService) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

}