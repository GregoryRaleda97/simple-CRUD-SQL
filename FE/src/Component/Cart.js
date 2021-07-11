import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'universal-cookie';

import Sidebar from './Sidebar';
import Navbar from './Navbar';

const cookies = new Cookies();

class Cart extends Component {

    constructor(){
        super();

        this.state ={
            data: [],
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
        this.getCart();
    };

    getCart(){
        let cookieCartList = cookies.get('cart_list');

        axios.post('http://localhost:3001/cart', {
            ids: cookieCartList
        })
        .then((response) =>{
            console.log(response);

            this.setState({
                data: response.data.return
            });
        })
    }

    deleteCart(id){
        let cookieCartList = cookies.get('cart_list');
        
        for (var i=0; i<cookieCartList.length; i++){
            if (cookieCartList[i] === id) cookieCartList.splice(i, 1);
        }

        cookies.set('cart_list', cookieCartList, { path: '/' });

        this.getCart();
    }

  render() {
    if (this.state.login === false) {
        return <Redirect to='/login' />
    }

    const list_data = this.state.data.map((item, index)=> {
        return <tr>
            <td>{index+1}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td><img src={`http://localhost:3001/images/${item.filename}`} width="125" height="100" /></td>
            <td><button className='btn btn-danger' onClick={() => this.deleteCart(item.id)}>Delete</button></td>
        </tr>
    })

    return (
        <section id="admin">
            <Sidebar />
            <div class="content">
                <Navbar />
                <div className="col-md-12">
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

export default Cart;
