import { React, useState } from 'react';

import { TodoData, Filter }from './TodoData';

const TodoList = () => {
  const [text, setText] = useState<string>("");
  const [todoData, setTodoData] = useState<TodoData[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const handleOnSubmit = () => {
    if(!text) return;

    const newTodoData: TodoData = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };
    setTodoData([newTodoData, ...todoData]);
    setText('');
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleOnEdit = (id: number, value: string) => {
    const copyValue: TodoData[] = todoData.map((todo) => ({ ...todo }));
    const newTodoData: TodoData[] = copyValue.map((todo) => {
      if(todo.id === id){
        todo.value = value;
      }
      return todo;
    });
    setTodoData(newTodoData);
  };
  
  const handleOnCheck = (id: number, checked: boolean) => {
    const copyChecked: TodoData[] = todoData.map((todo) => ({ ...todo }));
    const newTodoData: TodoData[] = copyChecked.map((todo) => {
      if(todo.id === id){
        todo.checked = !checked;
      }
      return todo;
    });
    setTodoData(newTodoData);
  };

  const handleOnRemove = (id: number, removed: boolean) => {
    const copyRemoved: TodoData[] = todoData.map((todo) => ({ ...todo }));
    const newTodoData: TodoData[] = copyRemoved.map((todo) => {
      if(todo.id === id){
        todo.removed = !removed;
      }
      return todo;
    });
    setTodoData(newTodoData);
  };

  const todoFiltered = todoData.filter((todo) => {
    switch(filter){
      case 'all':
        return !todo.removed;
      case 'checked':
        return todo.checked && !todo.removed;
      case 'unchecked':
        return !todo.checked && !todo.removed;
      case 'removed':
        return todo.removed;
      default:
        return todo;
    }
  });

  const handleOnCleanAll = () => {
    const newTodoData = todoData.filter((todo) => !todo.removed);
    setTodoData(newTodoData);
  };

  return(
    <div>
      <select 
        defaultValue="all" 
        onChange={(e) => setFilter(e.target.value as Filter)}>
        <option value="all">All</option>
        <option value="checked">Completion</option>
        <option value="unchecked">Remaining</option>
        <option value="removed">Dust</option>
      </select>
      {filter === 'removed' ? (
        <button 
          onClick={handleOnCleanAll}
          disabled={todoData.filter((todo) => todo.removed).length === 0}
        >
          CleanAll in Dust
        </button>
      ) : (
        filter !== 'checked' && (
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
        )
      )}
      <ul>
        {todoFiltered.map((todo) => {
          return(
            <li key={todo.id}>
              <input
                type="checkbox"
                disabled={todo.removed}
                checked={todo.checked}
                onChange={() => handleOnCheck(todo.id, todo.checked)} 
              />
              <input
                type="text"
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={(e) => handleOnEdit(todo.id, e.target.value)}
              />
              <button onClick={() => handleOnRemove(todo.id, todo.removed)}>
                {todo.removed ? 'Revival' : 'Delete'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
