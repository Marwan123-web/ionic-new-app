import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course } from '../_models/course';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private currentCourseSubject: BehaviorSubject<Course>;
  public currentCourse: Observable<Course>;

  courseId: any;
  constructor(private http: HttpClient) {
    this.currentCourseSubject = new BehaviorSubject<Course>(JSON.parse(localStorage.getItem('currentCourse')));
    this.currentCourse = this.currentCourseSubject.asObservable();
  }
  url: any = "http://192.168.1.6:3000";

  public get currentCourseValue(): Course {
    return this.currentCourseSubject.value;
  }

  getCourse(courseCode: string) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    this.courseId = courseCode;
    return this.http.get<any>(`${this.url}/course/${this.courseId}`, { headers: headers })
      .pipe(map(course => {
        // login successful if there's a jwt token in the response
        if (course) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentCourse', JSON.stringify(course.course));
          this.currentCourseSubject.next(course.course);
        }

        return course.course;
      }));
  }

  closeCourse() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentCourse');
    this.currentCourseSubject.next(null);
  }
}
