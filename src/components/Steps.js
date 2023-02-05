import { useState } from "react";
import "../App.css"

const Steps = () => {
  const [steps, setSteps] = useState([]);// Количество строк в таблице
  const [date, setDate] = useState("");// Задаём начальную дату в виде пустой строки
  const [distance, setDistance] = useState([]);// Количество пройденных КМ в каждой строке

  // Записываем выбранное значение даты в переменную date
  const ChangeDate = (e) => {
    setDate((prev) => (prev = e.target.value));
  };

    // Записываем выбранное значение дистанции в переменную distance
  const ChangeDistance = (e) => {
    setDistance((prev) => (prev = e.target.value));
  };

  // Сортируем наш список в зависимости от даты
  const sortSteps = () => {
    if (!steps) {
      return null
    }
    setSteps(prev => prev.sort((a, b) => {
      if (a.date.split("-")[2] === b.date.split("-")[2]) {
        if (a.date.split("-")[1] === b.date.split("-")[1]) {
          if (a.date.split("-")[0] > b.date.split("-")[0]) {
            return -1;
          }
        }
        if (a.date.split("-")[1] > b.date.split("-")[1]) {
          return -1;
        }
      }
      if (a.date.split("-")[2] > b.date.split("-")[2]) {
        return -1;
      }
    }));
  };

  // Редактируем выбранный элемент списка путём его удаления из steps и переноса данных в инпуты для корректировки
  const editStep = (id) => {
    setDate(
      (prev) =>
      (prev = steps
        .map((item) => (item.id === id ? item.date : ""))
        .join("")
        .split("-")
        .reverse()
        .join("-"))
    );
    setDistance((prev) => 
      (prev = steps.map((item) => (item.id === id ? item.distance : ""))
      .join("")
      ));
      removeStep(id); // Удаляем редактируемую строку
  };

  // Удаляем нужную строку нажатием на крестик
  const removeStep = (id) => {
    setSteps((prev) => (prev = steps.filter((item) => item.id !== id)));
  };

  // Добавляем необходимое количестов КМ уже к существующей дате
  const editDistance = () => {
   setSteps(
      (prev) =>
      (prev = steps.map((item) =>  
        item.id === date
          ? { ...item, distance: item.distance + +distance } // Здесь собака зарыта
          : { ...item }
      ))
    );
  };

  // Создаём новую строку с новыми значениями даты и дистанции
  const addNewSteps = () => {
    if (date) {
      let dateRu = date.split("-").reverse().join("-");
      if (distance) {
        if (steps.find((item) => item.id === date) ? false : true) {
          setSteps(
            (prev) =>
            (prev = [
              ...steps,
              { id: date, date: dateRu, distance: +distance },
            ])
          );
        } else {
          editDistance();
        }
      }
    }
    setDate("");
    setDistance(0);
    sortSteps()
  };

  return (
    <main className="steps-wrapper">
      <div className="steps-container">
      <h1 className="h1">Учёт тренировок</h1>
        <div className="steps-add">
          <section>
            <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
            <input
              value={date}
              type="date"
              htmlFor="date"
              className="steps-add-date"
              onChange={(e) => {
                ChangeDate(e);
              }}
            />
          </section>
          <section>
            <label htmlFor="distance">Пройдено, КМ</label>
            <input
              value={distance}
              type="number"
              htmlFor="distance"
              className="steps-add-distance"
              onChange={(e) => {
                ChangeDistance(e);
              }}
            />
          </section>
          <button onClick={addNewSteps} className="steps-add-button">
            OK
          </button>
        </div>
        <div className="steps-list">
          <div className="steps-list-title">
            <span className="steps-list-title-column">Дата (ДД.ММ.ГГ)</span>
            <span className="steps-list-title-column">Пройдено, км</span>
            <span className="steps-list-title-column">Действия</span>
          </div>
          <div className="steps-list-items">
            {steps.map((item) => {
              return (
                <div key={item.id} className="step-list-item">
                  <div className="step-list-item-date">{item.date}</div>
                  <div className="step-list-item-distance">
                    {item.distance} Км
                  </div>
                  <div className="step-list-edit-and-remove">
                    <div
                      onClick={() => editStep(item.id)}
                      className="step-list-edit"
                    >
                      {/* Иконка карандаша редактирования */}
                    </div>
                    <div
                      onClick={() => removeStep(item.id)}
                      className="step-list-remove"
                    >
                      {/* Крестик для удаления */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Steps;