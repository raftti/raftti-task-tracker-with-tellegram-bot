import api from "@/axios/axiosInstance";
import { statuses } from "@/constants/constants";
import React, { useState, useRef, useEffect } from "react";
import {
  FiTrash2,
  FiStar,
  FiMoreHorizontal,
  FiEdit3,
  FiCheck,
  FiZap,
  FiPause,
} from "react-icons/fi";
import { useQueryClient, useMutation } from "react-query";

interface TaskActionsProps {
  taskId: number;
  isStared: boolean;
  handleEdit: () => void;
}

const TaskActions: React.FC<TaskActionsProps> = ({ taskId, isStared, handleEdit }) => {
  const queryClient = useQueryClient();
  const [localIsStared, setLocalIsStared] = useState(isStared);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const setStared = useMutation({
    mutationFn: (id: number) => api.put("/set_star", { id: taskId }),
    onSuccess: () => {
      setLocalIsStared(true);
      queryClient.invalidateQueries(["tasks"]);
      queryClient.invalidateQueries(["StaredTasks"]);
    },
  });

  const setUnStared = useMutation({
    mutationFn: (id: number) => api.put("/set_un_star", { id: taskId }),
    onSuccess: () => {
      setLocalIsStared(false);
      queryClient.invalidateQueries(["tasks"]);
      queryClient.invalidateQueries(["StaredTasks"]);
    },
  });

  const deleteTask = useMutation({
    mutationFn: (id: number) => api.delete("", { data: { id: taskId } }),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      queryClient.invalidateQueries(["StaredTasks"]);
    },
  });

  const setStatus = useMutation<void, unknown, { id: number; status: string }>(
    ({ id, status }) => api.put("/", { id, status }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tasks"]);
        queryClient.invalidateQueries(["StaredTasks"]);
      },
    }
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <button className="relative" onClick={() => setIsOpen(!isOpen)}>
      <FiMoreHorizontal size={21} />

      {isOpen && (
        <div
          ref={dropdownRef}
          className="m-2 flex flex-col gap-2 absolute right-0 bg-white p-2 rounded-sm z-50"
        >
          <button
            className="flex text-black hover:text-red-400 transition-all duration-300 gap-2 bg-gray-100 p-1 rounded-sm items-center"
            onClick={() => deleteTask.mutate(taskId)}
          >
            <FiTrash2 size={20} />
            <h6>delete</h6>
          </button>
          <button onClick={handleEdit} className="flex gap-2 color-black hover:text-gray-500 transition-all duration-300 bg-gray-100 p-1 rounded-sm items-center">
            <FiEdit3 size={20} />
            <h6>edit</h6>
          </button>

          <button
            onClick={() =>
              setStatus.mutate({ id: taskId, status: statuses.completed })
            }
            className="flex gap-2 color-black hover:text-gray-500 transition-all duration-300 bg-gray-100 p-1 rounded-sm items-center"
          >
            <FiCheck size={20} />
            <h6>{statuses.completed}</h6>
          </button>

          <button
            onClick={() =>
              setStatus.mutate({ id: taskId, status: statuses.inProses })
            }
            className="flex gap-2 color-black hover:text-gray-500 transition-all duration-300 bg-gray-100 p-1 rounded-sm items-center"
          >
            <FiZap size={20} />
            <h6>{statuses.inProses}</h6>
          </button>

          <button
            onClick={() =>
              setStatus.mutate({ id: taskId, status: statuses.awaitsExecution })
            }
            className="flex gap-2 color-black hover:text-gray-500 transition-all duration-300 bg-gray-100 p-1 rounded-sm items-center"
          >
            <FiPause size={20} />
            <h6>{statuses.awaitsExecution}</h6>
          </button>

          <button
            onClick={() =>
              localIsStared
                ? setUnStared.mutate(taskId)
                : setStared.mutate(taskId)
            }
            className="flex gap-2 color-black hover:text-yellow-500 transition-all duration-300 bg-gray-100 p-1 rounded-sm items-center"
          >
            <FiStar size={20} fill={localIsStared ? "yellow" : "none"} />
            <h6>star</h6>
          </button>
        </div>
      )}
    </button>
  );
};

export default TaskActions;
