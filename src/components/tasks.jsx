import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
import Card from "src/components/card";
import { useCallback } from "react";

const Tasks = ({ tasks, colStatus }) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: "TASK",
      canDrop: (item) => {
        return item.type === "TASK";
      },
      drop: (item, monitor) => {
        if (monitor.didDrop()) return;
        console.log("dropped at end: ", item);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [tasks],
  );

  const moveCard = useCallback(({ item, dest }) => {
    console.log("dropped in middle");
    // console.log("colStatus: ", colStatus);
    // console.log("source: ", item);
    // console.log("dest: ", dest);
  }, []);

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
            "flex flex-col p-1 pb-32 rounded-md" +
            ` ${canDrop ? "bg-gray-100 outline-dashed outline-2 outline-gray-400" : ""}` +
            ` ${canDrop && isOver ? " bg-blue-100 outline-blue-400" : ""}`
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
};

export default Tasks;
