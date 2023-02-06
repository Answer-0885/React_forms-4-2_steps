const Form = (props) => {

    return (
        <div>
        <h1 className="h1">Учёт тренировок</h1>
        <div className="steps-add">
          <section>
            <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
            <input
              value={props.date}
              type="date"
              htmlFor="date"
              className="steps-add-date"
              onChange={(e) => {
                props.ChangeDate(e);
              }}
            />
          </section>
          <section>
            <label htmlFor="distance">Пройдено, КМ</label>
            <input
              value={props.distance}
              type="number"
              htmlFor="distance"
              className="steps-add-distance"
              onChange={(e) => {
                props.ChangeDistance(e);
              }}
            />
          </section>
          <button onClick={(e) => props.addNewSteps(e)} className="steps-add-button">
            OK
          </button>
        </div>
    </div>
    )
}
export default Form;