import PropTypes from "prop-types";
import Card from "src/components/card";

const Tasks = ({ tasks }) => {
  console.log(tasks);
  return (
    <div>
      <div className="">
        <div className="flex flex-col gap-4">
          {tasks.map((task, index) => {
            return (
              <Card
                key={index}
                title={task.title}
                date={task.date}
                stats={task.stats}
                profilePic={task.assignedTo}
                progress={task.progress}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default Tasks;
