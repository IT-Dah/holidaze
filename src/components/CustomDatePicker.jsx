import DatePicker from "react-datepicker";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

function CustomDatePicker({
  selected,
  onChange,
  startDate,
  endDate,
  minDate,
  filterDate,
}) {
  return (
    <DatePicker
      inline
      selectsRange
      selected={selected}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      minDate={minDate}
      filterDate={filterDate}
      monthsShown={1}
      calendarClassName="!bg-white !rounded-xl !shadow-md p-4 text-sm text-gray-800 w-full"
      dayClassName={() =>
        "w-10 h-10 flex items-center justify-center rounded hover:bg-sky-100"
      }
      renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
        <div className="flex justify-between items-center mb-3">
          <button
            onClick={decreaseMonth}
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
          >
            <FaChevronLeft />
          </button>
          <span className="text-base font-bold">
            {monthDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            onClick={increaseMonth}
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    />
  );
}

export default CustomDatePicker;
