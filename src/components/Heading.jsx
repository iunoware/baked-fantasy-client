function Heading(props) {
  return (
    <>
      <span className="flex flex-col space-y-4 items-center">
        {/* <span className="h-px flex-1 bg-gradient-to-r from-transparent to-sbrown"></span> */}

        <span
          className={`px-4 lg:text-5xl lora text-4xl font-bold text-center text-[#2a2a2a]`}
        >
          {props.title}
        </span>
        <div className="flex  justify-center gap-1.5 items-center">
          <div className="w-9 h-[2px] bg-[#870D32] rounded-[2px]" />
          <div className="w-2 h-2 rounded-full bg-[#870D32]" />
          <div className="w-9 h-[2px] bg-[#870D32] rounded-[2px]" />
        </div>

        {/* <span className="h-px flex-1 bg-gradient-to-l from-transparent to-sbrown"></span> */}
      </span>
    </>
  );
}
export default Heading;
