export class UserModal{
    firstname: string;
    lastname: string;
    username: string;
    phone: number;
    address: string;
    password: string;
    identityNum: number;
    avatar: string;
    profil: string;
    agence: number;

  // tslint:disable-next-line:max-line-length
  constructor(firstname: string, lastname: string, username: string, phone: number, address: string, password: string, identityNum: number, avatar: string, profil: string, agence: number) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.phone = phone;
    this.address = address;
    this.password = password;
    this.identityNum = identityNum;
    this.avatar = avatar;
    this.profil = profil;
    this.agence = agence;
  }
}
