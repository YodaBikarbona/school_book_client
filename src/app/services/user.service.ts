import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../app.constants';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {ActivateOrDeactivateUser, ActivationRequest, AdminChangeUserPassword, EditUser, NewUser} from '../model';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(public http: HttpClient) {
  }

  activateUser(email: string, code: string) {
    const request = new ActivationRequest(email, code);
    return this.http.patch(`${API_URL}/school_book/users/user/activate`, request);
  }

  getChildrenByParentId() {
    return this.http.get(`${API_URL}/school_book/parent/children`);
  }

  getAllUsers(limit: number, offset: number, isActive: number, isDeleted: number, roleId: number, genderId: number, birthDate: string, search: string) {
    return this.http.get(`${API_URL}/school_book/users?limit=${limit}&offset=${offset}&is_active=${isActive}&is_deleted=${isDeleted}&roleId=${roleId}&genderId=${genderId}&birthDate=${birthDate}&search=${search}`);
  }

  addNewUser(first_name: string, last_name: string, email: string, address: string, city: string, phone: string, is_active: boolean, birth_date: string, genderId: number, roleId: number, parent_mother: number, parent_father: number, password: string) {
    const request = new NewUser(first_name, last_name, email, address, city, phone, is_active, birth_date, genderId, roleId, parent_mother, parent_father, password);
    return this.http.post(`${API_URL}/school_book/admin/users/add`, request);
  }

  editUser(id: number, first_name: string, last_name: string, email: string, address: string, city: string, phone: string, is_active: boolean, is_deleted: boolean, birth_date: string, genderId: number, roleId: number, parent_mother: number, parent_father: number) {
    const request = new EditUser(first_name, last_name, email, address, city, phone, is_active, is_deleted, birth_date, genderId, roleId, parent_mother, parent_father);
    return this.http.post(`${API_URL}/school_book/admin/users/user/${id}/edit`, request);
  }

  deleteUser(id: number) {
    return this.http.delete(`${API_URL}/school_book/users/user/${id}/delete`);
  }

  activateUserByUserId(id: number, is_active: boolean) {
    const request = new ActivateOrDeactivateUser(is_active);
    return this.http.patch(`${API_URL}/school_book/users/user/${id}/activate`, request);
  }

  deactivateUserByUserId(id: number, is_active: boolean) {
    const request = new ActivateOrDeactivateUser(is_active);
    return this.http.patch(`${API_URL}/school_book/users/user/${id}/deactivate`, request);
  }

  adminChangeUserPassword(id: number, password: string) {
    const request = new AdminChangeUserPassword(password);
    return this.http.patch(`${API_URL}/school_book/admin/users/user/${id}/change_password`, request);
  }
}
