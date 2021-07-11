import React, { Component } from 'react';
import  { Redirect, Link } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'universal-cookie';

import Sidebar from './Sidebar';
import Navbar from './Navbar';

const cookies = new Cookies();

class Table extends Component {

    constructor(){
        super();

        this.state ={
            data: [],
            success_flag: 0,
            login: true
        };
    }

    authLogin(){
        let jwtToken = cookies.get('jwtToken');
        
        if (jwtToken === undefined){
            this.setState({
                login: false
            });
        }
    }
    
    componentWillMount(){
        this.authLogin();

        axios.get('http://localhost:3001/select')
        .then((response) =>{
            this.setState({
                data: response.data.return
            });
        })
    };

    delete(id){
        var self = this;
        axios.post('http://localhost:3001/delete', {
            id: id
        })
        .then(function(response){
            console.log(response);
            self.setState({
                data: response.data.return
            });
        });
    }

    edit(id){

    }

    addCart(id){
        let cookieCartList = cookies.get('cart_list');
        
        if (cookieCartList === undefined){
            cookies.set('cart_list', [id], { path: '/' });
        } else {
            let exist = false;
            for (var i=0; i<cookieCartList.length; i++){
                if (cookieCartList[i] === id){
                    exist = true;
                    break;
                }
            }

            if (!exist){
                cookieCartList.push(id);
                cookies.set('cart_list', cookieCartList, { path: '/' });
            }
        }

        cookieCartList = cookies.get('cart_list');

        this.setState({
            success_flag: 1
        });
    }

    render() {
        if (this.state.login === false) {
            return <Redirect to='/login' />
        }

        if (this.state.success_flag === 1){
            var success_flag = <div className="form-group">
                <br></br>
                <div class="alert alert-success" role="alert">
                    <strong>Well done! </strong>
                    <span>You successfully read this important alert message.</span>
                    <a href="#" class="alert-link">alert link</a>
                </div>
            </div>
        }

        const list_data = this.state.data.map((item, index)=> {
            return <tr>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td><img src={`http://localhost:3001/images/${item.filename}`} width="125" height="100" /></td>
                <td>
                    <Link to={`edit/${item.id}`}><button className='btn btn-warning'>Update</button></Link> <button className='btn btn-danger' onClick={() => this.delete(item.id)}>Delete</button></td>
                <td><button className='btn btn-primary' onClick={() => this.addCart(item.id)}>Add to Cart</button></td>
            </tr>
        })

        return (
            <section id="admin">
            <Sidebar />
            <div class="content">
              <Navbar />
                <div className="col-md-12">
                    {success_flag}
                    <div className="widget p-lg">
                    <h4 className="m-b-lg">List</h4>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                {list_data}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </section>
        );
    }
}

export default Table;
