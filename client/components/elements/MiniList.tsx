import MiniCard from "./Cards/MiniCard";


const MiniList = () => {
  return (
    <div className="w-full flex gap-3 mt-3  max-h-30 justify-center items-center ">
       <MiniCard />
       <MiniCard />
       <MiniCard />
       <MiniCard />
    </div>
  );
};
export default MiniList;
