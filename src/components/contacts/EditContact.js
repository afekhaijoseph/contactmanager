import React, { Component } from 'react';
import {Consumer} from '../../context';
import TextInputGroup from '../layout/TextInputGroup'
import axios from 'axios'

class EditContact extends Component {
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



        const updateContact = {
            name,
            email,
            clan,
        }
        const {id} = this.props.match.params;
        const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updateContact)
        const data = res.data;
        dispatch({ type:'UPDATE_CONTACT', payload:data})

        this.setState ({
            name : '',
            email : '',
            clan : '',
            error : {}      
        })

        this.props.history.push('/');


    }

    async componentDidMount(){
        const {id} = this.props.match.params;
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        const contact = res.data;

        this.setState({
            name: contact.name,
            email:contact.email,
            clan:contact.phone,
        })
    }

    render() {
        const {name, email, clan, error} = this.state;
        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    
                    return (
                        <div className="card mb-3">
                            <div className="card-header">Edit contact</div>
                            <div className="card-body">
                                    <div className="form-group">
                                    <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                        <TextInputGroup label="Name" name="name" placeholder="Enter Name ..." value={name} onChange={this.onChange} error={error.name}/>
                                        <TextInputGroup label="Email" name="email" placeholder="Enter Email ..." value={email} onChange={this.onChange} error={error.email}/>
                                        <TextInputGroup label="Clan" name="clan" placeholder="Enter Clan ..." value={clan} onChange={this.onChange} error={error.clan}/>
                                    <input type="submit" value="Update Contact" className="btn btn-dark btn-block"/>
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

export default EditContact;