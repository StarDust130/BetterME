
import MDEditor from "@uiw/react-md-editor";
import React from "react";
const Journal = () => {
   const [value, setValue] = React.useState("**Hello world!!!**");
  return (
    <>
      {" "}
      <div className="container mx-auto h-full" data-color-mode="auto">
        <MDEditor value={value} onChange={(val) => setValue(val || "")} fullscreen />
      </div>
    </>
  );
};
export default Journal;
