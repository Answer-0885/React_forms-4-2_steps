import "../App.css"

const Steps = (props) => {

  return (
        <div className="steps-list">
          <div className="steps-list-title">
            <span className="steps-list-title-column">Дата (ДД.ММ.ГГ)</span>
            <span className="steps-list-title-column">Пройдено, км</span>
            <span className="steps-list-title-column">Действия</span>
          </div>
          <div className="steps-list-items">
            {props.steps.map((item) => {
              return (
                <div key={item.id} className="step-list-item">
                  <div className="step-list-item-date">{item.date}</div>
                  <div className="step-list-item-distance">
                    {item.distance} Км
                  </div>
                  <div className="step-list-edit-and-remove">
                    <div
                      onClick={() => props.editStep(item.id)}
                      className="step-list-edit"
                    >
                      {/* Иконка карандаша редактирования */}
                    </div>
                    <div
                      onClick={() => props.removeStep(item.id)}
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
  );
};

export default Steps;