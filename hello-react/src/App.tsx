import { useState } from "react";
import TaskCard from "./TaskCard";
import './TaskCard.css'
import React from "react";
function App() {
  return (
    <>
      <h1 className="texl-2xl font-bold my-4"> Smarter Task</h1>
      <h2></h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="TaskItem">
          <h1 className="text-xl font-bold my-2">pending</h1>
          <TaskCard title="Build your website with Static content" dueDate="10th April" assigneeName = "Rohit S"/>
          <TaskCard title="Add a blog" dueDate="22nd March" assigneeName="Rohit M" />
          <h3 className="bg-gray-200 text-black rounded">+ New Task</h3>
        </div>
        <div className="TaskItem radius-5 h-full">
        <h1 className="text-xl font-bold my-2">done</h1>
        <TaskCard title="Basic html5" completedAtDate="10th April" assigneeName = "Rohit M"/>
        <TaskCard title="Nodejs basic" completedAtDate="20th April" assigneeName = "Ajay S"/>
        </div>
      </div>
    </>
  );
}
export default App;
