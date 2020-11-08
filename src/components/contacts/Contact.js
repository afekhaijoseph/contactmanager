import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Consumer} from '../../context';
import axios from 'axios';
import {Link} from 'react-router-dom';


class Contact extends Component {
    state = {
        showContactInfo : false
    }

    onShowClick = () => {
        this.setState({showContactInfo : !this.state.showContactInfo});  
    }
 
    async onDeleteClick (id, dispatch) {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        dispatch({type:'DELETE_CONTACT', payload: id})
        
        
    }

    render() {
        const {id, name, email, clan} = this.props.contact;
        const {showContactInfo} = this.state;
        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    return (
                        <div className="card card-body mb3">
                            <h3>{name} {' '} 
                            <i className ="fas fa-sort-down" style = {{cursor : "pointer"}} onClick={this.onShowClick}></i>
                            <i className = "fas fa-times" style={{cursor : "pointer", color:"red", float:"right" }} onClick={this.onDeleteClick.bind(this, id, dispatch)}></i>
                            <Link to={`/contacts/edit/${id}`}> <i className="fas fa-pencil-alt" style={{
                                cursor:'pointer',
                                float : 'right',
                                color : 'black',
                                marginRight : '1rem'
                            }}></i> </Link>
                            </h3>
                            {showContactInfo ? <ul className="list-group">
                                <li className="list-group-item">Name : {name}</li>
                                <li className="list-group-item">Email : {email}</li>
                                <li className="list-group-item">Clan : {clan}</li>
                            </ul> : null}    
                        </div>

                    )
                }}
            </Consumer>
            
        )
    }
}

Contact.propTypes = {
    contact : PropTypes.object.isRequired,
}

export default Contact