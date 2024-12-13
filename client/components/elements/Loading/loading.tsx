const Loading = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-6 justify-center items-center">
      <div className="container center">
        <div className="rope dark:bg-gray-100 bg-gray-800 center">
          <div className="legs center">
            <div className="boot-l"></div>
            <div className="boot-r"></div>
          </div>
          <div className="costume center">
            <div className="spider">
              <div className="s1 center"></div>
              <div className="s2 center"></div>
              <div className="s3"></div>
              <div className="s4"></div>
            </div>
            <div className="belt center"></div>
            <div className="hand-r"></div>
            <div className="hand-l"></div>
            <div className="neck center"></div>
            <div className="mask center">
              <div className="eye-l"></div>
              <div className="eye-r"></div>
            </div>
            <div className="cover dark:bg-gray-100 bg-gray-800 center"></div>
          </div>
        </div>
      </div>
      <h1 className="absolute top-[1/2] md:top-[60%] text-xl md:text-2xl mt-10 animate-pulse">
        Loading...
      </h1>
    </div>
  );
};
export default Loading;
