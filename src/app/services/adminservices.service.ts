import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class AdminservicesService {
  addUserBody: any;
  updateuserbody: any;
  deleteuserbody: any;
  addCourseBody: any;
  updateCourseBody: any;
  coursesDepartmentbody: any;
  userProfileBody: any;
  userRolebody: any;
  deleteCoursebody: any;
  userCoursesBody: any;
  addUserCourseBody: any;
  addUserCourseId: any;
  deleteUserCourseBody: any;
  deleteUserCourseId: any;
  getCourseDataBody: any;
  addCourseGradeBody: any;
  addCourseGradeId: any;
  deleteCourseGradebody: any;
  deleteCourseGradetypebody: any;
  courseStudentsSheetBody: any;
  courseStudentsGradesBody: any;
  addStudentGradeBody: any;
  addStudentGradeId: any;
  courseGradeType: any;
  getStudentGradeCourseCode: any;
  getStudentGradeGradeType: any;
  getCourseGradeType: any;
  userId: any;
  updateStudentGradeBody: any;
  updateuserIdbody: any;
  updateCourseIdBody: any;
  studentIdBody: any;
  courseIdBody: any;
  lectureNumber: any;
  CourseId: any;
  studentIdBodyBody: any;
  gradeType: any;
  addCourseSemesterBody: any;
  myId: any;
  addRouterBody: any;
  updateRouterIdBody: any;
  updateRouterBody: any;
  deleterouterbody: any;
  url: any = "http://192.168.1.6:3000";
  addPostBody: any;
  deletepostbody: any;

  constructor(private httpClient: HttpClient) { }

  public profile(id): Observable<any> {
    this.userId = id;
    return this.httpClient.get<User>(`${this.url}/profile/${this.userId}`);
  }

  public getUsers(): Observable<any> {
    return this.httpClient.get<User[]>(`${this.url}/users`);
  }
  public getUsersByRole(role): Observable<any> {
    this.userRolebody = role;
    return this.httpClient.get<User[]>(`${this.url}/users/${this.userRolebody}`);
  }

  public addUser(_id, name, email, password, role, dataOfJoin): Observable<any> {
    this.addUserBody = { _id, name, email, password, role, dataOfJoin }
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`${this.url}/add/user`, this.addUserBody, { headers: headers });
  }

  public updateUser(_id, name, email, password, role): Observable<any> {
    this.updateuserIdbody = _id;
    this.updateuserbody = { name, email, password, role }
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.put(`${this.url}/update/user/${this.updateuserIdbody}`, this.updateuserbody, { headers: headers });
  }

  public deleteUser(_id): Observable<any> {
    this.deleteuserbody = _id;
    return this.httpClient.delete(`${this.url}/delete/user/${this.deleteuserbody}`);
  }

  public changeEmail(_id, email): Observable<any> {
    this.updateuserIdbody = _id;
    this.updateuserbody = { email }
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.put(`${this.url}/update/user/${this.updateuserIdbody}`, this.updateuserbody, { headers: headers });
  }

  public changePassword(_id, password): Observable<any> {
    this.updateuserIdbody = _id;
    this.updateuserbody = { password }
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.put(`${this.url}/update/user/${this.updateuserIdbody}`, this.updateuserbody, { headers: headers });
  }

  public getUserprofiledata(id): Observable<any> {
    this.userProfileBody = id;
    return this.httpClient.get(`${this.url}/user/${this.userProfileBody}/profile`);
  }

  public getUserCoursesdata(id): Observable<any> {
    this.userCoursesBody = id;
    return this.httpClient.get(`${this.url}/user/${this.userCoursesBody}/courses`);
  }

  public addUserCourse(id, courseCode, sender): Observable<any> {
    this.addUserCourseBody = { courseCode };
    this.addUserCourseId = id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`${this.url}/add/user/course/${this.addUserCourseId}/${sender}`, this.addUserCourseBody, { headers: headers });
  }

  public deleteUserCourse(id, courseCode): Observable<any> {
    this.deleteUserCourseBody = courseCode;
    this.deleteUserCourseId = id;
    return this.httpClient.delete(`${this.url}/delete/user/course/${this.deleteUserCourseId}/${this.deleteUserCourseBody}`);
  }
  // ---------------------------------------------


  public getCourses(): Observable<any> {
    return this.httpClient.get(`${this.url}/courses`);
  }
  public getActiveCourses(): Observable<any> {
    return this.httpClient.get(`${this.url}/courses/active`);
  }
  public getCourseData(courseCode): Observable<any> {
    this.getCourseDataBody = courseCode
    return this.httpClient.get(`${this.url}/course/${this.getCourseDataBody}`);
  }


  public getDepartmentCourses(courseDepartment): Observable<any> {
    this.coursesDepartmentbody = courseDepartment;
    return this.httpClient.get(`${this.url}/courses/${this.coursesDepartmentbody}`);
  }


  public addCourse(courseCode, courseName, courseDepartment, creaditHours, prerequisite): Observable<any> {
    this.addCourseBody = { courseCode, courseName, courseDepartment, creaditHours, prerequisite }
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`${this.url}/add/course`, this.addCourseBody, { headers: headers });
  }
  public addCourseSemester(courseCode, semester_time): Observable<any> {
    this.addCourseSemesterBody = { semester_time }
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`${this.url}/add/course/semester/${courseCode}`, this.addCourseSemesterBody, { headers: headers });

  }
  public getCourseSemesterData(courseCode, semester_time): Observable<any> {
    return this.httpClient.get(`${this.url}/course/semester/${courseCode}/${semester_time}`);
  }


  public updateCourse(courseCode, courseName, courseDepartment, creaditHours, prerequisite): Observable<any> {
    this.updateCourseIdBody = courseCode;
    this.updateCourseBody = { courseName, courseDepartment, creaditHours, prerequisite }
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.put(`${this.url}/update/course/${this.updateCourseIdBody}`, this.updateCourseBody, { headers: headers });
  }

  public deleteCourse(courseCode): Observable<any> {
    this.deleteCoursebody = courseCode;
    return this.httpClient.delete(`${this.url}/delete/course/${this.deleteCoursebody}`);
  }



  public addCourseSemesterGrade(courseCode, semester_time, type, grade): Observable<any> {
    this.addCourseGradeBody = { type, grade };
    this.addCourseGradeId = courseCode;
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`${this.url}/add/course/semester/grade/${this.addCourseGradeId}/${semester_time}`, this.addCourseGradeBody, { headers: headers });
  }
  public deleteCourseSemesterGrade(courseCode, semester_time, type): Observable<any> {
    this.deleteCourseGradebody = courseCode;
    this.deleteCourseGradetypebody = type;
    return this.httpClient.delete(`${this.url}/delete/course/semester/grade/${this.deleteCourseGradebody}/${semester_time}/${this.deleteCourseGradetypebody}`);
  }

  public getCourseSemesterStudentsSheet(courseCode, semester_time): Observable<any> {
    // this.courseStudentsSheetBody = courseCode;
    return this.httpClient.get(`${this.url}/course/semester/students/${courseCode}/${semester_time}`);
  }

  public addSemesterStudentGrade(courseCode, studentId, semester_time, gradeType, score): Observable<any> {
    this.addStudentGradeBody = { studentId, gradeType, score };
    this.addStudentGradeId = courseCode;
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`${this.url}/add/course/semester/student/grade/${this.addStudentGradeId}/${semester_time}`, this.addStudentGradeBody, { headers: headers });
  }
  public updateSemesterStudentGrade(courseId, studentId, semester_time, gradeType, score): Observable<any> {
    this.updateStudentGradeBody = { gradeType, score };
    this.studentIdBody = studentId;
    this.courseIdBody = courseId
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.put(`${this.url}/update/course/semester/student/grade/${this.studentIdBody}/${this.courseIdBody}/${semester_time}`, this.updateStudentGradeBody, { headers: headers });
  }


  public semesterStudentsGradesheet(studentId, courseCode, semester_time, gradeType): Observable<any> {
    this.gradeType = gradeType;
    this.CourseId = courseCode;
    this.studentIdBodyBody = studentId;
    return this.httpClient.get(`${this.url}/course/semester/grade/sheet/${this.studentIdBodyBody}/${this.CourseId}/${this.gradeType}/${semester_time}`);
  }
  public semesterStudentTotalGrades(studentId, courseCode, semester_time): Observable<any> {
    this.CourseId = courseCode;
    this.studentIdBodyBody = studentId;
    return this.httpClient.get(`${this.url}/course/semester/student/total/grade/${this.studentIdBodyBody}/${this.CourseId}/${semester_time}`);
  }
  public totalCourseSemesterGrades(courseCode, semester_time): Observable<any> {
    this.CourseId = courseCode;
    return this.httpClient.get(`${this.url}/course/semester/total/grades/${this.CourseId}/${semester_time}`);
  }


  public myCourses(id): Observable<any> {
    this.userId = id;
    return this.httpClient.get(`${this.url}/my/courses/${this.userId}`);
  }
  public myCoursesByStatus(id, status): Observable<any> {
    this.userId = id;
    return this.httpClient.get(`${this.url}/my/courses/bystatus/${this.userId}/${status}`);
  }
  public getMyCourseSemesterGrades(id, courseCode, semester_time, gradetype): Observable<any> {
    this.CourseId = courseCode;
    this.myId = id;
    this.courseGradeType = gradetype;
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.get(`${this.url}/course/semester/my/grades/${this.myId}/${this.CourseId}/${this.courseGradeType}/${semester_time}`);
  }

  public changeCourseAttendanceStatus(courseCode, status): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.put(`${this.url}/change/course/attendance/status/${courseCode}/${status}`, { headers: headers });
  }

  public changeCourseStatus(courseCode, status): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.put(`${this.url}/change/course/status/${courseCode}/${status}`, { headers: headers });
  }

  public decideStudentsPassOrFail(courseCode): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.put(`${this.url}/change/student/course/status/${courseCode}`, { headers: headers });
  }
  public calculatMyCreditHours(id): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.put(`${this.url}/calculate/my/credit/hours/${id}`, { headers: headers });
  }

  public getRouters(): Observable<any> {
    return this.httpClient.get(`${this.url}/routers`);
  }
  public addRouter(locationId, locationName, routerAddress): Observable<any> {
    this.addRouterBody = { locationId, locationName, routerAddress }
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`${this.url}/add/router`, this.addRouterBody, { headers: headers });
  }
  public updateRouter(locationId, locationName, routerAddress): Observable<any> {
    this.updateRouterIdBody = locationId;
    this.updateRouterBody = { locationName, routerAddress }
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.put(`${this.url}/update/router/${this.updateRouterIdBody}`, this.updateRouterBody, { headers: headers });
  }

  public deleteRouter(locationId): Observable<any> {
    this.deleterouterbody = locationId;
    return this.httpClient.delete(`${this.url}/delete/router/${this.deleterouterbody}`);
  }

  public addPost(author_id, author_name, body, date): Observable<any> {
    this.addPostBody = { author_id, author_name, body, date }
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`${this.url}/add/post`, this.addPostBody, { headers: headers });
  }
  public getPosts(): Observable<any> {
    return this.httpClient.get(`${this.url}/posts`);
  }
  public getmyPosts(id): Observable<any> {
    return this.httpClient.get(`${this.url}/my/posts/${id}`);
  }
  public deletePost(postId): Observable<any> {
    this.deletepostbody = postId;
    return this.httpClient.delete(`${this.url}/delete/post/${this.deletepostbody}`);
  }
}
