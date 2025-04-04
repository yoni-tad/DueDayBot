import { Route, Routes, useNavigate } from "react-router-dom";
import Splash from "./components/Splash";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import Add from "./components/Add";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();
  const telegramId = 2146933543;

  const showToastMessage = (text, type = "success") => {
    toast[type](text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleOnChange = (event) => {
    event.preventDefault();

    setUserData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!userData.title || !userData.date || !userData.time) {
      showToastMessage("Please fill all fields", "error");
      return;
    }

    const dateTimeString = `${userData.date}T${userData.time}:00`;
    const forDate = new Date(dateTimeString);

    const requestData = {
      telegramId: telegramId,
      title: userData.title,
      description: userData.description,
      forDate: forDate,
      reminder: userData.reminder ?? '30 minutes',
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/create-schedule`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
      if (response.ok) {
        showToastMessage("Schedule successfully created!", "success");
        getSchedules(telegramId);
        navigate("/");
      }
    } catch (error) {
      showToastMessage("Please try again!", "error");
      console.error("Error creating schedule:", error);
    }
  };

  const getSchedules = async (telegramId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/schedules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ telegramId }),
      });

      const data = await response.json();
      setSchedules(data);
    } catch (error) {
      showToastMessage("Please try again!", "error");
      console.error("Error creating schedule:", error);
    }
  };

  const deleteSchedule = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/schedule/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      showToastMessage("Delete successfully!", "success");
      getSchedules(telegramId);
    } catch (error) {
      showToastMessage("Please try again!", "error");
      console.error("Error deleting schedule:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getSchedules(telegramId);
      setIsLoading(false);
    }, 3000);
  }, []);

  return isLoading ? (
    <Splash />
  ) : (
    <div className="flex flex-col justify-between items-center h-screen">
      <Routes>
        <Route
          path="/"
          element={
            <Home schedules={schedules} deleteSchedule={deleteSchedule} />
          }
        />
        <Route
          path="/add"
          element={<Add handleOnChange={handleOnChange} onSubmit={onSubmit} />}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}
