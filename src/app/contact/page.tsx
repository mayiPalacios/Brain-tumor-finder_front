import Navbar from "@/components/navbar";
import { memo } from "react";

const page = ({}) => {
    return (
      <div >
        <Navbar/>
       <div><h1>Contactanos para mas informacion</h1></div>
      </div>
    );
  };
  
  export default memo(page);