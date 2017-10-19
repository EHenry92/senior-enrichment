import React, {Component} from 'react';
import store from '../store';
import {postCampus} from '../reducers/campuses';

const schoolPhotos = [
    'http://cdn.bloody-disgusting.com/wp-content/uploads/2016/01/BD16_Asylum_9.jpg',
    'http://upload.wikimedia.org/wikipedia/commons/8/87/Loughboroughgrammarschooltowerblock.jpg',
    'http://weburbanist.com/wp-content/uploads/2010/05/stalkerschool.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDH25s1Rd1qFLwH9RkIZL8mVauG2cI_KqkRIwxQW9qp71vR5tl',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt4qmiyGDoQOi6eTTIzq0gWu0wGY-o9YDsB_5ko8HhTVR4eWvCvw'


]

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
                    <table className="table">
                        <thead>
                            <tr>
                            <th>Add A Student</th>
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
                    type="submit"
                    >Submit</button>
            </form>
            );
    }
}
