import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from './lms-model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseQueryURL = "http://localhost:8765/lms-course-query";
  private baseCommandURL = "http://localhost:8085/lms-course";
  private baseUserServiceURL = "http://localhost:8086/lms-user";

  constructor(private httpClient : HttpClient) { }

  getAllCoursesForAdmin() : Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${this.baseCommandURL}/getAllCoursesAdmin`);
  }

  addCourse(data : any, userName : string) {
    return this.httpClient.post(`${this.baseCommandURL}/addOrUpdateCourse?loggedInUserName=${userName}`,data,{responseType: 'text'});
  }

  deleteCourse(id : any){
    return this.httpClient.delete(`${this.baseCommandURL}/deleteCourse?courseID=${id}`);
  }

  fetchCourses(param : string){
     return this.httpClient.get<any>(`${this.baseQueryURL}/getCoursesByTechnology?technology=${param}`)
  }

  registerUser(userDetails : any): Observable<string>{
    return this.httpClient.post(`${this.baseUserServiceURL}/register`,userDetails,{responseType: 'text'});
  }

  login(loginCreds : any){
    return this.httpClient.post<any>(`${this.baseUserServiceURL}/login`,loginCreds);
  }

  isAuthenticated(){
      if(localStorage.getItem('loginInfo')){
      return true;
    }
    return false;
  }

  isAdmin(){
    if(localStorage.getItem('loginInfo')){
    let roles: string[] = JSON.parse(localStorage.getItem('loginInfo') || '{}').userRole;
    if(roles.includes('ROLE_ADMIN')){
     return true;
    }
  }
  return false;
}

}
