import { TodoStore } from "./TodoStore";
import { UserStore } from "./UserStore";

export class RootStore{
  todoStore: any;
  userStore: any;
  
  constructor(){
    this.todoStore = new TodoStore(this);
    this.userStore = new UserStore(this);
  }
}