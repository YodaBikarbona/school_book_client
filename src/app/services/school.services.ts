import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../app.constants';
// import {ApplicationRatingRequest, ChangePassword, ClearNewsRequest, EditProfile, User} from '../model';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {
  ActivateOrDeactivateMember, ActivateOrDeactivateSchoolClassSubject,
  ActivationRequest,
  AddNewMemberToSchoolClass, AddNewSchoolSubjectToSchoolClass,
  EditRole,
  EditSchoolClass,
  EditSchoolSubject,
  NewRole,
  NewSchoolClass,
  NewSchoolSubject
} from '../model';

@Injectable({providedIn: 'root'})
export class SchoolService {
  constructor(public http: HttpClient) {
  }

  getAllSchoolSubjects(limit: number, offset: number) {
    return this.http.get(`${API_URL}/school_book/school_subjects?limit=${limit}&offset=${offset}`);
  }

  addNewSchoolSubjects(schoolSubjectName: string, isActive: boolean) {
    const request = new NewSchoolSubject(schoolSubjectName, isActive);
    return this.http.post(`${API_URL}/school_book/admin/school_subjects/add`, request);
  }

  editSchoolSubject(id: number, schoolSubjectName: string, isActive: boolean) {
    const request = new EditSchoolSubject(schoolSubjectName, isActive);
    return this.http.put(`${API_URL}/school_book/admin/school_subjects/school_subject/${id}/edit`, request);
  }

  deleteSchoolSubject(schoolSubjectId: number) {
    return this.http.delete(`${API_URL}/school_book/admin/school_subjects/school_subject/${schoolSubjectId}/delete`);
  }

  deleteSchoolClass(schoolClassId: number) {
    return this.http.delete(`${API_URL}/school_book/admin/school_classes/school_class/${schoolClassId}/delete`);
  }

  addNewSchoolClass(schoolClassName: string, schoolYear: string, isActive: boolean) {
    const request = new NewSchoolClass(schoolClassName, schoolYear, isActive);
    return this.http.post(`${API_URL}/school_book/admin/school_classes/add`, request);
  }

  editSchoolClass(schoolClassId: number, schoolClassName: string, isActive: boolean) {
    const request = new EditSchoolClass(schoolClassName, isActive);
    return this.http.put(`${API_URL}/school_book/admin/school_classes/school_class/${schoolClassId}/edit`, request);
  }

  getAllSchoolClasses(limit: number, offset: number) {
    return this.http.get(`${API_URL}/school_book/school_classes?limit=${limit}&offset=${offset}`);
  }

  getAllSchoolClassMembers(schoolClassId: number, limit: number, offset: number) {
    return this.http.get(`${API_URL}/school_book/school_classes/school_class/${schoolClassId}/members?limit=${limit}&offset=${offset}`);
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

  getAllRoles(limit: number, offset: number) {
    return this.http.get(`${API_URL}/school_book/admin/roles?limit=${limit}&offset=${offset}`);
  }

  deleteRole(roleId: number) {
    return this.http.delete(`${API_URL}/school_book/admin/roles/role/${roleId}/delete`);
  }

  addNewRole(roleName: string) {
    const request = new NewRole(roleName);
    return this.http.post(`${API_URL}/school_book/admin/roles/new`, request);
  }

  editRole(id: number, roleName: string) {
    const request = new EditRole(roleName);
    return this.http.patch(`${API_URL}/school_book/admin/roles/role/${id}/edit`, request);
  }

  getAllGenders() {
    return this.http.get(`${API_URL}/school_book/admin/genders`);
  }

  addNewMemberToSchoolClass(isActive: boolean, roleName: string, schoolClassId: number, userId: number) {
    const request = new AddNewMemberToSchoolClass(isActive, roleName, schoolClassId, userId);
    return this.http.post(`${API_URL}/school_book/admin/school_classes/school_class/members/add`, request);
  }

  activateOrDeactivateMember(memberId: number, isActive: boolean, roleName: string) {
    const request = new ActivateOrDeactivateMember(isActive, roleName);
    return this.http.patch(`${API_URL}/school_book/admin/school_classes/school_class/members/member/${memberId}/activate_or_deactivate`, request);
  }

  deleteMember(memberId: number, roleName: string) {
    return this.http.delete(`${API_URL}/school_book/admin/school_classes/school_class/role_name/${roleName}/members/member/${memberId}/delete`);
  }

  getAllSchoolClassSubjects(schoolClassId: number, limit: number, offset: number) {
    return this.http.get(`${API_URL}/school_book/school_classes/school_class/${schoolClassId}/school_subjects?limit=${limit}&offset=${offset}`);
  }

  deleteSchoolClassSubject(schoolClassSubjectId: number) {
    return this.http.delete(`${API_URL}/school_book/admin/school_class_subjects/school_class_subject/${schoolClassSubjectId}/delete`);
  }

  activateOrDeactivateSchoolClassSubject(schoolClassSubjectId: number, isActive: boolean) {
    const request = new ActivateOrDeactivateSchoolClassSubject(isActive);
    return this.http.patch(`${API_URL}/school_book/admin/school_class_subjects/school_class_subject/${schoolClassSubjectId}/activate_or_deactivate`, request);
  }

  addNewSchoolSubjectToSchoolClass(isActive: boolean, userId: number, schoolSubjectId: number, schoolClassId: number) {
    const request = new AddNewSchoolSubjectToSchoolClass(isActive, userId, schoolSubjectId, schoolClassId);
    return this.http.post(`${API_URL}/school_book/admin/school_class_subjects/school_class_subject/add`, request);
  }
}
