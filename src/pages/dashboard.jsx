import Chip from "src/components/chip";
import Tasks from "src/components/tasks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTasks, updateTaskStatus, updateTasks } from "src/store/tasksSlice";

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
    <div className="w-full h-full overflow-auto p-5 pb-20">
      <div className="flex justify-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kanban Dashboard</h1>
          <div className="my-5">
            <div className="flex gap-8">
              <div className="">
                <div className="flex flex-col gap-5">
                  <div>
                    <Chip
                      text={"Pending"}
                      bg={"bg-[#f76154]"}
                      color={"text-gray-100"}
                    />
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
              <div className="">
                <div className="flex flex-col gap-5">
                  <div>
                    <Chip
                      text={"In progress"}
                      bg={"bg-[#f6b354]"}
                      color={"text-gray-100"}
                    />
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
              <div className="">
                <div className="flex flex-col gap-5">
                  <div>
                    <Chip
                      text={"Done"}
                      bg={"bg-[#81de4a]"}
                      color={"text-gray-100"}
                    />
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
