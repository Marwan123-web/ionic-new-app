import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../_models';
@Injectable({
  providedIn: 'root'
})
export class TeacherServiceService {
  userId: any;
  courseId: any;
  addCourseGradeBody: any;
  deleteCourseGradebody: any;
  addCourseGradeId: any;
  deleteCourseGradetypebody: any;
  courseStudentsSheetBody: any;
  courseStudentsGradesBody: any;
  courseGradeType: any;
  addStudentGradeBody: any;
  addStudentGradeId: any;
  getCourseDataBody: any;
  getCourseGradeType: any;
  addCourseTaskBody: any;
  addCourseTaskId: any;
  deleteCourseTaskBody: any;
  deleteCourseTaskId: any;
  addCourseLectureBody: any;
  addCourseLectureId: any;
  addCourseAttendanceBody: any;
  addCourseAttendanceId: any;
  attendMeBody: any;
  attendMeCourseId: any;
  attendMeMyId: any;
  CourseId: any;
  myId: any;
  userProfileBody: any;
  lectureNumber: any;
  updateStudentGradeBody: any;
  studentIdBody: any;
  courseIdBody: any;
  studentIdBodyBody: any;
  gradeType: any;
  addUserCourseBody: any;
  addUserCourseId: any;
  deleteUserCourseBody: any;
  deleteUserCourseId: any;
  url: any = "http://192.168.1.5:3000";
  addCourseMaterialId: any;
  addCourseMaterialBody: any;
  deleteCourseMaterialId: any;
  deleteCourseMaterialBody: any;
  uploadSolutionBody: any;

  constructor(private httpClient: HttpClient) { }
  public getCourseSemesterData(courseCode, semester_time): Observable<any> {
    return this.httpClient.get(`${this.url}/course/semester/${courseCode}/${semester_time}`);
  }
  public myCourses(id): Observable<any> {
    this.userId = id;
    return this.httpClient.get(`${this.url}/my/courses/${this.userId}`);
  }
  public getCourseData(id): Observable<any> {
    this.courseId = id;
    return this.httpClient.get(`${this.url}/course/${this.courseId}`);
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
  public getCourseStudentsGrades(courseCode, gradeType): Observable<any> {
    this.courseStudentsGradesBody = courseCode;
    this.courseGradeType = gradeType;
    return this.httpClient.get(`${this.url}/course/students/grades/${this.courseStudentsGradesBody}/${this.courseGradeType}`);
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

  public addCourseSemesterTask(courseCode, semester_time, type, path, deadLine): Observable<any> {
    this.addCourseTaskBody = { type, path, deadLine };
    this.addCourseTaskId = courseCode;
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`${this.url}/add/course/semester/task/${this.addCourseTaskId}/${semester_time}`, this.addCourseTaskBody, { headers: headers });
  }
  public deleteCourseSemesterTask(courseCode, semester_time, type): Observable<any> {
    this.deleteCourseTaskBody = type;
    this.deleteCourseTaskId = courseCode;
    return this.httpClient.delete(`${this.url}/delete/course/semester/task/${this.deleteCourseTaskId}/${this.deleteCourseTaskBody}/${semester_time}`);
  }
  public addCourseSemesterMaterial(courseCode, semester_time, type, path): Observable<any> {
    this.addCourseMaterialBody = { type, path };
    this.addCourseMaterialId = courseCode;
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`${this.url}/add/course/semester/material/${this.addCourseMaterialId}/${semester_time}`, this.addCourseMaterialBody, { headers: headers });
  }
  public deleteCourseSemesterMaterial(courseCode, semester_time, type): Observable<any> {
    this.deleteCourseMaterialBody = type;
    this.deleteCourseMaterialId = courseCode;
    return this.httpClient.delete(`${this.url}/delete/course/semester/material/${this.deleteCourseMaterialId}/${this.deleteCourseMaterialBody}/${semester_time}`);
  }


