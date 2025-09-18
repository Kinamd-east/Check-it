// import React, { useState } from "react";
// import { toast } from "sonner";
// import { useNavigate, useParams } from "react-router";
// import TimePicker from "react-time-picker";
// import "react-time-picker/dist/TimePicker.css";
// import "react-clock/dist/Clock.css";
// import useUserAuthentication from "../hooks/useUserAuthentication";

// const CreateTask = () => {
//   const [loading, setLoading] = useState(false);
//   const { id } = useParams();
//   const { user } = useUserAuthentication();
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     author: user?._id,
//     time: "07:00",
//   });
//   const navigate = useNavigate();

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleTimeChange = (value: string | null) => {
//     if (value) setForm({ ...form, time: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!form.name || !form.time) {
//       toast.error("Please fill in all fields");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/task/create/${id}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify({
//             ...form,
//             author: user?._id, // ✅ safely attach here
//           }),
//         }
//       );

//       if (!res.ok) {
//         const errorData = await res.json();
//         toast.error(errorData.message);
//         throw new Error(errorData.message || "Task creation failed");
//       }

//       setLoading(false);
//       toast.success("✅ Task created successfully");
//       navigate("/dashboard");
//     } catch (err: any) {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6 bg-black min-h-screen p-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-white">Create Task</h2>
//           <p className="text-slate-400 mt-1">
//             Stay on track and never miss a task
//           </p>
//         </div>
//       </div>

//       {/* Card */}
//       <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-lg max-w-lg mx-auto">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Task Name */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-2">
//               Task Name
//             </label>
//             <input
//               type="text"
//               value={form.name}
//               name="name"
//               onChange={handleChange}
//               placeholder="e.g., Morning Run"
//               className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-2">
//               Description
//             </label>
//             <textarea
//               value={form.description}
//               name="description"
//               onChange={handleChange}
//               placeholder="Brief description..."
//               className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//               rows={3}
//             />
//           </div>

//           {/* Time Picker */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-2">
//               Select Time
//             </label>
//             <div className="bg-slate-700/40 p-3 rounded-lg border border-slate-600 inline-block">
//               <TimePicker
//                 onChange={handleTimeChange}
//                 value={form.time}
//                 disableClock={true}
//                 clearIcon={null}
//                 className="text-black rounded-md"
//               />
//             </div>
//             <p className="mt-2 text-sm text-slate-400">
//               Selected: <span className="font-medium">{form.time}</span>
//             </p>
//           </div>

//           {/* Submit Button */}
//           <div className="flex space-x-3 pt-2">
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex-1 cursor-pointer disabled:opacity-50"
//             >
//               {loading ? "Please wait..." : "Create Task"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateTask;


import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import useUserAuthentication from "../hooks/useUserAuthentication";

const CreateTask = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { user } = useUserAuthentication();
  const [schedule, setSchedule] = useState<any>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    author: user?._id,
    time: "07:00",
  });
  const navigate = useNavigate();
  // 🔥 fetch schedule first
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/schedule/${id}`, {
          credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Failed to fetch schedule");
          navigate("/dashboard");
          return;
        }
        console.log(data)

        setSchedule(data.schedule);

        // 🔒 check lock
        if (data.schedule.lockedUntil && new Date(data.schedule.lockedUntil) > new Date()) {
          toast.error("This schedule is locked for 24 hours ❌");
          navigate(`/schedule/${id}`); // redirect back
        }
      } catch (err) {
        console.error(err);
        toast.error("Error loading schedule");
        navigate("/dashboard");
      }
    };

    fetchSchedule();
  }, [id, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTimeChange = (value: string | null) => {
    if (value) setForm({ ...form, time: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!form.name || !form.time) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/task/create/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ ...form, author: user?._id }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message);
        throw new Error(errorData.message || "Task creation failed");
      }

      setLoading(false);
      toast.success("✅ Task created successfully");
      navigate("/dashboard");
    } catch (err: any) {
      setLoading(false);
    }
  };

  if (!schedule) {
    return <div className="text-white p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6 bg-black min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Create Task</h2>
          <p className="text-slate-400 mt-1">
            Stay on track and never miss a task
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-lg max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Task Name
            </label>
            <input
              type="text"
              value={form.name}
              name="name"
              onChange={handleChange}
              placeholder="e.g., Morning Run"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description
            </label>
            <textarea
              value={form.description}
              name="description"
              onChange={handleChange}
              placeholder="Brief description..."
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {/* Time Picker */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Select Time
            </label>
            <div className="bg-slate-700/40 p-3 rounded-lg border border-slate-600 inline-block">
              <TimePicker
                onChange={handleTimeChange}
                value={form.time}
                disableClock={true}
                clearIcon={null}
                className="text-black rounded-md"
              />
            </div>
            <p className="mt-2 text-sm text-slate-400">
              Selected: <span className="font-medium">{form.time}</span>
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex-1 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Please wait..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
