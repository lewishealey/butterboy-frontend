import React, { useState } from 'react'
import moment from "moment"

const PickDateTime = ({ onSchedule, settings }) => {
let today = new Date();
const disabledClasses = "border border-gray-400 rounded bg-gray-100 text-gray-400 cursor-not-allowed px-4 py-2 w-full";
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
                {[...Array(settings[0].pickupRange)].map((elementInArray, index) => {
                    let yourDate = today.addDays(index);
                    const formatedDate = yourDate.toISOString().split('T')[0];
                    if(index > 0) {
                        return <button className={settings[0].holiday.includes(formatedDate) ? disabledClasses : buttonClasses} key={index} disabled={settings[0].holiday.includes(formatedDate)} onClick={() => setDate(yourDate.toLocaleDateString(timezone, options))}>{yourDate.toLocaleDateString(timezone, options)}</button>
                    }
                }
                )}
            </ul>}
            {date && !time && <h2 className="font-display text-4xl text-center text-vibrant uppercase">Select time</h2>}
            {date && !time && <ul className="flex flex-col space-y-2 font-body text-xl w-full">
                {settings[0].timeSlots.map(slot =>  <button key={slot} className={buttonClasses} onClick={() => setTime(slot)}>{slot}</button>)}
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