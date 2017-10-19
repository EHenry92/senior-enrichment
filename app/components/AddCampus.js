import React, {Component} from 'react';
import store from '../store';
import {postCampus} from '../reducers/campuses';
import schoolPhotos from '../../public/schoolPhotos';


export default class AddCampus extends Component {
    constructor(props)   {
        super(props);
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        
    }

    submitHandler (event)  {
        event.preventDefault();
        const state = this.state;
        if (state.cName && state.picId)    {
            const campus = {
            name: state.cName,
            image: schoolPhotos[state.picId]
            }
            store.dispatch(postCampus(campus))

        }
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
        return (
            <form id="addStudent" onSubmit={this.submitHandler}>
                    <table>
                        <thead>
                            <tr>
                            <th>.</th>
                            <th>Add A Campus</th>
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
