import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
import Card from "src/components/card";
import { useCallback } from "react";

const Tasks = ({ tasks, colStatus, updateTask, updateTaskWithOrder }) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: "TASK",
      canDrop: (item) => {
        return item.type === "TASK";
      },
      drop: (item, monitor) => {
        if (monitor.didDrop() || item.task.status === colStatus) return;
        updateTask(item.task, colStatus);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [tasks],
  );

  const moveCard = useCallback(({ source, dest, include }) => {
    updateTaskWithOrder({ sourceId: source._id, destId: dest._id, include });
  }, []);

  const getHighlight = () => {
    if (canDrop && isOver) {
      return "bg-blue-100 outline-dashed outline-2 outline-blue-400";
    }
    if (canDrop) {
      return "bg-gray-100 outline-dashed outline-2 outline-gray-400";
    }
    return "";
  };

  const renderCard = useCallback(({ task, index }) => {
    return <Card key={task.id} task={task} index={index} moveCard={moveCard} />;
  }, []);

  return (
    <div>
      <div className="">
        <div
          ref={drop}
          role={"tasks"}
          className={
            "flex flex-col p-1 pb-32 rounded-md" + ` ${getHighlight()}`
          }
        >
          {tasks.map((task, index) => renderCard({ task, index }))}
        </div>
      </div>
    </div>
  );
};

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  colStatus: PropTypes.string.isRequired,
  updateTask: PropTypes.func.isRequired,
  updateTaskWithOrder: PropTypes.func.isRequired,
};

export default Tasks;
