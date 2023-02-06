import { useState } from "react";
import Form from "./components/Form";
import Steps from "./components/Steps";
import "./App.css"

const App = () => {
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


  // Сортируем наш список в зависимости от даты
  const sortSteps = () => {
    if (!steps) return null;
  
    setSteps(prev =>
      prev.sort((a, b) => {
        const [aDay, aMonth, aYear] = a.date.split("-");
        const [bDay, bMonth, bYear] = b.date.split("-");
  
        if (aYear !== bYear) return aYear > bYear ? -1 : 1;
        if (aMonth !== bMonth) return aMonth > bMonth ? -1 : 1;
        if (aDay !== bDay) return aDay > bDay ? -1 : 1;
  
        return 0;
      })
    );
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

  return (
    <main className="steps-wrapper">
      <div className="steps-container">
      <Form
      date={date}
      steps={steps}
      distance={distance}
      ChangeDate={ChangeDate}
      ChangeDistance={ChangeDistance}
      addNewSteps={addNewSteps}
      setSteps={setSteps}
      editDistance={editDistance}
      sortSteps={sortSteps}
      />
      <Steps 
      steps={steps}
      editStep={editStep}
      removeStep={removeStep}
      />
      </div>
    </main>
  );
};

export default App;