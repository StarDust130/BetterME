
const ExpensesStats = () => {
  return (
    <div className="">
      <h4 className="text-lg font-semibold">Expense Breakdown WOWOW</h4>
      <ul className="space-y-3">
        <li className="flex justify-between items-center">
          <span>Rent</span>
          <span className="font-bold text-gray-800">₹10</span>
        </li>
        <li className="flex justify-between items-center">
          <span>Groceries</span>
          <span className="font-bold text-gray-800">₹5</span>
        </li>
        <li className="flex justify-between items-center">
          <span>Utilities</span>
          <span className="font-bold text-gray-800">₹3</span>
        </li>
        <li className="flex justify-between items-center">
          <span>Miscellaneous</span>
          <span className="font-bold text-gray-800">₹2</span>
        </li>
      </ul>
      <div className="mt-4">
        <h5 className="text-sm font-semibold text-gray-500">
          Monthly Spending Goal
        </h5>
      </div>
    </div>
  );
}
export default ExpensesStats