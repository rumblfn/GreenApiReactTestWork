export interface UserI {
  loggedIn: boolean,
  idInstance: string | null,
  apiTokenInstance: string | null
}

export const InitialUser: UserI = {
  loggedIn: false,
  idInstance: null,
  apiTokenInstance: null,
}