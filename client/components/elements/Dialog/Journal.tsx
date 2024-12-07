
import { Button } from "@/components/ui/button";
import MDEditor from "@uiw/react-md-editor";
import React from "react";
const Journal = () => {
   const [value, setValue] = React.useState("**Hello world!!!**");
  return (
    <>
      {" "}
      <div className=" mx-auto h-full" data-color-mode="auto">
        <MDEditor value={value} onChange={(val) => setValue(val || "")}  />
      </div>

      <div className="flex w-full justify-end my-0  md:my-10 gap-3 px-3">
        <Button
         
          onClick={() => console.log(value)}
        >
          Save
        </Button>

        <Button
        variant={"outline"}
       
          onClick={() => setValue("")}
        >
          Clear
        </Button>
      </div>
    </>
  );
};
export default Journal;
