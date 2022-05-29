import { React, useState } from 'react';

import TodoData from './TodoData';
import Edit from './Edit';

const TextState = () => {
  const [text, setText] = useState("");
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
      <Edit todoData={todoData} />
    </div>
  );
}

export default TextState;
