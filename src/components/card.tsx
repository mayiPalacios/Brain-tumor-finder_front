const Card = () => {
  return (
    <div className=" col-sm-6 col-md-4 col-lg-2 mb-4">
      <div className="card">
        <div className="container__img-reg d-flex justify-content-center align-items-center ">
          <img
            className="card-img-top img img-thumbnail"
            src="https://c8.alamy.com/compes/c96175/el-cerebro-normal-irm-c96175.jpg"
            alt="Imagen"
            style={{ width: "250px", height: "250px" }}
          />
        </div>

        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h3>Mayi palacios</h3>
            <span>01/mayo/2023</span>
            <span>aprobado</span>
            <span>resultados:45%</span>
          </div>
          <button className="btn btn-primary">VER MAS</button>
        </div>
      </div>
    </div>
  );
};
export default Card;
