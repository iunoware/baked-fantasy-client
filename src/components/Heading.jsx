function Heading(props) {
  return (
    <>
      <span className="flex items-center">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-sbrown"></span>

        <span
          className={`px-4 lg:text-5xl lora text-4xl font-bold text-center text-[#2a2a2a]`}
        >
          {props.title}
        </span>

        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-sbrown"></span>
      </span>
    </>
  );
}
export default Heading;
