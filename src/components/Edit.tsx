import { useState } from 'react';

import TodoData from './TodoData';


const Edit = (props: TodoData[]) => {
  const [ todoData, setTodoData ] = useState(props.todoData);
  const handleOnEdit = (id: number, value: string) => {
    const deepCopy = props.todoData.map((todo) => ({ ...todo }));
    const newTodoData = deepCopy.map((todo) => {
      if(todo.id === id){
        todo.value = value;
      }
      return todo;
    });
    setTodoData(newTodoData);
  }
  return(
    <div>
      <ul>
        {props.todoData.map((todo) => {
          return(
            <li key={todo.id}>
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

export default Edit;
