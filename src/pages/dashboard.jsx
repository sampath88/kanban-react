import Chip from "src/components/chip";
import Tasks from "src/components/tasks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTasks, updateTaskStatus } from "src/store/tasksSlice";

const api = import.meta.env.VITE_API;
const Dashboard = () => {
  const { tasks } = useSelector((state) => state.tasksState);

  const dispatch = useDispatch();

  const pendingTasks = tasks
    .filter((task) => task.status === "PENDING")
    .sort((a, b) => a.order - b.order);
  const inProgress = tasks
    .filter((task) => task.status === "PROGRESS")
    .sort((a, b) => a.order - b.order);
  const completedTasks = tasks
    .filter((task) => task.status === "COMPLETED")
    .sort((a, b) => a.order - b.order);

  const updateTask = async (task, status) => {
    dispatch(updateTaskStatus({ updatedTask: { ...task, status } }));
    fetch(api + "/task", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sourceId: task._id, status }),
    }).then((res) => {
      if (res.ok) {
        getTasks();
      } else {
        console.error("something went wrong");
      }
    });
  };

  const updateTaskWithOrder = async ({ sourceId, destId, include }) => {
    fetch(api + "/task/order", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sourceId, destId, include }),
    }).then((res) => {
      if (res.ok) {
        getTasks();
      } else {
        console.error("something went wrong");
      }
    });
  };

  const getTasks = async () => {
    const tasks = await fetch(api + "/task").then((res) => res.json());
    dispatch(setTasks({ tasks }));
  };
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div className="w-full h-full overflow-auto px-5 py-10 pb-20">
      <div className="flex justify-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-10">
            Kanban Dashboard
          </h1>
          <div className="my-5">
            <div className="flex gap-8">
              <div className="min-w-80">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <Chip
                      text={"Pending"}
                      bg={"bg-[#f76154]"}
                      color={"text-gray-100"}
                    />
                    <div>
                      <div className="text-xs leading-none font-bold text-gray-700 px-2 mx-2 min-w-7 min-h-7 flex items-center justify-center rounded-full bg-[#ffe1de] border-2 border-solid border-[#e2574a]">
                        {pendingTasks.length}
                      </div>
                    </div>
                  </div>
                  {pendingTasks.length ? (
                    <Tasks
                      tasks={pendingTasks}
                      colStatus={"PENDING"}
                      updateTask={updateTask}
                      updateTaskWithOrder={updateTaskWithOrder}
                    />
                  ) : null}
                </div>
              </div>
              <div className="min-w-80">
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <Chip
                      text={"In progress"}
                      bg={"bg-[#f6b354]"}
                      color={"text-gray-100"}
                    />
                    <div>
                      <div className="text-xs leading-none font-bold text-gray-700 px-2 mx-2 min-w-7 min-h-7 flex items-center justify-center rounded-full bg-[#ffefd8] border-2 border-solid border-[#d69b48]">
                        {inProgress.length}
                      </div>
                    </div>
                  </div>
                  {inProgress.length ? (
                    <Tasks
                      tasks={inProgress}
                      colStatus={"PROGRESS"}
                      updateTask={updateTask}
                      updateTaskWithOrder={updateTaskWithOrder}
                    />
                  ) : null}
                </div>
              </div>
              <div className="min-w-80">
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <Chip
                      text={"Done"}
                      bg={"bg-[#81de4a]"}
                      color={"text-gray-100"}
                    />
                    <div>
                      <div className="text-xs leading-none font-bold text-gray-700 px-2 mx-2 min-w-7 min-h-7 flex items-center justify-center rounded-full bg-[#e1ffd0] border-2 border-solid border-[#76cf43]">
                        {completedTasks.length}
                      </div>
                    </div>
                  </div>
                  {completedTasks.length ? (
                    <Tasks
                      tasks={completedTasks}
                      colStatus={"COMPLETED"}
                      updateTask={updateTask}
                      updateTaskWithOrder={updateTaskWithOrder}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
