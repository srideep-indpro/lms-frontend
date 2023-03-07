import { Component, OnInit,ViewChild } from '@angular/core';
import { Course } from '../lms-model';
import { CourseService } from '../course-service.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';

@Component({
  selector: 'app-admin-course-list',
  templateUrl: './admin-course-list.component.html',
  styleUrls: ['./admin-course-list.component.scss']
})
export class AdminCourseListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'duration', 'description', 'technology', 'launchURL','actions'];
  dataSource !: MatTableDataSource<Course>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private courseService: CourseService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCourses();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(CourseDialogComponent,{
      height: '80%',
      width: '60%'
    })
    dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }

  getCourses(){
    this.courseService.getAllCoursesForAdmin().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  edit(rowData:any){
    this.dialog.open(CourseDialogComponent,{
      height: '80%',
      width: '60%',
      data: rowData
    })
  }

  onDelete(rowData: any){
    this.courseService.deleteCourse(rowData.id).subscribe(data=>{
      window.alert(data);
    })
  }

}
