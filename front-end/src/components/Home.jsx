import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Dot,
  MoreHorizontal,
} from "lucide-react";
import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import Items from "./Items";

export default function Home(props) {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handlePrevMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() - 7);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + 7);
      return newDate;
    });
  };

  const getStartOfWeek = (date) => {
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const currentYear = new Date().getFullYear();
    return new Date(currentYear, date.getMonth(), date.getDate() + diff);
  };

  const startOfWeek = getStartOfWeek(currentDate);
  const weekDayDates = [...Array(7)].map((_, index) => {
    const day = new Date(startOfWeek);
    day.setDate(day.getDate() + index);
    return day;
  });

  const currentMonth = currentDate.toLocaleString("default", { month: "long" });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const filteredSchedules = props.schedules.filter((schedule) => {
    const scheduleDate = new Date(schedule.forDate).toDateString();
    const todayDate = new Date(currentDate).toDateString();
    return scheduleDate === todayDate;
  });

  return (
    <div className="flex flex-col text-white h-full w-full py-4 px-4">
      <div className="flex flex-col mb-4">
        <div className="flex items-center justify-between">
          <button onClick={handlePrevMonth} className="cursor-pointer">
            <ChevronLeft />
          </button>
          <button>{currentMonth}</button>
          <button onClick={handleNextMonth} className="cursor-pointer">
            <ChevronRight />
          </button>
        </div>

        <div className="flex flex-col my-4 gap-2">
          {/* week days */}
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => {
              return (
                <p key={index} className="text-gray-400 text-center">
                  {day}
                </p>
              );
            })}
          </div>

          {/* days */}
          <div className="grid grid-cols-7 gap-2 text-center">
            {weekDayDates.map((date, index) => {
              return (
                <p
                  onClick={() => setCurrentDate(date)}
                  key={index}
                  className={`cursor-pointer font-bold py-2 mx-1 ${
                    date.toDateString() === new Date().toDateString()
                      ? "rounded bg-blue-400"
                      : ""
                  }`}
                >
                  {date.getDate()}
                </p>
              );
            })}
          </div>
        </div>
        <hr className="text-gray-600 px-4" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-xl font-bold">Schedules</p>
        <Plus className="cursor-pointer" onClick={() => navigate("/add")} />
      </div>

      <div className="flex-grow overflow-y-auto">
        {filteredSchedules.length > 0
          ? filteredSchedules.map((schedule) => {
              return (
                <Items
                  key={schedule._id}
                  id={schedule._id}
                  date={formatDate(schedule.forDate)}
                  title={schedule.title}
                  description={schedule.description}
                  deleteItem={() => props.deleteSchedule(schedule._id)}
                />
              );
            })
          : <p className="text-center text-xl font-semibold">No schedules for today.</p>}
      </div>
    </div>
  );
}
