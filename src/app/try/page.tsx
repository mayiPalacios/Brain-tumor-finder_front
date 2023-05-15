import Navbar from "@/components/navbar";
import { memo } from "react";

const page = ({}) => {
  return (
    <div className="container__try d-flex justify-content-center align-items-center">
      <Navbar />
      <section className="container__select--file d-flex p-5 flex-column gap-4 ">
        <h4>Elige el archivo</h4>
        <input type="file" name="archivo" />
        <button className="btn__file btn btn-primary">Subir archivo</button>
      </section>
    </div>
  );
};

export default memo(page);
