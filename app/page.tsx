"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [todos, setTodos] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchTodos() {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setText("");
    setLoading(false);
    fetchTodos();
  }

  return (
    <div className="container py-5">
      <h1 className="mb-3">Todo App</h1>
      <form className="mb-4 d-flex gap-2" onSubmit={handleAdd}>
        <input
          className="form-control"
          type="text"
          placeholder="Add a todo..."
          value={text}
          onChange={e => setText(e.target.value)}
          disabled={loading}
        />
        <button className="btn btn-primary" type="submit" disabled={loading || !text.trim()}>
          Add
        </button>
      </form>
      <ul className="list-group">
        {todos.map(todo => (
          <li key={todo._id} className="list-group-item d-flex align-items-center">
            <span>{todo.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
