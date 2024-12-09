const TodoCards = () => {
  return (
    <div className=" rounded-2xl text-xl flex justify-start items-start text-start">
      <div id="checklist">
        <input value="1" name="r" type="checkbox" id="01" />
        <label htmlFor="01">Bread</label>
        <input value="2" name="r" type="checkbox" id="02" />
        <label htmlFor="02">Cheese</label>
        <input value="3" name="r" type="checkbox" id="03" />
        <label htmlFor="03">Coffee</label>
        <input value="4" name="r" type="checkbox" id="04" />
        <label htmlFor="04">Coffee</label>
        <input value="5" name="r" type="checkbox" id="05" />
        <label htmlFor="05">Coffee</label>
        <input value="6" name="r" type="checkbox" id="06" />
        <label htmlFor="06">Coffee</label>
      </div>
    </div>
  );
};
export default TodoCards;
