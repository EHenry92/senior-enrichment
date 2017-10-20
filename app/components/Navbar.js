import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

export default class NavBar extends Component {
    render ()   {
        return (
            <div id="nav">
                 <section className='nav-button'>
                <h4>
                <NavLink to="/">Home</NavLink>
                </h4>
            </section>
                <section className='nav-button'>
                <h4>
                <NavLink to="/campuses">Campuses</NavLink>
                </h4>
            </section>
            <section className='nav-button'>
                <h4>
                <NavLink to="/students">Students</NavLink>
                </h4>
            </section>
             </div>
        )
    }
}

