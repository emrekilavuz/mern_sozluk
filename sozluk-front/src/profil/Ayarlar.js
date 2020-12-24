import React, {useState } from 'react';
import {Link} from 'react-router-dom';
import { isAuthenticated } from '../auth/fetchop';
const Ayarlar = () => {

    const {user} = isAuthenticated();

    const [values, setValues] = useState({
        email : user.email
    });

    const {email} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    return (
        <div className="row justify-content-center align-items-center">
            <div className="col-lg-10 mt-3">
            <Link className="h2" style={{"textDecoration" :"none"}} to="/in">Sözlük</Link>
            </div>
            
            <div className="card col-lg-10" style={{"padding" : "2rem", "marginTop" :"1rem"}}> 
                <img src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png" alt="user" width="20%"/>
                    <div className="card-body">
                        <h5 className="card-title">Ayarlar</h5>
                    </div>
            <form>
                <div>
                <label className="text-muted">E-mail</label>
                <input className="form-control" type="text" value={email} onChange={handleChange("email")}/>
                
                </div>

                <button type="button" class="btn btn-primary mt-3">Ayarları kaydet</button>
               


            </form>
                
            </div>
        </div>
    );
};

export default Ayarlar;