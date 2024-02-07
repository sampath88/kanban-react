const Chip = ({ text, bg, color }) => {
  return (
    <>
      <div className="flex">
        <span
          className={
            "text-sm  font-semibold px-3 py-1  rounded-3xl" + ` ${bg} ${color}`
          }
        >
          {text}
        </span>
      </div>
    </>
  );
};

export default Chip;
