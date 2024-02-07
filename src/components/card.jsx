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
  const [isTop, setIsTop] = useState(false);
  const [{ handlerId, isOver }, drop] = useDrop({
    accept: "TASK",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
      isOver: monitor.isOver(),
    }),
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      setIsHover(true);
      const dragItem = monitor.getItem();
      const dragTargetOffset = monitor.getSourceClientOffset();
      const dragTargetMiddleY = dragTargetOffset.y + dragItem.rect.height / 2;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = hoverBoundingRect.y + hoverBoundingRect.height / 2;

      if (dragTargetMiddleY < hoverMiddleY) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards

      // if (hoverClientY < hoverMiddleY) {
      //   return setIsHover(true);
      // }

      // return setIsHover(false);
    },
  });

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: "TASK",
      item: () => {
        return { task, index, rect: ref.current?.getBoundingClientRect() };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [task.id],
  );

  drag(drop(ref));

  const getOffset = () => {
    if (!isHover) return "";
    if (isTop) return "mt-16";
    return "mb-16";
  };
  return (
    <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div
        role="Handle"
        ref={ref}
        id={task.id}
        data-handler-id={handlerId}
        className={"max-w-96 min-w-80 w-full" + ` ${getOffset()}`}
      >
        <div className="rounded-xl bg-white relative overflow-hidden">
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
            <h1 className="text-base font-bold text-gray-800">{task.title}</h1>
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
  );
};

Card.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    stats: PropTypes.string,
    assignedTo: PropTypes.string,
    progress: PropTypes.number,
  }),
  index: PropTypes.number,
  moveCard: PropTypes.func,
};

export default Card;
