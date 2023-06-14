import React, { useEffect, useState } from "react";
import { TimePicker } from "antd";
import dayjs from "dayjs";

export default function Availability({
  start,
  end,
  timings,
  onChange,
  timingOk,
  setTimingOk,
}) {
  const [startOk, setStartOk] = useState(false);
  const [endOk, setEndOk] = useState(false);
  const [newTimings, setNewTimings] = useState([]);

  const format = "HH:mm";

  const handleStartTimeUpdate = async (time, timeString) => {
    onChange([timeString, end]);
    setStartOk(true);
  };
  const handleEndTimeUpdate = async (time, timeString) => {
    onChange([start, timeString]);
    setEndOk(true);
  };

  let result = [];
  if (startOk && endOk) {
    let temp = start;
    while (temp < end) {
      result.push(temp);
      temp = dayjs(temp, "HH:mm").add(1, "hours").format("HH:mm");
    }
    result.push(end);
  }

  
  const confirmTime = (event) => {
    event.preventDefault();
    if (start != undefined) {
      setStartOk(true);
    }
  
    if (end != undefined) {
      setEndOk(true);
    }
    if (startOk && endOk) {
      onChange([...result]);
      setTimingOk(true);
    }
  };

  return (
    <div>
      <TimePicker
        format={format}
        value={start == undefined ? undefined : dayjs(start, format)}
        onChange={handleStartTimeUpdate}
      />
      &nbsp;to &nbsp;
      <TimePicker
        format={format}
        value={end == undefined ? undefined : dayjs(end, format)}
        onChange={handleEndTimeUpdate}
      />
      <button
        onClick={confirmTime}
        className="w-[50px] rounded-md h-[40px] ml-2"
      >
        OK
      </button>
    </div>
  );
}
