export class UserReducedData {
  email: string;
  firstName: string | undefined;
  lastName: string | undefined;
  phoneNumber: string | undefined;
  validate: boolean | undefined;
  roleName: string;

  constructor(email: string, firstName: string | undefined, lastName: string | undefined, phoneNumber: string | undefined, validate: boolean | undefined, roleName: string) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.validate = validate;
    this.roleName = roleName;    
  }
}