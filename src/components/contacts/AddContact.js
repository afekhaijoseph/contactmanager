import React, { Component } from 'react';
import {Consumer} from '../../context';
import TextInputGroup from '../layout/TextInputGroup'
import axios from 'axios'

class AddContact extends Component {
    state = {
        name : '',
        email : '',
        clan : '',
        error : {}
    }

    onChange = e => this.setState({[e.target.name] : e.target.value})

    async onSubmit (dispatch, event) {
        event.preventDefault();
        const {name, email, clan} = this.state;
        if(name === ""){
            this.setState({error : {
                name : "Name is required"
            }})
            return;
        }

        if(email === ""){
           this.setState({error : {
                email : "Email is required"
            }})
            return;
        }

        if(clan === ""){
            this.setState({error : {
                clan : "Clan is required"
            }})
            return;
        }

        const newContact = {
            name,
            email,
            clan,
        }

        const res = await axios.post('https://jsonplaceholder.typicode.com/users/', newContact)
        const data = res.data;
        dispatch({ type:'ADD_CONTACT', payload:data})

        this.setState ({
            name : '',
            email : '',
            clan : '',
            error : {}      
        })

        this.props.history.push('/');
    }

    render() {
        const {name, email, clan, error} = this.state;
        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    
                    return (
                        <div className="card mb-3">
                            <div className="card-header">Add contact</div>
                            <div className="card-body">
                                    <div className="form-group">
                                    <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                        <TextInputGroup label="Name" name="name" placeholder="Enter Name ..." value={name} onChange={this.onChange} error={error.name}/>
                                        <TextInputGroup label="Email" name="email" placeholder="Enter Email ..." value={email} onChange={this.onChange} error={error.email}/>
                                        <TextInputGroup label="Clan" name="clan" placeholder="Enter Clan ..." value={clan} onChange={this.onChange} error={error.clan}/>
                                    <input type="submit" value="Add Contact" className="btn btn-dark btn-block"/>
                                    </form>
                                    </div>
                               
                            </div>
                            
                        </div>

                    )
                }}
            </Consumer>

            
        )
    }
}

export default AddContact;
