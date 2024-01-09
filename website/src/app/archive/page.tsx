'use client';
import api from '@/axios/axiosInstance';
import AddTask from '@/components/AddTask';
import LoadingTask from '@/components/LoadingTask';
import Task from '@/components/Task';
import TopListActions from '@/components/TopListActions';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

const page = () => {
    const [isTaskCreating, setIsTaskCreating] = useState(false);
    const [isGridLayout, setIsGridLayout] = useState(false);
  
    function toggleAddTask() {
      setIsTaskCreating(!isTaskCreating);
    }
    function toggleGrid() {
      setIsGridLayout(!isGridLayout);
    }


    const { data: tasks, isLoading } = useQuery({
        queryKey: ["StaredTasks"],
        queryFn: () => api.get("all").then((res) => res.data.filter((item: any) => item.isStared === true)),
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
          <ul className="bg-blue rounded-md shadow-xl p-14 pt-6 pb-10 flex flex-col items-center min-w-[20vw] max-w-[600px] gap-2 transition-all duration-1000">
            {isTaskCreating && <AddTask toggleAddTask={toggleAddTask} />}
                {isLoading && Array(3).fill(<LoadingTask/>).map((item) => item)}
            {tasks?.map((item: Task) => (
              <Task
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
};

export default page;