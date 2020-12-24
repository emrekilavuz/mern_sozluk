import React, {useState} from 'react';
import MenuInside from './MenuInside';
import Solframe from './Solframe';
import Takip from './Takip';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'popper.js';
import Entry from './Entry';
import BaslikAc from './BaslikAc';


// takip modu ve sol frame modu parent coponentda yapılacak
// takip ve sol frame entryleri için iki ayrı component switch olacak
// 

const Inside = () => {
    const [baslikIdAll, setBaslikIdAll] = useState("");
    const [gorModu, setGorModu] = useState("takip");
    const handleChangeBaslik = (baslik) => {
        if(baslik._id.length > 2){
            setBaslikIdAll(baslik);
            setGorModu("solFrame");
        }
    };

    const handleChangeMenu = (menu_back) => {
        if(menu_back){
            setGorModu(menu_back);
        }
    };

   
    return (
        <div className="container-fluid">
            <div>
            <MenuInside handleChangeMenu = {handleChangeMenu}/>
            </div>
            <div className="row">
            <div className="mt-2" style={{"display" : "flex", "flexDirection" : "column","width" : "25%"}}>
            <Solframe handleChangeBaslik = {handleChangeBaslik}/>
            </div>
            <div className="mt-3" style={{"width" :"60%"}}>
                <div style={{"width" : "100%"}}>
                <button type="button" className="btn btn-secondary" onClick={() => {setGorModu("takip")}}>Takip ettiklerim</button>
                </div>
                <hr className="col-lg-10"/>
                <div className="mt-3" style={{"width" : "100%"}}>
            {gorModu === "takip" ? (<Takip/>) : (gorModu === "yeniBaslik" ? (<BaslikAc/>) : (<Entry baslik={[baslikIdAll._id, baslikIdAll.photo]}/>))}
                </div>
            </div>
            
            </div>
        </div>);
};

export default Inside;