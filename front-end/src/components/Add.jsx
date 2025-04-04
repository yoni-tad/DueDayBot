import { X, Menu, BellRing } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Add(props) {
  const navigate = useNavigate();

  return (
    <div className="w-full p-4 text-white">
      <div className="flex items-center justify-between">
        <X className="cursor-pointer" onClick={() => navigate("/")} />
        <button
          className="bg-blue-400 px-4 py-2 rounded-full cursor-pointer"
          onClick={props.onSubmit}
        >
          Save
        </button>
      </div>

      <div className="flex flex-col py-6">
        <div className="mb-6">
          <input
            type="text"
            id="title"
            name="title"
            onChange={props.handleOnChange}
            placeholder="Add title"
            className="border-b border-gray-400 !outline-none font-semibold w-full"
          />
        </div>
        <div className="flex gap-2 my-4">
          <Menu className="text-gray-400" />
          <textarea
            type="text"
            id="description"
            name="description"
            onChange={props.handleOnChange}
            placeholder="Add description"
            className="border-b border-gray-400 !outline-none w-full"
          />
        </div>

        <div className="flex gap-8 my-4">
          <div class="relative">
            <p className="text-sm font-medium block mb-2">Select date</p>
            <input
              type="date"
              id="date"
              name="date"
              onChange={props.handleOnChange}
              class="border leading-none border-gray-400 text-white text-sm rounded-lg block w-full p-2.5"
              required
            />
          </div>

          <div class="relative">
            <p className="text-sm font-medium block mb-2">Select time</p>
            <input
              type="time"
              id="time"
              name="time"
              onChange={props.handleOnChange}
              class="border leading-none border-gray-400 text-white text-sm rounded-lg block w-full p-2.5"
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-2 my-4">
          <BellRing size={20} />
          <select
            name="reminder"
            onChange={props.handleOnChange}
            className="!outline-none w-full rounded"
          >
            <option className="bg-gray-700 !outline-none" value="15 minutes">
              15 minutes before
            </option>
            <option
              className="bg-gray-700 !outline-none"
              value="30 minutes"
              selected
            >
              30 minutes before
            </option>
            <option className="bg-gray-700 !outline-none" value="1 hour">
              1 hour before
            </option>
            <option className="bg-gray-700 !outline-none" value="2 hours">
              2 hours before
            </option>
            <option className="bg-gray-700 !outline-none" value="1 day">
              1 day before
            </option>
            <option className="bg-gray-700 !outline-none" value="3 days">
              3 days before
            </option>
            <option className="bg-gray-700 !outline-none" value="1 week">
              1 week before
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
