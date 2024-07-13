import { Todo } from "../todos/models/todo.model";

const Filters = {
  All: "all",
  Completed: "Complited",
  Pending: "Pending",
};

const state = {
  todos: [
    new Todo("piedra del alma"),
    new Todo("piedra del infinito"),
    new Todo("piedra del tiempo"),
  ],
  filter: Filters.All,
};


const initStore = ( ) => {
    console.log(state)
    console.log('initStore')
}


export default{
    initStore,
}