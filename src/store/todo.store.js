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

//*  All buttons functionality
const initStore = () => {
  console.log(state);
  console.log("initStore");
};

const loadStore = () => {
  throw new Error("Not implemented");
};

const getTodos = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos];

    case Filters.Completed:
      return state.todos.filter((todo) => todo.done);

    case Filters.Pending:
      return state.todos.filter((todo) => !todo.done);

    default:
      throw new Error(`Option ${filter} is not valid`);
  }
};

const addTodo = (description) => {
  if (!description) throw new Error("Description is required");
  state.todos.push(new Todo(description));
};

const toggleTodo = (todoId) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === todoId) {
      todo.done =  !todo.done;
    }
    return todo;
  });
};

const deleteTodo = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoId);
};

const deleteCompleted = () => {
  state.todos = state.todos.filter((todo) => todo.done);
};

const setFilter = (newFilter = Filters.All) => {
  state.filter = newFilter;
};

const getCurrentFilter = () => {
  return state.filter;
};

export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
};
