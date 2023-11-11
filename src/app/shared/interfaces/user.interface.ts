export interface User {
  id:             number;
  name:           string;
  surname:        string;
  email:          string;
  password:       null | string;
  documentNumber: string;
  role:           number;
  documentType:   number | null;
}
