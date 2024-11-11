import Styledform from "./style/Styledform";
import GlobalStyle from "./style/GlobalStyle";
import { useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState({ title: "", content: "", isDone: false });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleTodoSubmit = (e) => {
    e.preventDefault();
    setTodos([...todos, { ...input, id: new Date().getTime(), isDone: false }]);
  };

  const deleteTodo = (todoId) => {
    const deletedTodo = todos.filter((todo) => todo.id !== todoId);
    setTodos(deletedTodo);
  };

  const completeTodo = (todoId) => {
    const doneTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, isDone: true } : todo
    );

    setTodos(doneTodos);
  };

  const cancleDoneTodo = (todoId) => {
    const cancleTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, isDone: false } : todo
    );

    setTodos(cancleTodos);
  };

  return (
    <>
      <GlobalStyle />
      <h1>My Todo List!</h1>
      <Styledform onSubmit={handleTodoSubmit}>
        <div>
          <div>제목</div>
          <input
            name="title"
            type="text"
            value={input.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <div>내용</div>
          <input
            name="content"
            type="text"
            value={input.content}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">등록</button>
      </Styledform>

      <ul>
        {todos
          .filter((todo) => todo.isDone === false)
          .map((todo) => (
            <div key={todo.id}>
              <li>{todo.title}</li>
              <div>{todo.content}</div>
              <button onClick={() => deleteTodo(todo.id)}>삭제</button>
              <button onClick={() => completeTodo(todo.id)}>완료</button>
            </div>
          ))}
      </ul>

      <h3>완료</h3>
      <ul>
        {todos
          .filter((todo) => todo.isDone === true)
          .map((todo) => (
            <div key={todo.id}>
              <li>{todo.title}</li>
              <div>{todo.content}</div>
              <button onClick={() => deleteTodo(todo.id)}>삭제</button>
              <button onClick={() => cancleDoneTodo(todo.id)}>완료 취소</button>
            </div>
          ))}
      </ul>
    </>
  );
};

export default App;
