import {action, makeObservable, observable} from 'mobx';

class Todo {
  id;
  content;
  rate;

  constructor(id: any, content: any, rate: any) {
    this.id = id;
    this.content = content;
    this.rate = rate;
  }
}

export class TodoStore {
  rootStore: any;

  //변화를 감지할 변수
  // @observable todos: any[] = [];
  todos : any[] = [];
  
  constructor(root: any) {
    makeObservable(this, {
      todos: observable,
      addTodo: action,
      deleteTodo: action,
      changeRate: action,
    })
  

    this.rootStore = root;

    // initial state 설정하는곳
    this.todos = [
      new Todo(1, '운동하기', 0),
      new Todo(2, '영화보기', 0),
      new Todo(3, '책읽기', 0),
    ]
  }

  // @action
  addTodo(content: string, rate: number){
    if(this.todos.length === 0) {
      this.todos = [
        new Todo(1, content, 0)
      ]
    }else{
      this.todos = [
        ...this.todos,
        new Todo(this.todos[this.todos.length - 1].id+1, content, rate),
      ]
    }
  }
  
  // @action 
  deleteTodo(id: number) {
    this.todos = this.todos.filter((x) => x.id !== id);
  }

  // @action 
  changeRate(id: number, rate: number){
    const idx = this.todos.findIndex((x) => x.id === id);
    const todo = this.todos[idx];

    this.todos = [
      ...this.todos.slice(0, idx),
      new Todo(todo.id, todo.content, rate),
      ...this.todos.slice(idx + 1, this.todos.length)
    ]
  }
}