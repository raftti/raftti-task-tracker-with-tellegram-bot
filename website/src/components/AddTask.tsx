import React, { useState } from "react";
import api from "@/axios/axiosInstance";
import { useMutation, useQueryClient } from "react-query";

const AddTask: React.FC<{ toggleAddTask: Function }> = ({ toggleAddTask }) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createTask = useMutation({
    mutationFn: ({title, description}: {title: string, description?: string}) =>
      api.post("/", { title, description }),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);

      setTitle("");
      setDescription("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTask.mutate({title, description});
  };

  return (
    <div className="bg-lightGray rounded-md p-2 w-full max-w-[20vw]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          required
          type="text"
          className="rounded-md p-2 border border-gray-300"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          name=""
          id=""
          className="w-full rounded-md p-2 border border-gray-300"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        ></textarea>
        <button
          type="submit"
          className="max-w-[5vw] bg-white rounded-md p-2 hover:bg-gray-200 transition-all duration-300"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTask;
