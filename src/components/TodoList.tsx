import { React, useState } from 'react';

import TodoData from './TodoData';

const TodoList = () => {
  const [text, setText] = useState<string>("");
  const [todoData, setTodoData] = useState<TodoData[]>([]);

  const handleOnSubmit = () => {
    if(!text) return;

    const newTodoData: TodoData = {
      value: text,
      id: new Date().getTime(),
      checked: false,
    };
    setTodoData([newTodoData, ...todoData]);
    setText('');
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleOnEdit = (id: number, value: string) => {
    const copyValue = todoData.map((todo) => ({ ...todoData }));
    const newTodoData = copyValue.map((todo) => {
      if(todo.id === id){
        todo.value = value;
      }
      return todo;
    });
    setTodoData(newTodoData);
  };
  
  const handleOnCheck = (id: number, checked: boolean) => {
    const copyChecked = todoData.map((todo) => ({ ...todoData }));
    const newTodoData = copyChecked.map((todo) => {
      if(todo.id === id){
        todo.checked = !checked;
      }
      return todo;
    });
    setTodoData(newTodoData);
  };

  return(
    <div>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => handleOnChange(e)}
        />
        <input
          type="submit"
          value="add"
          onSubmit={handleOnSubmit}
        />
      </form>
      <ul>
        {todoData.map((todo) => {
          return(
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleOnCheck(todo.id, todo.checked)} 
              />
              <input
                type="text"
                value={todo.value}
                onChange={(e) => handleOnEdit(todo.id, e.target.value)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
