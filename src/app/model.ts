export class AuthenticationRequest {
  email: string;
  password: string;
  code: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class ActivationRequest {
  email: string;
  code: string;

  constructor(email: string, code: string) {
    this.code = code;
    this.email = email;
  }
}

export class NewRole {
  roleName: string;

  constructor(roleName: string) {
    this.roleName = roleName;
  }
}

export class NewUser {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  city: string;
  phone: string;
  is_active: boolean;
  birth_date: string;
  gender_id: number;
  role_id: number;
  parent_mother: number;
  parent_father: number;
  password: string;

  constructor(first_name: string, last_name: string, email: string, address: string, city: string, phone: string, is_active: boolean, birth_date: string, gender_id: number, role_id: number, parent_mother: number, parent_father: number, password: string) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.address = address;
    this.city = city;
    this.phone = phone;
    this.is_active = is_active;
    this.birth_date = birth_date;
    this.gender_id = gender_id;
    this.role_id = role_id;
    this.parent_mother = parent_mother;
    this.parent_father = parent_father;
    this.password = password;
  }
}

export class EditUser {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  city: string;
  phone: string;
  is_active: boolean;
  is_deleted: boolean;
  birth_date: string;
  gender_id: number;
  role_id: number;
  parent_mother: number;
  parent_father: number;

  constructor(first_name: string, last_name: string, email: string, address: string, city: string, phone: string, is_active: boolean, is_deleted: boolean, birth_date: string, gender_id: number, role_id: number, parent_mother: number, parent_father: number) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.address = address;
    this.city = city;
    this.phone = phone;
    this.is_active = is_active;
    this.is_deleted = is_deleted;
    this.birth_date = birth_date;
    this.gender_id = gender_id;
    this.role_id = role_id;
    this.parent_mother = parent_mother;
    this.parent_father = parent_father;
  }
}

export class ActivateOrDeactivateUser {
  is_active: boolean;

  constructor(is_active: boolean) {
    this.is_active = is_active;
  }
}

export class AdminChangeUserPassword {
  password: string;

  constructor(password: string) {
    this.password = password;
  }
}
