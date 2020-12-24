import React, {Fragment, useEffect, useState} from 'react';
import {getSolFrame} from '../auth/fetchop';
const Solframe = (props) => {
    let domain = "http://localhost:5000/uploads/";
    const [values, setValues] = useState({
        basliklar : [],
        page : 1
    });

    const {basliklar, page} = values;

    

    useEffect(() => {
        const init = () => {
            getSolFrame(page, 25).then(data => {
                setValues({...values, basliklar : data.data});
                console.log(data);
            }).catch(err => {
                console.log(err);
            });
        };
        init();
    }, []);



    return (
        <div>
            {basliklar && basliklar.map((baslik, i) => (
                <div className="mt-2" key={i} style={{"display" :"flex", "justifyContent" :"flex-start", "alignItems":"center"}}>
                         <div style={{"width":"30%","display" : baslik.photo === "no-photo.jpg" ? 'none' : ''}}> 
                            <img src={baslik.photo === "no-photo.jpg" ? '' : domain.concat(baslik.photo)} alt="sol" style={{"maxWidth" : "100%"}}/>  
                         </div>
                         <div style={{"width" : "70%"}}>
                        <span style={{"cursor" : "pointer"}} onClick={() => {props.handleChangeBaslik(baslik)}}>
                        {baslik.name}
                        </span>
                         </div>    
                </div>
                        ))}
        </div>
    );

};

export default Solframe;