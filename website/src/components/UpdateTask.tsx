import api from "@/axios/axiosInstance";
import React, { useEffect, useState } from "react";
import { FiXSquare } from "react-icons/fi";
import { useQueryClient, useMutation } from "react-query";

interface UpdateTaskProps {
  taskId: number;
  title: string;
  description?: string;
  handleEdit: () => void;
}

const UpdateTask: React.FC<UpdateTaskProps> = ({
  taskId,
  title,
  description,
  handleEdit,
}) => {
  const queryClient = useQueryClient();
  const [localTitle, setLocalTitle] = useState("");
  const [localDescription, setLocalDescription] = useState("");

  const updateTask = useMutation({
    mutationFn: ({
      title,
      description,
    }: {
      title: string;
      description?: string;
    }) => api.put("/update_task", { id: taskId, title, description }),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      queryClient.invalidateQueries(["staredTasks"]);
      handleEdit()
    },
  });

  useEffect(() => {
    setLocalTitle(title);
    setLocalDescription(description ?? "");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTask.mutate({ title: localTitle, description: localDescription });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        required
        type="text"
        className="rounded-md p-2 border border-gray-300 w-full"
        value={localTitle}
        onChange={(e) => setLocalTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        className="w-full rounded-md p-2 border border-gray-300"
        value={localDescription}
        onChange={(e) => setLocalDescription(e.target.value)}
        placeholder="Description"
      ></textarea>
      <div className="flex justify-between">
        <button
          type="submit"
          className="max-w-[5vw] bg-white rounded-md p-2 hover:bg-gray-200 transition-all duration-300"
        >
          Add
        </button>
        <button onClick={handleEdit}>
            <FiXSquare size={22} color={"red"} />
        </button>
      </div>
    </form>
  );
};

export default UpdateTask;
