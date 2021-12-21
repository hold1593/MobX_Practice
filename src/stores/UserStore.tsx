import { makeAutoObservable } from "mobx";

class User {
  userId;
  name;
  password;

  constructor(userId: any, name: any, password: any){
    this.userId = userId;
    this.name = name;
    this.password = password;
  }
}

export class UserStore {
  rootStore: any;
  userList : any[] = [];

  constructor(rootStore: any) {
    makeAutoObservable(this)

    this.rootStore = rootStore;
    this.userList = [
      new User(1,'Mimi','asd123'),
      new User(2,'Lisa','123456'),
      new User(3,'Tonny','tonyzzang'),
    ]
  }

  loginUser(name: string, password: string) {
    const idx = this.userList.findIndex((x) => x.name === name);
    if(idx !== -1) {
      if(this.userList[idx].password === password){
        return true;
      }else{
        alert('비번틀림');
        return false;
      }
    }else{
      alert('누구냐 넌...');
      return false;
    }
  }
}