  public addCourseSemesterLecture(courseCode, semester_time, lectureNumber, routerAddress): Observable<any> {
    this.addCourseLectureBody = { lectureNumber, routerAddress };
    this.addCourseLectureId = courseCode;
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`${this.url}/add/course/semester/lecture/${this.addCourseLectureId}/${semester_time}`, this.addCourseLectureBody, { headers: headers });
  }

  public addCourseSemesterAttendance(courseId, semester_time, lectureNumber, routerAddress): Observable<any> {
    this.addCourseAttendanceBody = { lectureNumber, routerAddress };
    this.addCourseAttendanceId = courseId;
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`${this.url}/add/course/semester/attendance/${this.addCourseAttendanceId}/${semester_time}`, this.addCourseAttendanceBody, { headers: headers });
  }

  public semesterAttendMe(id, courseId, semester_time, lectureNumber, routerAddress): Observable<any> {
    this.attendMeBody = { lectureNumber, routerAddress };
    this.attendMeCourseId = courseId;
    this.attendMeMyId = id
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`${this.url}/course/semester/attend/me/${this.attendMeMyId}/${this.attendMeCourseId}/${semester_time}`, this.attendMeBody, { headers: headers });
  }


  public getMyCourseSemesterGrades(id, courseCode, semester_time, gradetype): Observable<any> {
    this.CourseId = courseCode;
    this.myId = id;
    this.courseGradeType = gradetype;
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.get(`${this.url}/course/semester/my/grades/${this.myId}/${this.CourseId}/${this.courseGradeType}/${semester_time}`);
  }

  public profile(id): Observable<any> {
    this.userId = id;
    return this.httpClient.get<User>(`${this.url}/profile/${this.userId}`);
  }

  public semesterMyattendancesheet(id, courseCode, semester_time): Observable<any> {
    this.myId = id;
    this.CourseId = courseCode;
    return this.httpClient.get<User>(`${this.url}/course/semester/my/attendance/${this.myId}/${this.CourseId}/${semester_time}`);
  }

  public studentsSemesterAttendancesheet(studentId, courseCode, semester_time, lectureNumber): Observable<any> {
    this.lectureNumber = lectureNumber;
    this.CourseId = courseCode;
    this.studentIdBodyBody = studentId;
    return this.httpClient.get(`${this.url}/course/semester/attendance/sheet/${this.studentIdBodyBody}/${this.CourseId}/${this.lectureNumber}/${semester_time}`);
  }
  public semesterStudentTotalAttendance(studentId, courseCode, semester_time): Observable<any> {
    this.CourseId = courseCode;
    this.studentIdBodyBody = studentId;
    return this.httpClient.get(`${this.url}/course/semester/student/total/attendance/${this.studentIdBodyBody}/${this.CourseId}/${semester_time}`);
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

  public semesterAttendanceReport(courseCode, semester_time): Observable<any> {
    this.CourseId = courseCode;
    return this.httpClient.get(`${this.url}/course/semester/attendance/report/${this.CourseId}/${semester_time}`);
  }

  public semesterGradesReport(courseCode, semester_time): Observable<any> {
    this.CourseId = courseCode;
    return this.httpClient.get(`${this.url}/course/semester/grades-report/${this.CourseId}/${semester_time}`);
  }

  public myCoursesByStatus(id, status): Observable<any> {
    this.userId = id;
    return this.httpClient.get(`${this.url}/my/courses/bystatus/${this.userId}/${status}`);
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
  public getActiveCourses(): Observable<any> {
    return this.httpClient.get(`${this.url}/courses/active`);
  }

  public getRouters(): Observable<any> {
    return this.httpClient.get(`${this.url}/routers`);
  }

  public uploadAssignment(studentId, courseId, semester_time, date, taskType, solutionLink): Observable<any> {
    this.uploadSolutionBody = { date, taskType, solutionLink };
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`${this.url}/upload/course/semester/assignment/solution/${studentId}/${courseId}/${semester_time}`, this.uploadSolutionBody, { headers: headers });
  }
}
