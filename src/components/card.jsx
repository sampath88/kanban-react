import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import Chip from "src/components/chip";
import { useRef, useState } from "react";
import { useDrop } from "react-dnd";

const getProgressColor = (progress) => {
  if (progress >= 75) {
    return { light: "#e3f7d6", dark: "#7bdc3d" };
  }
  if (progress >= 40) {
    return { light: "#fdebd7", dark: "#f6b047" };
  }
  return { light: "#fcdedb", dark: "#f55241" };
};

const Card = ({ task, index, moveCard }) => {
  const ref = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [isTopEnd, setIsTopEnd] = useState(false);
  const [{ handlerId, isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => {
      handleDrop(item);
    },
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
      isOver: monitor.isOver(),
    }),
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragItemId = item.task.id;
      const hoverItemId = task.id;

      if (dragItemId === hoverItemId) {
        return setIsHover(false);
      }

      const dragItem = monitor.getItem();
      const dragTargetOffset = monitor.getSourceClientOffset();
      const dragTargetMiddleY = dragTargetOffset.y + dragItem.rect.height / 2;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = hoverBoundingRect.y + hoverBoundingRect.height / 2;

      const isDropTopEnd = dragTargetMiddleY < hoverMiddleY;

      setIsHover(true);

      if (isDropTopEnd) {
        setIsTopEnd(true);
      } else {
        setIsTopEnd(false);
      }
    },
  });

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: "TASK",
      item: () => {
        return {
          type: "TASK",
          index: index,
          task,
          rect: ref.current?.getBoundingClientRect(),
        };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [task.id],
  );

  drag(drop(ref));

  const isAdjacent = (item) => {
    const isBottomAdjacent =
      isTopEnd && item.index + 1 === index && item.task.status === task.status;
    const isTopAdjacent =
      !isTopEnd && item.index - 1 === index && item.task.status === task.status;
    return isBottomAdjacent || isTopAdjacent;
  };

  const isSameItem = (item) => {
    return item.task.id === task.id;
  };

  const handleDrop = (item) => {
    // if order not changed, then do nothing
    if (isSameItem(item) || isAdjacent(item)) return;
    moveCard({
      source: item.task,
      dest: task,
      include: isTopEnd,
    });
  };

  const getOffset = () => {
    if (!(isOver && isHover)) return "pb-4";
    if (isTopEnd) return "pt-12 pb-4 border-t-4 border-solid border-blue-700";
    return "pb-16 border-b-4 border-solid border-blue-700";
  };
  return (
    <div ref={dragPreview}>
      <div
        role="Handle"
        ref={ref}
        id={task.id}
        data-handler-id={handlerId}
        className={` ${getOffset()}`}
      >
        <div
          className={
            "max-w-96 min-w-80 w-full rounded-xl " +
            ` ${isDragging ? "outline outline-3 outline-blue-600" : ""}`
          }
        >
          <div
            className="rounded-xl bg-white relative overflow-hidden"
            style={{ opacity: isDragging ? 0.4 : 1 }}
          >
            <div className="absolute bottom-0 left-0 right-0 ">
              <div
                className={"absolute h-[4px] "}
                style={{
                  width: `${task.progress}%`,
                  backgroundColor: `${getProgressColor(task.progress)["dark"]}`,
                }}
              ></div>
              <div
                className="h-[4px]"
                style={{
                  backgroundColor: `${getProgressColor(task.progress)["light"]}`,
                }}
              ></div>
            </div>
            <div className="flex flex-col gap-4 p-5">
              <h1 className="text-base font-bold text-gray-800">
                {task.title}
              </h1>
              <div className="flex justify-between items-center">
                {/* <div className="flex">
              <span className="text-sm text-gray-600 font-semibold px-3 py-1 bg-gray-100 rounded-3xl">
                {date}
              </span>
            </div> */}
                <Chip
                  text={task.date}
                  bg={"bg-gray-100"}
                  color={"text-gray-600"}
                />
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    <span className="text-sm text-gray-600 font-semibold">
                      {task.stats}
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 flex items-center justify-center text-sm rounded-full bg-blue-300">
                      <span>{task.assignedTo}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    stats: PropTypes.string,
    status: PropTypes.string,
    assignedTo: PropTypes.string,
    progress: PropTypes.number,
  }),
  index: PropTypes.number.isRequired,
  moveCard: PropTypes.func,
};

export default Card;
