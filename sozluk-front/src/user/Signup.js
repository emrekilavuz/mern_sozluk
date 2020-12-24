import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import {kaydol } from '../auth/fetchop';
const Signup = () => {
    const [values, setValues] = useState({
        name : '',
        email : '',
        password : '',
        error: '',
        redirectToReferer: false
    });

    const {name, email, password, error, redirectToReferer} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: "", redirectToReferer: false});
        if(name==="" || email==="" || password===""){
            return setValues({...values, error: "Boş alan bırakmayınız", redirectToReferer:false});
        }
        kaydol({nickname : name, email, password}).then(data1 => 
            data1.json())
                .then(res=>{
                    let middle_error = "";
                    if(res.success === false){
                        if(res.error === 'User validation failed: email: Please add an valid email'){
                            middle_error = "Lütfen geçerli bir e-mail giriniz";
                        }
                        else if(res.error === "Duplicate field value entered"){
                            middle_error = "Böyle bir kullanıcı zaten var";
                        }
                        else if(res.error === "User validation failed: password: Password should be more than 6 character"){
                            middle_error = "Şifre 6 karakterden uzun olmalıdır";
                        }
                        setValues({...values, error: middle_error.length > 2  ? middle_error : res.error, redirectToReferer: false});
                    }
                else{
                    setValues({...values, 
                    name: '',
                    email: '',
                    password: '',
                    error : '',
                    redirectToReferer: true});
                }
            });
    };

    const SignupForm = () => (
        <div>
            <Link style={{"textDecoration" : "none"}} to="/"><h3>Sözlük</h3></Link>
            
        <form>
            <div className="form-group col-lg-6 mt-3">
                <label className="text-muted">Kullanıcı adı</label>
                <input onChange={handleChange('name')} 
                className="form-control" type="text"
                value={name}/>
            </div>
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
            <button onClick={clickSubmit} className="btn btn-primary mt-3">Üye ol</button>
        </form>
        </div>
    );

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

    return(
        <div className="container">
        {SignupForm()}
        {redirectToInside()}
        {showError()}
        </div>
    );
}



export default Signup;