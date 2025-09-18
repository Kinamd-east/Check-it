import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type { Schedule } from "@/types";
import { toast } from "sonner";
import { ArrowLeft, PlusCircle, CheckCircle, XCircle } from "lucide-react";

const ScheduleDetails = () => {
  const { id } = useParams();
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/schedule/${id}`,
          { credentials: "include" }
        );
        if (!res.ok) {
          const error = await res.json();
          toast(error.message);
        }
        const data = await res.json();
        console.log(data)
        setSchedule(data.schedule);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, [id]);

  // const handleAddTask = async () => {
  //   if (!newTask.trim()) return

  //   try {
  //     const res = await fetch(
  //       `${import.meta.env.VITE_BACKEND_URL}/schedule/${id}/task`,
  //       {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         credentials: 'include',
  //         body: JSON.stringify({ name: newTask }),
  //       },
  //     )

  //     if (!res.ok) {
  //       const error = await res.json()
  //       toast(error.message)
  //       return
  //     }

  //     const data = await res.json()
  //     setSchedule(data.schedule) // update schedule with new task
  //     setNewTask('')
  //   } catch (err) {
  //     console.error(err)
  //     toast('Error adding task')
  //   }
  // }

  const handleMarkComplete = async (taskId: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/task/${taskId}`,
        { method: "PATCH", credentials: "include" }
      );
  
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Could not mark task");
        return;
      }
  
      toast.success("Task marked complete!");
      setSchedule((prev: any) => ({
        ...prev,
        tasks: prev.tasks.map((t: any) =>
          t._id === taskId ? { ...t, status: "COMPLETED" } : t
        ),
      }));
    } catch (err) {
      console.error(err);
      toast.error("Error marking task");
    }
  };
  
  const handleDeleteTask = async (taskId: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/task/${taskId}`,
        { method: "DELETE", credentials: "include" }
      );
  
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Could not delete task");
        return;
      }
  
      toast.success("Task deleted!");
      setSchedule((prev: any) => ({
        ...prev,
        tasks: prev.tasks.filter((t: any) => t._id !== taskId),
      }));
    } catch (err) {
      console.error(err);
      toast.error("Error deleting task");
    }
  };
  

  if (loading) return <p>Loading schedule...</p>;
  if (!schedule) return <p>No schedule found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 relative">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 flex items-center space-x-2 text-slate-600 hover:text-black"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Schedule details */}
      <h1 className="text-2xl font-bold mt-10">{schedule.name}</h1>
      <p className="mt-2 text-slate-600">Streaks: {schedule.streaks}</p>
      <p className="text-slate-600">Strikes: {schedule.strikes}</p>

      {/* Task Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Tasks</h2>

        {schedule.tasks && schedule.tasks?.length > 0 ? (
          <div className="space-y-4">
          {schedule.tasks.map((task: any) => (
            <div
              key={task._id}
              className="flex items-center justify-between p-4 bg-white rounded-lg border shadow-sm"
            >
              {/* Left: task details */}
              <div className="flex flex-col">
                <span
                  className={`font-bold ${
                    task.status === "COMPLETED"
                      ? "line-through text-gray-400"
                      : "text-black"
                  }`}
                >
                  {task.name} ({task.time})
                </span>
        
                {task.status === "PENDING" && (
                  <p className="text-gray-500 text-sm animate-pulse font-bold">Pending</p>
                )}
                {task.status === "UNCOMPLETED" && (
                  <p className="text-gray-500 text-sm font-bold">Uncompleted</p>
                )}
                {task.status === "COMPLETED" && (
                  <p className="text-green-600 text-sm font-bold">Completed</p>
                )}
                {task.status === "MISSED" && (
                  <p className="text-red-500 text-sm font-bold">Missed</p>
                )}
              </div>
        
              {/* Right: action buttons + status */}
              <div className="flex items-center space-x-3">
                {/* Show actions if task is still pending or uncompleted */}
                {(task.status === "PENDING" || task.status === "UNCOMPLETED") && (
                  <>
                    <button
                      onClick={() => handleMarkComplete(task._id)}
                      className="text-green-600 hover:text-green-800 cursor-pointer"
                    >
                      ✅
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      🗑
                    </button>
                  </>
                )}
        
                {/* Status-only icons */}
                {task.status === "COMPLETED" && (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                )}
                {task.status === "MISSED" && (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
              </div>
            </div>
          ))}
        </div>
        
        ) : (
          <p className="text-sm text-gray-500 mb-4">
            No tasks yet. Add your first one below!
          </p>
        )}

        {/* Add new task */}
        <div className="flex items-center space-x-2 mt-4">
          <button
            onClick={() => navigate(`/create-task/${id}`)}
            className="flex cursor-pointer items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetails;
