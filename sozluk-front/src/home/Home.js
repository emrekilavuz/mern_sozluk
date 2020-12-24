import React from 'react';
import 'popper.js/dist/popper';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'; 

import Menu from './Menu';
import {API} from '../config.js';
const Home = () => (<div><Menu/> <h1>{API}</h1> </div>);

export default Home;