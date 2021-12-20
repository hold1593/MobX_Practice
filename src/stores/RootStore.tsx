import { TodoStore } from "./TodoStore";

export class RootStore{
  todoStore: any;
  
  constructor(){
    this.todoStore = new TodoStore(this);
  }
}