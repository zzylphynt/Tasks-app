import html from "./app.html?raw";
import todoStore, { Filters } from "../store/todo.store";
import { renderTodos, renderPending } from "./use-cases";

const ElementIDs = {
  ClearCompleted: ".clear-completed",
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  TodoFilters: ".filter",
  PendingCountLabel: "#pending-count",
};

export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIDs.TodoList, todos);
    updatePendingCount()
  };

  const updatePendingCount = () => {
    renderPending(ElementIDs.PendingCountLabel);
  };

  //*   When App() function is called
  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  //*  HTML REFERENCES

  const newDescInput = document.querySelector(ElementIDs.NewTodoInput);
  const todoListUL = document.querySelector(ElementIDs.TodoList);
  const clearCompletedButton = document.querySelector(
    ElementIDs.ClearCompleted
  );
  const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilters);
  //*  LISTENERS

  newDescInput.addEventListener("keyup", (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;
    todoStore.addTodo(event.target.value);
    displayTodos();
    event.target.value = "";
  });

  todoListUL.addEventListener("click", (event) => {
    const element = event.target.closest("[data-id]");
    todoStore.toggleTodo(element.getAttribute("data-id"));
    displayTodos();
  });

  todoListUL.addEventListener("click", (event) => {
    const isDestroyElem = event.target.className === "destroy";
    const element = event.target.closest("[data-id]");

    if (!element || !isDestroyElem) return;

    todoStore.deleteTodo(element.getAttribute("data-id"));
    displayTodos();
  });

  clearCompletedButton.addEventListener("click", () => {
    todoStore.deleteCompleted();
    displayTodos();
  });

  filtersLIs.forEach((element) => {
    element.addEventListener("click", (element) => {
      filtersLIs.forEach((el) => el.classList.remove("selected"));
      element.target.classList.add("selected");

      switch (element.target.text) {
        case "All":
          todoStore.setFilter(Filters.All);
          break;

        case "Pending":
          todoStore.setFilter(Filters.Pending);
          break;

        case "Completed":
          todoStore.setFilter(Filters.Completed);
          break;
      }

      displayTodos();
    });
  });
};
