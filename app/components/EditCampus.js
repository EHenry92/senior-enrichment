import React, {Component} from 'react';
import store from '../store';
import {putCampus} from '../reducers/campuses';
import schoolPhotos from '../../public/schoolPhotos';



export default class EditCampus extends Component {
    constructor(props)   {
        super(props);
        this.state = store.getState();
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        
    }
    componentWillMount ()   {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }
    componentWillUnmount()  {
        this.unsubscribe();
    }

    submitHandler (event)  {
        event.preventDefault();
        const state = this.state;
        let campus = {id: state.campuses.campus.id};
        if (state.cName) {campus.name = state.cName;}
        if (state.picId) {campus.image = schoolPhotos[state.picId]}
        store.dispatch(putCampus(campus))
    }

    changeHandler (event)    {
        event.preventDefault();
        if (event.target.name === 'cName')  {
            return this.setState({cName: event.target.value});

        }
        else if (event.target.name === 'select')    {
            return this.setState({picId: event.target.value})
        }
    }

    render ()   {
        const cur = this.state.campuses.campus;
        return (
            <form id="addStudent" onSubmit={this.submitHandler}>
                    <table className="table">
                        <thead>
                            <tr>
                            <th>Edit {cur.name}</th>
                            </tr>
                        </thead>
                            <tbody>
                                <tr>
                                    <td>Name: </td>
                                    <td> <input placeholder="Campus Name" onChange={this.changeHandler} name="cName" /></td>
                                </tr>
                                <tr>
                                    <td> Image: </td>
                                    <td>
                                        <select onChange={this.changeHandler} name="select">
                                        {
                                            schoolPhotos.map((photo, idx)=>
                                                <option value={idx} key={photo}>{photo.slice(0, 3)}</option>
                                            )
                                        }
                                        </select>
                                    </td>
                                </tr>
                        </tbody>
                    </table>
                    <button
                    className="submit-button"
                    type="submit"
                    >Submit</button>
            </form>
            );
    }
}