import React, {Component} from 'react';
import {fetchStudents} from '../reducers/students';
import {fetchCampuses} from '../reducers/campuses';
import {setCampus} from '../reducers/aCampus'
import store from '../store';

export default class Campuses extends Component {
    constructor (props) {
        super(props);
        this.state = store.getState();
        this.renderCampusInfo = this.renderCampusInfo.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }
    componentWillMount ()   {
        store.dispatch(fetchCampuses());
        store.dispatch(fetchStudents());        
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }
    clickHandler(evt)   {
            const campus = this.state.campuses[evt.target.value];
            store.dispatch(setCampus(campus));
    }


    render ()   {
        console.log("here is the campus",this.state.aCampus)
        let currentCampus;
        if (Object.keys(this.state.aCampus))  {
            currentCampus = this.renderCampusInfo(this.state.aCampus)
        }

        return (
            <div id= 'main'>
                <div id = "campuses">
                    {
                        this.state.campuses.map((school, idx)=>   (
                            <button
                                onClick = {this.clickHandler}
                                key = {school.id}
                                value = {idx}
                                style = {{backgroundImage: `url(${school.image})`}}
                                className="singleCampus">
                                {school.name}
                                </button>
                            )
                        )
                    }
                </div>
                <div id="list">
                    {currentCampus}
                </div>
            </div>
    
        )
    }

    renderCampusInfo () {
        const id = this.state.aCampus.id;
        let attendies = [];
        attendies = this.state.students.filter(stud => stud.campusId === id);
        return (
            <div>
                    <p>{this.state.aCampus.name}</p>
                <table>
                <thead>
                    <tr>
                    <th>.</th>
                    <th>Student</th>
                    </tr>
                </thead>
                <tbody>
                {
                    attendies.map((stud, idx) => (
                        <tr key={stud.idx + stud.name}>
                        <td key={stud.idx}>{idx}</td>
                        <td key={stud.name}>{stud.name}</td>
                        </tr>
                    ))
                    }
                </tbody>
                </table>
            </div>
        )
    
    }
}






