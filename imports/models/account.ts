export interface Account {
  _id?: string;
  Email: string;
  Username?: string;
  Name?: string;
  HashPassword?: string;
  SaltPassword?: string;
}