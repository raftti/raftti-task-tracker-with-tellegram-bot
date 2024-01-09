import api from "@/axios/axiosInstance";
import React, { useState } from "react";
import { FiPlusSquare, FiXSquare, FiGrid, FiAlignCenter } from "react-icons/fi";
import { useMutation, useQueryClient } from "react-query";

const TopListActions: React.FC<{
  toggleAddTask: () => void;
  toggleGrid: () => void;
  isTaskCreating: boolean;
  isGridLayout: boolean;
}> = ({ toggleAddTask, toggleGrid, isTaskCreating, isGridLayout }) => {
    const queryClient = useQueryClient()
    
    const createTask = useMutation({
        mutationFn: (title: string, description?: string) => api.post('/', { title, description }),
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks'])
        }
    })

  return (
    <div className="px-3 flex justify-between gap-2">
      {isTaskCreating ? (
        <button onClick={toggleAddTask} title="Cancel add task">
          <FiXSquare size={22} color={"red"} />
        </button>
      ) : (
        <button
          onClick={toggleAddTask}
          className="hover:text-gray-500 transition-all duration-300"
          title="Add task"
        >
          <FiPlusSquare size={22} />
        </button>
      )}
      {isGridLayout ? (
        <button
          onClick={toggleGrid}
          className="hover:text-gray-500 transition-all duration-300"
          title="Change layout"
        >
          <FiAlignCenter size={22} />
        </button>
      ) : (
        <button
          onClick={toggleGrid}
          className="hover:text-gray-500 transition-all duration-300"
          title="Change layout"
        >
          <FiGrid size={22} />
        </button>
      )}
    </div>
  );
};

export default TopListActions;
