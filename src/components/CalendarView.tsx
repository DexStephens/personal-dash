import "./CalendarView.css";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function CalendarView() {
  const date = new Date();
  const currentDay = date.getDate();
  const dayOfWeek = date.getDay();
  const monthDays = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const year = date.getFullYear();
  const month = date.getMonth();
  const startDay = new Date(year, month, 1).getDay();

  console.log(currentDay, dayOfWeek, monthDays, year, month, startDay);

  return (
    <div className="calendar-container">
      <div className="calendar">
        <h2>
          {months[month]} {year}
        </h2>
        <div className="calendar-grid">
          {/* Day headers */}
          {days.map((day) => (
            <div key={day} className="calendar-header">
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {Array.from({ length: startDay }).map((_, index) => (
            <div key={`empty-${index}`} className="calendar-day empty"></div>
          ))}

          {Array.from({ length: monthDays }).map((_, index) => (
            <div key={index} className="calendar-day">
              <span className="day-number">{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  //   return (
  //     <div>
  //       <h1>Calendar view</h1>
  //       <div>
  //         <h2>
  //           {months[month]} {year}
  //         </h2>
  //         <table>
  //           <thead>
  //             <tr>
  //               {days.map((day) => (
  //                 <th key={day}>{day}</th>
  //               ))}
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {Array.from({ length: Math.ceil((startDay + monthDays) / 7) }).map(
  //               (_, rowIndex) => (
  //                 <tr key={rowIndex}>
  //                   {Array.from({ length: 7 }).map((_, colIndex) => {
  //                     const day = rowIndex * 7 + colIndex - startDay + 1;
  //                     return (
  //                       <td key={colIndex}>
  //                         {day > 0 && day <= monthDays ? day : ""}
  //                       </td>
  //                     );
  //                   })}
  //                 </tr>
  //               )
  //             )}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   );
}
