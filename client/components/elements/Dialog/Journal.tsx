
import { Button } from "@/components/ui/button";
import MDEditor from "@uiw/react-md-editor";
import React from "react";
const Journal = () => {
   const [value, setValue] = React.useState("**Hello world!!!**");
  return (
    <>
      {" "}
      <div className=" mx-auto px-6 w-full" data-color-mode="auto">
        <MDEditor className=" w-full" value={value} onChange={(val) => setValue(val || "")}  />
      </div>

   <div
  className="flex w-full justify-end gap-3 px-3 my-10 md:relative md:my-10 sm:absolute sm:bottom-3"
>
  <Button onClick={() => console.log(value)}>Save</Button>

  <Button variant={"outline"} onClick={() => setValue("")}>
    Clear
  </Button>
</div>

    </>
  );
};
export default Journal;
