import {makeAutoObservable} from 'mobx';
// import {action, observable} from 'mobx';
// import {action, makeObservable, observable} from 'mobx';

class Todo {
  id;
  content;
  rate;
  name;

  constructor(id: any, content: any, rate: any, name: string) {
    this.id = id;
    this.content = content;
    this.rate = rate;
    this.name = name;
  }
}

export class TodoStore {
  rootStore: any;

  //변화를 감지할 변수
  // @observable todos: any[] = [];
  todos : any[] = [];
  
  constructor(root: any) {
    // makeObservable(this, {
    //   todos: observable,
    //   addTodo: action,
    //   deleteTodo: action,
    //   changeRate: action,
    // })
    makeAutoObservable(this)
    // console.log(this)
  
    this.rootStore = root;

    // initial state 설정하는곳
    this.todos = []
  }

  // @action
  addTodo(content: string, rate: number, name: string){
    if(this.todos.length === 0) {
      this.todos = [
        new Todo(1, content, 0, name)
      ]
    }else{
      this.todos = [
        ...this.todos,
        new Todo(this.todos[this.todos.length - 1].id+1, content, rate, name),
      ]
    }
  }
  
  // @action 
  deleteTodo(id: number) {
    this.todos = this.todos.filter((x) => x.id !== id);
  }

  // @action 
  changeRate(id: number, rate: number, name: string){
    const idx = this.todos.findIndex((x) => x.id === id);
    const todo = this.todos[idx];

    this.todos = [
      ...this.todos.slice(0, idx),
      new Todo(todo.id, todo.content, rate, name),
      ...this.todos.slice(idx + 1, this.todos.length)
    ]
  }
}