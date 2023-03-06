import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCourseListComponent } from './admin-course-list/admin-course-list.component';
import { AuthGuard } from './auth-guard.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SearchCoursesComponent } from './search-courses/search-courses.component';

const routes: Routes = [
  {path:'', redirectTo:'courses',pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'profile', component: ProfileComponent},
  {path:'courses', component: SearchCoursesComponent,canActivate:[AuthGuard]},
  {path:'courses-admin', component: AdminCourseListComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
