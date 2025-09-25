'use client'
import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlus, 
  faFaceLaughWink,
  faTrash, 
} from "@fortawesome/free-solid-svg-icons";


type TaskItem = {
  inputValue: string;
  id: string;
  done: boolean;
};

const AddTask = () => {

  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<TaskItem[]>([]);

  React.useEffect(() => {
    const saved = localStorage.getItem('items');
    let savedItems;
    if (saved === null) {
    savedItems = [];
  } else {
    savedItems = JSON.parse(saved);
  }
  setItems(savedItems);
  }, []);

  const updateItems = (newItems: TaskItem[]) => {
    setItems(newItems);
    localStorage.setItem('items', JSON.stringify(newItems));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newItem = {
      inputValue: inputValue,
      id: Math.random().toString(36).slice(2, 10),
      done: false,
    };

    updateItems([newItem, ...items]);
    setInputValue("");
  };

  const handleEdit = (id:string, inputValue:string) => {
    const newItems = items.map((item) => {
      if(item.id === id) {
        item.inputValue = inputValue;
      }
      return item;
    });

    updateItems(newItems);
  };

  const handleCheck = (id:string, done:boolean) => {
    const newItems = items.map((item) => {
      if(item.id === id) {
        item.done = !done;
      }
      return item;
    });

    updateItems(newItems);
  };

  const handleDelete = (id:string) => {
    const newItems = items.filter((item) => item.id !== id);
    updateItems(newItems);
  };



  const total = items.length || 1;
  const done = items.filter((it) => it.done).length;
  const percent = Math.round((done / total) * 100);

  return (
    <div>
      <form 
        className="flex gap-2 mb-5"
        onSubmit={handleSubmit}
      >
        <input
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="例：ドライバー 50球"
          type='text'
          value={inputValue}
          onChange={(e) => handleChange(e)}
        />
        <button
          className="button px-4 py-2 text-white rounded-lg"
          type="submit"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </form>

      <div className="rounded-2xl border bg-white p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">今日のメニュー</h2>
          <span className="text-sm text-gray-500">達成: {done}/{total}（{percent}%）</span>
        </div>

        {/* プログレスバー */}
        <div className="w-full h-2 bg-gray-200 rounded-xl overflow-hidden">
          <div
            className="h-full rounded-xl"
            style={{ width: `${percent}%`, background: "linear-gradient(90deg,#3b82f6,#10b981)" }}
          />
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-gray-500">まだメモがありません。上の入力から追加してね。</p>
        ) : (
          <ul className="space-y-2">
            {items.map((items) => (
              <li key={items.id} className="flex justify-between gap-3 border-b last:border-none pb-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={items.done}
                    onChange={() => handleCheck(items.id, items.done)}
                    className="w-5 h-5 mr-3"
                  />
                  <span className="">
                    <input
                      className={items.done === true ? "line-through text-gray-400 w-70" : "w-70"}
                      placeholder="例：ドライバー 50球"
                      type='text'
                      value={items.inputValue}
                      onChange={(e) => handleEdit(items.id, e.target.value)}
                      disabled={items.done === true}
                    />
                  </span>
                </div>
                <button onClick={() =>  handleDelete(items.id)}><FontAwesomeIcon icon={faTrash} /></button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddTask