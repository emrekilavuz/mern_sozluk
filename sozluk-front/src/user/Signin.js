import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {authenticate, signin} from '../auth/fetchop';
const Signin = () => {

    const [values, setValues] = useState({
        email : "",
        password : "",
        error: "",
        redirectToReferer : false
    });

    const {
        email,
        password,
        error,
        redirectToReferer
    } = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }


    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: "", success: false});
        if(email==="" || password===""){
            return setValues({...values, error: "Boş alan bırakmayınız", success:false});
        }
        signin({email, password}).then(data1 => 
            data1.json())
                .then(res => {
                    let middle_error = "";
                    if(res.success === false){
                        if(res.error === "Invalid credentials"){
                            middle_error = "Yanlış e-mail veya şifre";
                        }
                        setValues({...values, error: middle_error.length > 2  ? middle_error : res.error, success: false});
                    }
                else{
                   authenticate(res, () => {
                        setValues({...values, 
                            error : '',
                            redirectToReferer : true});
                   });
                }
            });
    };

    const SignInForm = () => {
        return (
            <div>
        
            <Link style={{"textDecoration" : "none"}} to="/"><h3>Sözlük</h3></Link>
            
        <form>
            <div className="form-group col-lg-6 mt-3">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} 
                className="form-control" type="email"
                value={email}/>
            </div>
            <div className="form-group col-lg-6 mt-3">
                <label className="text-muted">Şifre</label>
                <input onChange={handleChange('password')} 
                className="form-control" type="password"
                value={password}/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary mt-3">Giriş yap</button>
        </form>
        
        </div>
        );
    };    

    const showError = () => {
        return (<div className="alert alert-danger col-lg-6 mt-3" style={{display : error ? '' : 'none'}}>
            {error}
        </div>);
    };

    const redirectToInside = () => {
        if(redirectToReferer){
            return (<Redirect to="/in"/>);
        }
        
    };

    return (
        <div className="container">
    {SignInForm()}
    {showError()}
    {redirectToInside()}
        </div>
    );
};

export default Signin;