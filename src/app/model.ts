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

export class EditRole {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class NewSchoolSubject {
  name: string;
  is_active: boolean;

  constructor(name: string, is_active: boolean) {
    this.name = name;
    this.is_active = is_active;
  }
}

export class EditSchoolSubject {
  name: string;
  is_active: boolean;

  constructor(name: string, is_active: boolean) {
    this.name = name;
    this.is_active = is_active;
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
  birth_date: string;
  gender_id: number;
  role_id: number;
  parent_mother: number;
  parent_father: number;

  constructor(first_name: string, last_name: string, email: string, address: string, city: string, phone: string, is_active: boolean, birth_date: string, gender_id: number, role_id: number, parent_mother: number, parent_father: number) {
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

export class NewSchoolClass {
  name: string;
  school_year: string;
  is_active: boolean;

  constructor(name: string, school_year: string, is_active: boolean) {
    this.name = name;
    this.school_year = school_year;
    this.is_active = is_active;
  }
}

export class EditSchoolClass {
  name: string;
  is_active: boolean;

  constructor(name: string, is_active: boolean) {
    this.name = name;
    this.is_active = is_active;
  }
}

export class AddNewMemberToSchoolClass {
  is_active: boolean;
  role_name: string;
  school_class_id: number;
  user_id: number

  constructor(is_active: boolean, role_name: string, school_class_id: number, user_id: number) {
    this.is_active = is_active;
    this.role_name = role_name;
    this.school_class_id = school_class_id;
    this.user_id = user_id;
  }
}

export class ActivateOrDeactivateMember {
  is_active: boolean;
  role_name: string;

  constructor(is_active: boolean, role_name: string) {
    this.is_active = is_active;
    this.role_name = role_name;
  }
}

export class ActivateOrDeactivateSchoolClassSubject {
  is_active: boolean;

  constructor(is_active: boolean) {
    this.is_active = is_active;
  }
}

export class AddNewSchoolSubjectToSchoolClass {
  is_active: boolean;
  user_id: number;
  school_subject_id: number;
  school_class_id: number;


  constructor(is_active: boolean, user_id: number, school_subject_id: number, school_class_id: number) {
    this.is_active = is_active;
    this.user_id = user_id;
    this.school_subject_id = school_subject_id;
    this.school_class_id = school_class_id;
  }
}
