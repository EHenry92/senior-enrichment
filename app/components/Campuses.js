import React, {Component} from 'react';
import {fetchStudents} from '../reducers/students';
import {fetchCampuses, fetchCampus, destroyCampus} from '../reducers/campuses';
import store from '../store';
import { NavLink } from 'react-router-dom';
import AddCampus from './AddCampus'


export default class Campuses extends Component {
    constructor (props) {
        super(props);
        this.state = store.getState();
        this.click = false;
        this.clickHandler = this.clickHandler.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.clickHandlerAdd = this.clickHandlerAdd.bind(this);
        
    }
    componentWillMount ()   {
        store.dispatch(fetchCampuses());
        store.dispatch(fetchStudents());
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }
    clickHandler(evt)   {
            evt.preventDefault();
            console.log(evt.target.value)
            const campusId = evt.target.value;
            store.dispatch(destroyCampus(campusId));
    }
    handleMouseEnter(evt)   {
        evt.preventDefault();
        console.log(event.id, "val enter");
        store.dispatch(fetchCampus(evt.target.value))
    }
    clickHandlerAdd(event)   {
        event.preventDefault();
        this.click = !this.click;
        this.setState({});
    }

    render ()   {
        let form;
        if (this.click)
        {form = <AddCampus />}
        return (
            <div id= "main">
                <div id="add">
                    {form}
                </div>
                <div id = "campuses">
                    {
                        this.state.campuses.list.map((school) =>   (
                            <div
                                key = {school.id}
                                name = {school.id}
                                style = {{backgroundImage: `url(${school.image})`}}
                                className="singleCampus">
                                <button
                                    className="delete-button"
                                    value={school.id}
                                    onClick={this.clickHandler}>X</button>
                                <h2>{school.name}</h2>
                                <p
                                id = {school.id}
                                name = {school.id}
                                ><NavLink to={`/campus/${school.id}`}>More Info</NavLink></p>
                            </div>

                            )
                        )
                    }
                    <button
                                onClick={this.clickHandlerAdd}
                                key = "addCampus"
                                style = {{backgroundImage: 'http://lwca.ab.ca/uploads/files/school%20walls.jpg' }}
                                className="singleCampus">
                                    Add A Campus
                                </button>
                </div>
            </div>

        )
    }
}
