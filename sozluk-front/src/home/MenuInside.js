import React, { useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import '@fortawesome/fontawesome-free/js/all';
import './menu_in.css';
import {logout, isAuthenticated} from '../auth/fetchop';
const MenuInside = (props) => {
    const {token, user} = isAuthenticated();
    const [redirectToReferer, setRedirect] = useState(false);
    
    const redirectOutside = () => {
        if(redirectToReferer === true){
        return (<Redirect to="/"/>);
        }
    }

    const scodes = () => {
        return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand col-2" style={{"textDecoration" : "none"}}><h2>Sozluk</h2></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav col-lg-5 col-md-12" style={{"marginLeft" : ".1rem"}}>
            <input className="col-lg-10 col-md-9" type="text"/>
            <li className="nav-item col-lg-2 col-md-3">
                <i className="fas fa-search ml-2 mt-1" style={{"fontSize": "2rem"}}></i>
            </li>
        </ul>
        <ul className="navbar-nav col-lg-6 col-md-12 justify-content-lg-end" style={{}}>
            <li className="nav-item col-lg-2 col-md-12 mr-3">
                <span className="nav-link mt-2" onClick={() => {props.handleChangeMenu("yeniBaslik")}} style={{"textDecoration": "none", "padding": "0.2rem 0","cursor" :"pointer"}}>Başlık Aç</span>
            </li>

            <li className="nav-item col-lg-2 col-md-12">
                <Link className="nav-link mt-2" to="/msg" style={{"textDecoration": "none", "padding": "0.2rem 0"}}>Mesaj</Link>
            </li>
            <li className="nav-item col-lg-2 col-md-12">
                <Link className="nav-link mt-2" to="/prfl" style={{"textDecoration": "none", "padding": "0.2rem 0"}}>Ben</Link>
            </li>
            <li className="nav-item col-lg-2 col-md-6">
    <button type="button" className="btn btn-danger dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{"letterSpacing" : "1px"}}>{user.nickname}</button>
                <div className="dropdown-menu dropdown-menu-right mr-4" aria-labelledby="dropdownMenuButton">
                <Link className="dropdown-item" to="/ayarlar">Ayarlar</Link>
                <Link className="dropdown-item" to="/">Another action</Link>
                <Link className="dropdown-item" to="/">Something else here</Link>
                <div className="dropdown-divider"></div>
                <span className="dropdown-item" onClick={() => {
                    logout(() => {
                        setRedirect(true);
                    })}}>
    Çıkış yap</span>
            </div>
            </li>
            
        </ul>
    </div>
    </nav>);
    }
    return (
        <div>
            {scodes()}
            {redirectOutside()}
        </div>        
    );
}
    


export default MenuInside;