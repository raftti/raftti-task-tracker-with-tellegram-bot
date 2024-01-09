"use client";
import { useQuery } from "react-query";
import Task from "@/components/Task";
import AddTask from "@/components/AddTask";
import { useState } from "react";
import TopListActions from "@/components/TopListActions";
import api from "@/axios/axiosInstance";
import LoadingTask from "@/components/LoadingTask";
import clsx from "clsx";

export default function Home() {
  const [isTaskCreating, setIsTaskCreating] = useState(false);
  const [isGridLayout, setIsGridLayout] = useState(false);

  function toggleAddTask() {
    setIsTaskCreating(!isTaskCreating);
  }
  function toggleGrid() {
    setIsGridLayout(!isGridLayout);
  }

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => api.get("all").then((res) => res.data),
  });

  return (
    <main className="p-3 items-center flex flex-col">
      <div className="flex flex-col gap-2">
        <TopListActions
          toggleAddTask={toggleAddTask}
          toggleGrid={toggleGrid}
          isTaskCreating={isTaskCreating}
          isGridLayout={isGridLayout}
        />
        <ul
          className={clsx(
            "bg-blue rounded-md shadow-xl p-14 pt-6 pb-10 flex items-center min-w-[20vw] gap-2 transition-all duration-1000",
            isGridLayout ? "flex-wrap" : "flex-col"
          )}
        >
          {isTaskCreating && <AddTask toggleAddTask={toggleAddTask} />}
          {isLoading &&
            Array(3)
              .fill(<LoadingTask />)
              .map((item) => item)}
          {tasks?.map((item: Task) => (
            <Task
              status={item.status}
              key={item.id}
              taskId={item.id}
              title={item.title}
              description={item.description}
              isStared={item.isStared}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}
