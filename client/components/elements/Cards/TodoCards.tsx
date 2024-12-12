import { TodoType } from "../List";
import { CheckCircle, Circle } from "lucide-react"; // Icons for completed/pending tasks
import More from "../More";
import { getClerkUserID } from "@/lib/action";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface TodoCardsProps {
  todoData: TodoType[];
  setTodoData: (data: TodoType[]) => void;
}

const TodoCards = ({ todoData, setTodoData }: TodoCardsProps) => {
  const { toast } = useToast();

  // Toggle task completion status
  const handleToggle = async (id: string) => {
    const updatedTodos = todoData.map((todo) =>
      todo._id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );

    try {
      setTodoData(updatedTodos);
      const clerkID = await getClerkUserID();
      const toggle = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/toggle?clerkID=${clerkID}&taskID=${id}`
      );

      console.log(toggle);

      toast({
        title: "Task updated successfully 🎉",
        description: `${
          todoData.find((todo) => todo._id === id)?.task
        } is now ${
          updatedTodos.find((todo) => todo._id === id)?.isCompleted
            ? "✅ completed! Great job! 🎊"
            : "❌ pending! Keep going! 💪"
        }`,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to update task 😢",
        description:
          "Something went wrong while updating the task! 🚨 Please try again. 🔄",
        variant: "destructive",
      });
    }
  };

  // Map priority levels to numerical values
  const priorityOrder = { high: 3, medium: 2, low: 1 };

  // Sort tasks by priority
  const sortedTodos = [...todoData].sort(
    (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
  );

  // Map priority levels to badge colors
  const priorityColors = {
    high: "bg-red-500 text-white",
    medium: "bg-yellow-400 text-black",
    low: "bg-gray-400 text-black",
  };

  return (
    <div className="p-6 rounded-xl bg-gray-100 shadow-md w-full md:max-w-4xl md:mx-auto border-b-2 border-t-2">
      <h2 className="text-xl font-semibold mb-4 text-black text-center">
        Today’s Todos
      </h2>
      <ul className="space-y-4">
        {sortedTodos.map((todo) => (
          <li
            key={todo._id}
            className={`flex items-center border justify-between bg-gray-50 p-4 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-[1.02] ${
              todo.isCompleted ? "opacity-60" : "opacity-100"
            }`}
          >
            <div className="flex items-center gap-4 w-full">
              <button
                onClick={() => handleToggle(todo._id)}
                className="focus:outline-none"
              >
                {todo.isCompleted ? (
                  <CheckCircle className="w-6 h-6 text-green-500 transform scale-110 transition-transform duration-300" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400 transform scale-90 transition-transform duration-300" />
                )}
              </button>
              <div className="flex flex-col flex-grow">
                <span
                  onClick={() => handleToggle(todo._id)} // Enable toggling on text click
                  className={`text-lg text-start cursor-pointer transition-colors duration-300 ${
                    todo.isCompleted
                      ? "line-through text-gray-400"
                      : "text-gray-900"
                  }`}
                >
                  {todo.task}
                </span>
                <span
                  className={`mt-1 px-2 py-1 text-sm rounded-full self-start ${
                    priorityColors[todo.priority]
                  }`}
                >
                  {todo.priority.charAt(0).toUpperCase() +
                    todo.priority.slice(1)}{" "}
                  Priority
                </span>
              </div>
              <span>
                <More
                  _id={todo._id}
                  field={"todo"}
                  todoData={todoData}
                  setTodoData={setTodoData}
                />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoCards;
