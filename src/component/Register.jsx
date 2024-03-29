import React from 'react';
// import TextFieldComponent from '../component/TextfieldComponent';
import { TextField, Button } from '@material-ui/core';
import {registerUserVerify} from '../service/UserService';
import {Redirect} from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : "",
            name : "",
            responseGot : false
        }
        this.setValue = this.setValue.bind(this);
    }
    
    setValue(event) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    handleclick = () => {
        if(this.state.name !== "" && this.state.email !== "")
        {
            //for API
            // let request = {
            //     thread : "/registerUserVerify",
            //     data : {
            //         name : this.state.name,
            //         email : this.state.email
            //     }
            // }
            
            //for Event Emitter
            let request = {
                thread : "/registerUserVerifyEventEmitter",
                data : {
                    name : this.state.name,
                    email : this.state.email
                }
            }
            
            registerUserVerify(request)
            .then(res => {
                if (res) {
                    this.setState({
                        responseGot: true
                    })
                }
                else {
                    this.setState({
                        snackOpen: true,
                        snackMessage: "Error Occured"
                    })
                }
            })
        }
        else
        {
            console.log('error');            
        }        
    }

    render() {
        if(this.state.responseGot) return <Redirect to = "/" />
        return (
            <div className = "Form" >
            <div className = "formHeader">
            Register<span className = "beforeDashboardTitle" >Fundoo Notes</span> 
            </div>
            <div>
                <div>
                    <TextField label = "Name" name = "name" onChange = {this.setValue} value = {this.state.name} className = "nameTextFieldRegisterPage" ></TextField>
                </div>
                <div>
                    <TextField label = "Email" name = "email" onChange = {this.setValue} value = {this.state.email} className = "emailTextFieldRegisterPage" ></TextField>
                </div>
                <div>
                    <Button onClick = {this.handleclick.bind(this)} variant = "extendedFab" color="primary" className = "registerButtonRegisterPage" >Submit</Button>
                </div>
                <div>
                <span className = "CenterTextStyle" >Have an account? </span><a className = "links" href="/"> <b>Login</b> </a>
                </div>
            </div>
            </div>
        )        
    }
}

export default Register;