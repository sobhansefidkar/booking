/** @format */

import { useEffect, useState } from "react";
import "../style.css";

function Home() {
  class PersianDate extends Date {
    constructor(...args) {
      super(...args);
    }

    toLocaleDateString = () => super.toLocaleDateString("fa-IR-u-nu-latn");
    getParts = () => this.toLocaleDateString().split("/");
    getDay = () => (super.getDay() === 6 ? 0 : super.getDay() + 1);
    getDate = () => this.getParts()[2];
    getMonth = () => this.getParts()[1] - 1;
    getYear = () => this.getParts()[0];
    getMonthName = () => this.toLocaleDateString("fa-IR", { month: "long" });
    getDayName = () => this.toLocaleDateString("fa-IR", { weekday: "long" });
  }
  const date = new PersianDate();

  const [data, setData] = useState([]);
  const [times, setTimes] = useState();
  const [mode , setMode] = useState(false)
  const [animation, setAnimation] = useState(false);

  let dates = [];
  const dayNames = [
    "شنبه",
    "یک شنبه",
    "دو شنبه",
    "سه شنبه",
    "چهار شنبه",
    "پنج شنبه",
    "جمعه",
  ];

  useEffect(() => {
    for (let i = 1; i <= 4; i++) {
      const days = new PersianDate(date.setHours(date.getHours() + 24));
      dates.push({
        date: days.getDayName(),
        dayName: dayNames[days.getDay()],
        holyDay: false,
        times: [
          { time: "10:00", active: true },
          { time: "10:30", active: true },
          { time: "11:00", active: true },
          { time: "11:30", active: true },
          { time: "12:00", active: true },
          { time: "12:30", active: true },
          { time: "18:00", active: true },
          { time: "18:30", active: true },
          { time: "19:00", active: true },
          { time: "19:30", active: true },
        ],
      });
    }
    setData(dates);
  }, []);

  const findTimes = (dayName) => {
    const find = data.find((item) => item.date == dayName);
    setTimes(find);
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 500);
  };
  const book = (date , index) => {
    const find = data.find(item => item.date == date)
    find.times[index].active = false

    setData(
      data.map(item => item.date == date ? find : item)
    )
  };

  return (
    <div className='home'>
      <div className='container'>
        <div className="mode">
        <h1 className='title'>رزرو نوبت</h1>
        <button className={mode ? "blight" :"bdark"} onClick={() => setMode(!mode)}>{mode ? "روشن" : "تیره"}</button>
        </div>
        <div className={mode ? 'take-appointment dark' : 'take-appointment light'}>
          <div className='header'>
            <ul>
              {data &&
                data.map((item, i) => {
                  return (
                    <li className="li" key={i} onClick={() => findTimes(item.date)}>
                      <span>{item.date}</span>
                      <span>{item.dayName}</span>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className='body'>
            <ul className={animation ? "animation" : ""}>
              {times && 
              times.times.map((item, index) => {
                return (
                  <li
                  key={index}
                    className={item.active ? "disactive" : "active"}
                    onClick={() => book(times.date , index)}>
                    {item.time}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
