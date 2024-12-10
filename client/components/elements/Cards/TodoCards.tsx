import { TodoType } from "../List";
import { CheckCircle, Circle } from "lucide-react"; // Icons for completed/pending tasks

interface TodoCardsProps {
  todoData: TodoType[];
  setTodoData: (data: TodoType[]) => void;
}

const TodoCards = ({ todoData, setTodoData }: TodoCardsProps) => {
  const handleToggle = (index: number) => {
    const updatedTodos = todoData.map((todo, i) =>
      i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodoData(updatedTodos);
  };

  return (
    <div className=" p-6 rounded-xl shadow-md w-full md:max-w-4xl md:mx-auto border-b-2 border-t-2">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">
        Today’s Todos
      </h2>
      <ul className="space-y-4">
        {todoData.map((todo, index) => (
          <li
            key={todo._id}
            className={`flex items-center border justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-[1.02] ${
              todo.isCompleted ? "opacity-70" : "opacity-100"
            }`}
          >
            <div className="flex items-center gap-4 w-full">
              <button
                onClick={() => handleToggle(index)}
                className="focus:outline-none"
              >
                {todo.isCompleted ? (
                  <CheckCircle className="w-6 h-6 text-green-500 transform scale-110 transition-transform duration-300" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400 transform scale-90 transition-transform duration-300" />
                )}
              </button>
              <span
                className={`text-lg flex-grow transition-colors duration-300 ${
                  todo.isCompleted
                    ? "line-through text-gray-400"
                    : "text-gray-900 dark:text-gray-100"
                }`}
              >
                {todo.task}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoCards;
