import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

interface Event {
  name: string;
  startTime: string;
  endTime: string;
  description: string;
}

function EventCalendar() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem("events");
    return storedEvents ? JSON.parse(storedEvents) : {};
  });

  const [newEvent, setNewEvent] = useState({
    name: "",
    startTime: "",
    endTime: "",
    description: "",
  });
  
  const [showEventList, setShowEventList] = useState(false);
  const [showThisMonthEvents, setShowThisMonthEvents] = useState(false);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handlePreviousMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  const handleAddEvent = () => {
    const date = `${year}-${month + 1}-${selectedDay}`;
    if (!events[date]) {
      events[date] = [];
    }
    events[date].push(newEvent);
    setEvents({ ...events });
    setNewEvent({ name: "", startTime: "", endTime: "", description: "" });
  };

  const handleDeleteEvent = (index: number) => {
    const date = `${year}-${month + 1}-${selectedDay}`;
    events[date].splice(index, 1);
    setEvents({ ...events });
  };

  const handleEditEvent = (index: number, event: Event) => {
    const date = `${year}-${month + 1}-${selectedDay}`;
    events[date][index] = event;
    setEvents({ ...events });
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  return (
    <div className="max-w-4xl mx-auto p-4 ">
      <div className="flex justify-between mb-4">
        <Button onClick={handlePreviousMonth}>Previous</Button>
        <h2 className="text-lg font-bold">
          {year} - {month + 1} - {selectedDay}
        </h2>
        <Button onClick={handleNextMonth}>Next</Button>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {daysOfWeek.map((day, index: number) => (
          <div key={index} className="text-center">
            {day}
          </div>
        ))}
        {Array(firstDayOfMonth)
          .fill(0)
          .map((_, index: number) => (
            <div key={index} className="text-center" />
          ))}
        {Array(daysInMonth)
          .fill(0)
          .map((_, index: number) => (
            <div
              key={index}
              className={`text-center ${
                index + 1 === selectedDay ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setSelectedDay(index + 1)}
            >
              {index + 1}
            </div>
          ))}
      </div>
      <Button onClick={() => setShowEventList(true)} className="ml-2">Show Event of This Day</Button>
      {showEventList && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">
            Event List for {year}-{month + 1}-{selectedDay}
          </h2>
          <ul>
            {events[`${year}-${month + 1}-${selectedDay}`]?.map((event: Event, index: number) => (
              <li key={index}>
                <h3 className="text-lg font-bold">{event.name}</h3>
                <p>Start Time: {event.startTime}</p>
                <p>End Time: {event.endTime}</p>
                <p>Description: {event.description}</p>
                <Button onClick={() => handleDeleteEvent(index)}>
                  Delete
                </Button>
                <Button
                  onClick={() =>
                    handleEditEvent(index, { ...event, name: "New Name" })
                  }
                  className="ml-2"
                >
                  Edit
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Button onClick={() => setShowThisMonthEvents(true)} className="ml-2 mt-2">Show Events of This Month</Button>
      {showThisMonthEvents && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">
            Events of This Month for {year}-{month + 1}
          </h2>
          <ul>
            {Object.keys(events).filter(date => date.split('-')[1] === (month + 1).toString()).map((date) => (
              <li key={date}>
                <h3 className="text-lg font-bold">{date}</h3>
                <ul>
                  {events[date].map((event: Event, index: number) => (
                    <li key={index}>
                      <h4 className="text-md font-bold">{event.name}</h4>
                      <p>Start Time: {event.startTime}</p>
                      <p>End Time: {event.endTime}</p>
                      <p>Description: {event.description}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
      <h2 className="text-lg font-bold mt-4">Add Event</h2>
      <form>
        <Label htmlFor="name">Name:</Label>
        <Input
          id="name"
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        />
        <Label htmlFor="startTime">Start Time:</Label>
        <Input
          id="startTime"
          value={newEvent.startTime}
          onChange={(e) =>
            setNewEvent({ ...newEvent, startTime: e.target.value })
          }
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        />
        <Label htmlFor="endTime">End Time:</Label>
        <Input
          id="endTime"
          value={newEvent.endTime}
          onChange={(e) =>
            setNewEvent({ ...newEvent, endTime: e.target.value })
          }
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        />
        <Label htmlFor="description">Description:</Label>
        <Textarea
          id="description"
          value={newEvent.description}
          onChange={(e) =>
            setNewEvent({ ...newEvent, description: e.target.value })
          }
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        />
        <Button onClick={handleAddEvent} className="mt-4">Add Event</Button>
      </form>
    </div>
  );
}

export default EventCalendar;
