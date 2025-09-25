"use client";
import { useState } from "react";

import AddTask from "./components/AddTask";

export default function Home() {

  return (
    <main className="min-h-screen max-w-xl mx-auto p-5">
      <AddTask />
    </main>
  );
}
