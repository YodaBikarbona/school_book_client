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
