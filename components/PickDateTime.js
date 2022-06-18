import React, { useState } from 'react'
import moment from "moment"

const PickDateTime = ({ onSchedule }) => {
const days = 5;
let today = new Date();
const format = "dddd, MMMM Do YYYY";
const buttonClasses = "border border-gray-400 rounded bg-white hover:bg-mauve px-4 py-2 w-full";
const [date, setDate] = useState(null);
const [time, setTime] = useState(null);

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const timezone = "en-AU";

function scheduleDateTime() {
    onSchedule(date, time);
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
    return (
        <div className='flex w-full flex-col space-y-8'>
            {!date && <h2 className="font-display text-4xl text-center text-vibrant uppercase">Select date</h2>}
            {!date && <ul className="flex flex-col space-y-2 font-body text-xl w-full">
                {/* <button className={buttonClasses} onClick={() => setDate(today).toLocaleDateString(timezone, options)}>{today.toLocaleDateString(timezone, options)} (today)</button> */}
                <button className={buttonClasses} onClick={() => setDate(today.addDays(1).toLocaleDateString(timezone, options))}>{today.addDays(1).toLocaleDateString(timezone, options)} (tomorrow)</button>
                <button className={buttonClasses} onClick={() => setDate(today.addDays(2).toLocaleDateString(timezone, options))}>{today.addDays(2).toLocaleDateString(timezone, options)}</button>
                <button className={buttonClasses} onClick={() => setDate(today.addDays(3).toLocaleDateString(timezone, options))}>{today.addDays(3).toLocaleDateString(timezone, options)}</button>
                <button className={buttonClasses} onClick={() => setDate(today.addDays(4).toLocaleDateString(timezone, options))}>{today.addDays(4).toLocaleDateString(timezone, options)}</button>
                <button className={buttonClasses} onClick={() => setDate(today.addDays(5).toLocaleDateString(timezone, options))}>{today.addDays(5).toLocaleDateString(timezone, options)}</button>
                <button className={buttonClasses} onClick={() => setDate(today.addDays(6).toLocaleDateString(timezone, options))}>{today.addDays(6).toLocaleDateString(timezone, options)}</button>
            </ul>}
            {date && !time && <h2 className="font-display text-4xl text-center text-vibrant uppercase">Select time</h2>}
            {date && !time && <ul className="flex flex-col space-y-2 font-body text-xl w-full">
                <button className={buttonClasses} onClick={() => setTime("09:00AM")}>9:00AM</button>
                <button className={buttonClasses} onClick={() => setTime("10:00AM")}>10:00AM</button>
                <button className={buttonClasses} onClick={() => setTime("11:00AM")}>11:00AM</button>
                <button className={buttonClasses} onClick={() => setTime("12:00PM")}>12:00PM</button>
                <button className={buttonClasses} onClick={() => setTime("1:00PM")}>1:00PM</button>
                <button className={buttonClasses} onClick={() => setTime("2:00PM")}>2:00PM</button>
                <button className={buttonClasses} onClick={() => setTime("3:00PM")}>3:00PM</button>
                {moment(date).day() < 6 && <button className={buttonClasses} onClick={() => setTime("4:00PM")}>4:00PM</button>}
            </ul>}
            {date && time && <div className="space-y-4">
                <h2 className="font-display text-4xl text-center text-vibrant uppercase">Collection</h2>
                <p className="text-2xl font-body">{date} {time}</p>
                <button className="font-display uppercase text-vibrant bg-mauve py-4 text-3xl px-8 hover:bg-vibrant hover:text-mauve" onClick={scheduleDateTime}>Schedule</button>
            </div>}
        </div>
    )
}

export default PickDateTime;