import "./App.css";
import FormDateTravel from "./components/FormDateTravel";
import Travel from "./components/Travel";
import { useState } from "react";

function App() {
  // Стартовый список прогулок
  const [dateTravelList, setDateTravelList] = useState(
    [
      { id: "1", date: "2023-01-05", travel: 1 },
      { id: "2", date: "2023-01-06", travel: 3 },
    ].sort((a, b) => (a.date < b.date ? 1 : -1))
  );
  const [defaultInputDateTravel, setDefaultInputDateTravel] = useState({
    date: null,
    travel: null,
  });

  // Проверяем есть ли введённая пользователем дата в массиве с датами
  const addDateTravel = (newDateTravel) => {
    let indexFind = dateTravelList.find((e) => e.date === newDateTravel.date);
    // Если нет, создаём массив, добавляя введённую пользователем дату в начало массива
    if (indexFind === undefined) {
      setDateTravelList(
        [newDateTravel, ...dateTravelList].sort((a, b) =>
          a.date < b.date ? 1 : -1
        )
      );
    } else {
      // Если есть, перебираем массив, меняя совпадение
      setDateTravelList(
        dateTravelList.map((e) =>
          e.date === newDateTravel.date
            ? {
                id: e.id,
                date: e.date,
                travel: e.travel + newDateTravel.travel,
              }
            : e
        )
      );
    }
  };
  // Удаляем прогулку из списка прогулок по ид
  const delDateTravel = (id) => {
    setDateTravelList([...dateTravelList.filter((e) => e.id !== id)]);
  };

  const changeDateTravel = (dateTravel) => {
    setDefaultInputDateTravel(dateTravel);
  };

  return (
    <div className="App">
      <FormDateTravel
        newDateTravel={addDateTravel}
        defaultInputDateTravel={defaultInputDateTravel}
        changeDateTravel={changeDateTravel}
      />
      <Travel
        dateTravelList={dateTravelList}
        delDateTravel={delDateTravel}
        changeDateTravel={changeDateTravel}
      />
    </div>
  );
}

export default App;
