import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

class Navbar extends Component {
    constructor(){
        super();

        this.state ={
            login: true,
            username: ''
        };
    }

    componentWillMount(){
        var self = this;

        axios.post('http://localhost:3001/admindata', {
            token: cookies.get('jwtToken')
        }).then(function(response){
            console.log(response);
            self.setState({
                username: response.data.return.username
            })
        }).catch(function(err){
            console.log(err);

            self.setState({
              success_flag: 2
            });
        });
    }

    logout(){
        cookies.remove('jwtToken');

        this.setState({
            login: false
        })
    }

    render() {
        if (this.state.login === false) {
            return <Redirect to='/login' />
        }

        return (
            <div className="head">
                <div className="top">
                    <div className="left">
                    <button id="on" className="btn btn-info"><i className="fa fa-bars" /></button>
                    <button id="off" className="btn btn-info hide"><i className="fa fa-align-left" /></button>
                    <button className="btn btn-info hidden-xs-down"><i className="fa fa-expand-arrows-alt" /></button>
                    <button className="btn btn-info hidden-xs-down"><i className="fa fa-home" />Back Home</button>
                    </div>
                    <div className="right">
                    <button className="btn btn-info hidden-xs-down"><i className="fa fa-bell" /></button>
                    <button className="btn btn-info hidden-xs-down"><i className="fa fa-envelope" /></button>
                    <div className="dropdown">
                        <button className="btn btn-info dropdown-toggle" id="userDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.username}</button>
                        <div className="dropdown-menu" aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="#" onClick={() => this.logout()}>Logout</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="left">
                    <h1>dashboard</h1>
                    </div>
                    <div className="right">
                    <h1>dashboard /</h1>
                    <a href="#">page name</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;
