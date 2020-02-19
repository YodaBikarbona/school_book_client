import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';
// import {ApplicationRatingRequest, ChangePassword, ClearNewsRequest, EditProfile, User} from '../model';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {ActivationRequest} from '../model';

@Injectable({ providedIn: 'root' })
export class SchoolService {
  constructor(public http: HttpClient) {
  }

  getAllSchoolSubjects() {
    return this.http.get(`${API_URL}/school_book/school_subjects`);
  }

  getAllGrades(childId: number, schoolSubjectId: number) {
    return this.http.get(`${API_URL}/school_book/child/${childId}/school_subject/${schoolSubjectId}/grades`);
  }

  getAllEvents() {
    return this.http.get(`${API_URL}/school_book/parent/events`);
  }

  getAllAbsences(childId: number, schoolSubjectId: number, isJustified: string) {
    return this.http.get(`${API_URL}/school_book/child/${childId}/school_subject/${schoolSubjectId}/isJustified/${isJustified}/absences`);
  }
  getAllAbsencesNumber(childId: number, schoolSubjectId: number) {
    return this.http.get(`${API_URL}/school_book/child/${childId}/school_subject/${schoolSubjectId}/absences`);
  }
}
