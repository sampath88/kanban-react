import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
import Card from "src/components/card";
import { useCallback } from "react";

const Tasks = ({ tasks }) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: "TASK",
      canDrop: () => {
        return true;
      },
      drop: (item) => {
        console.log("item: ", item);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [tasks],
  );

  const getActiveColor = () => {
    if (!canDrop) return "bg-transparent";
    if (!isOver) return "bg-yellow-100";
    return "bg-green-300";
  };

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    console.log("moveCard: ", dragIndex, hoverIndex);
  }, []);

  const renderCard = useCallback(({ task, index }) => {
    return <Card key={index} task={task} index={index} moveCard={moveCard} />;
  }, []);
  return (
    <div>
      <div className="">
        <div
          ref={drop}
          role={"tasks"}
          className={"flex flex-col gap-4 " + ` ${getActiveColor()}`}
        >
          {tasks.map((task, index) => renderCard({ task, index }))}
        </div>
      </div>
    </div>
  );
};

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default Tasks;
