"use client";
import { useState } from "react";


export default function Home() {

  // 入力用のstate
  const [input, setInput] = useState("");
  // リスト用のstate
  type Item = { id: string; text: string; done: boolean };
  const [list, setList] = useState<Item[]>([]);

  // 追加ボタン押したとき
  const add = () => {
    const v = input.trim();
    if (!v) return;
    setList((prev) => [
      ...prev,
      { id: Math.random().toString(36).slice(2, 10), text: v, done: false },
    ]);
    setInput("");
  };

  const toggle = (id: string) => {
    setList((prev) =>
      prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it))
    );
  };

  const total = list.length || 1;
  const done = list.filter((it) => it.done).length;
  const percent = Math.round((done / total) * 100);

  return (
    // <main className="max-w-xl mx-auto p-4">
    <main className="min-h-screen bg-gray-50 max-w-xl mx-auto p-4">

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
          onClick={add}
        >
          追加
        </button>
      </div>

    

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

        {list.length === 0 ? (
          <p className="text-sm text-gray-500">まだメモがありません。上の入力から追加してね。</p>
        ) : (
          <ul className="space-y-2">
            {list.map((it) => (
              <li key={it.id} className="flex items-center gap-3 border-b last:border-none pb-2">
                <input
                  type="checkbox"
                  checked={it.done}
                  onChange={() => toggle(it.id)}
                  className="w-5 h-5"
                />
                <span className={it.done ? "line-through text-gray-400" : ""}>
                  {it.text}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
