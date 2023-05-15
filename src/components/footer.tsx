import Image from "next/image";
import { Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
      <footer>
      <div className="container-fluid py-3 pt-4 text-white">
        <div className="row">
          <div className="col-12 ml-3">
            <a className="navbar-brand d-flex align-items-center" href="/">
              <Image
                height={40}
                width={40}
                alt=""
                src="https://cdn-icons-png.flaticon.com/512/2491/2491418.png"
              />
              <span style={{ fontSize: "22px" }}>Brain Tumor Finder</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
    );
  };
  
  export default Footer;