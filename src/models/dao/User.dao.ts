export interface UserDao {
  id: number | undefined;
  email: string;
  password: string;
  firstName: string | undefined;
  lastName: string | undefined;
  phoneNumber: string | undefined;
  validate: boolean | undefined;
  roleId: number | undefined;
}