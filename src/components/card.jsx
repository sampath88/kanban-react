import Chip from "src/components/chip";

const getProgressColor = (progress) => {
  if (progress >= 75) {
    return { light: "#e3f7d6", dark: "#7bdc3d" };
  }
  if (progress >= 40) {
    return { light: "#fdebd7", dark: "#f6b047" };
  }
  return { light: "#fcdedb", dark: "#f55241" };
};

const Card = ({ title, date, stats, profilePic, progress }) => {
  return (
    <div className="max-w-96 min-w-80 w-full">
      <div className="rounded-xl bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 ">
          <div
            className={"absolute h-[4px] "}
            style={{
              width: `${progress}%`,
              backgroundColor: `${getProgressColor(progress)["dark"]}`,
            }}
          ></div>
          <div
            className="h-[4px]"
            style={{
              backgroundColor: `${getProgressColor(progress)["light"]}`,
            }}
          ></div>
        </div>
        <div className="flex flex-col gap-4 p-5">
          <h1 className="text-base font-bold text-gray-800">{title}</h1>
          <div className="flex justify-between items-center">
            {/* <div className="flex">
              <span className="text-sm text-gray-600 font-semibold px-3 py-1 bg-gray-100 rounded-3xl">
                {date}
              </span>
            </div> */}
            <Chip text={date} bg={"bg-gray-100"} color={"text-gray-600"} />
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <span className="text-sm text-gray-600 font-semibold">
                  {stats}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 flex items-center justify-center text-sm rounded-full bg-blue-300">
                  <span>{profilePic}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
