"use client";
import { useState } from "react";


export default function Home() {

  // 入力用のstate
  const [input, setInput] = useState("");
  // リスト用のstate
  const [list, setList] = useState<string[]>([]);

  // 追加ボタン押したとき
  const addItem = () => {
    if (!input.trim()) return; // 空なら無視
    setList([...list, input]); // リストに追加
    setInput("");              // 入力欄クリア
  };

  return (
    <main className="max-w-xl mx-auto p-4">

      {/* 入力フォーム */}
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="例：ドライバー 50球"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-black text-white rounded-lg"
          onClick={addItem}
          // onKeyDown={(e) => e.key === "Enter" && addItem()}
        >

          
          追加
        </button>
      </div>

      {/* リスト表示 */}
      <ul className="list-disc pl-5 space-y-1">
        {list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </main>
  );
}
