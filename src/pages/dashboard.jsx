import Chip from "src/components/chip";
import { useEffect, useState } from "react";
import Tasks from "src/components/tasks";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const pendingTasks = tasks.filter((task) => task.status === "PENDING");
  const inProgress = tasks.filter((task) => task.status === "PROGRESS");
  const completedTasks = tasks.filter((task) => task.status === "COMPLETED");

  useEffect(() => {
    fetch("/constants/data.json")
      .then((res) => res.json())
      .then((data) => setTasks(() => [...data]));
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
                  {pendingTasks.length ? <Tasks tasks={pendingTasks} /> : null}
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
                  {inProgress.length ? <Tasks tasks={inProgress} /> : null}
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
                    <Tasks tasks={completedTasks} />
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
