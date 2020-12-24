import React from 'react';
import {Link} from 'react-router-dom';
import '@fortawesome/fontawesome-free/js/all';
import './menu.css';
const Menu = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand col-2" style={{"textDecoration" : "none"}}><h2>Sozluk</h2></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav col-lg-10 col-md-12">
            <input className="col-lg-7 col-md-9" type="text"/>
            <li className="nav-item col-lg-3 col-md-3">
                <i className="fas fa-search ml-2 mt-1" style={{"fontSize": "2rem"}}></i>
            </li>
        </ul>
        <ul className="navbar-nav col-lg-2 col-md-12">
            <li className="nav-item col-lg-6 col-md-12">
                <Link className="nav-link h6 mr-3 mt-2" to="/signin" style={{"textDecoration": "none", "padding": "0.2rem"}}>Giriş yap</Link>
            </li>

            <li className="nav-item col-lg-6 col-md-12">
                <Link className="nav-link h6 mr-3 mt-2" to="/signup" style={{"textDecoration": "none", "padding": "0.2rem"}}>Üye ol</Link>
            </li>
        </ul>
    </div>
    </nav>
);

export default Menu;