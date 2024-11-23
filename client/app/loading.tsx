const Loading = () => {
  return (
    <div className="flex justify-center items-center gap-2 w-full h-screen flex-col">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="text-sm md:text-2xl mt-3 animate-pulse">Loading...</div>
    </div>
  );
};
export default Loading;
