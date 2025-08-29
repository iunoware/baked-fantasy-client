function Heading(props) {
  return (
    <>
      <span className="flex items-center">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-300"></span>

        <span className={`px-4 lg:text-5xl text-4xl font-bold text-center`}>
          {props.title}
        </span>

        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-300"></span>
      </span>
    </>
  );
}
export default Heading;
