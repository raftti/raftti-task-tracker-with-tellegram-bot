import api from "@/axios/axiosInstance";
import clsx from "clsx";
import React, { useState } from "react";
import { statuses } from "@/constants/constants";
import TaskActions from "./TaskActions";
import UpdateTask from "./UpdateTask";

interface ListItemProps {
  key: number;
  taskId: number;
  title: string;
  description?: string;
  isStared: boolean;
  status: string;
}

const Task: React.FC<ListItemProps> = ({
  key,
  taskId,
  title,
  description,
  isStared,
  status,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit() {
    setIsEditing(!isEditing);
  }

  return (
    <li
      className={clsx(
        "shadow-md min-w-[15vw] max-w-[30vw] rounded-sm",
        statuses.inProses === status ? "bg-[#F9F7C9]" : "bg-milk",
        {
          "opacity-65": status === statuses.completed,
        }
      )}
      key={key}
    >
      <h5 className="p-1 py-0 mx-2 mt-1">{status}</h5>
      <div className=" m-2 flex items-center gap-2">
        {isEditing ? (
          <UpdateTask taskId={taskId} title={title} description={description} handleEdit={handleEdit}/>
        ) : (
          <>
            <h4 className="flex-1 p-1 bg-blue font-mono">{title}</h4>
            <TaskActions
              taskId={taskId}
              isStared={isStared}
              handleEdit={handleEdit}
            />
          </>
        )}
      </div>
      {description && !isEditing &&(
        <h5 className="p-1 m-2 bg-deepBlue font-bold">{description}</h5>
      )}
    </li>
  );
};

export default Task;
