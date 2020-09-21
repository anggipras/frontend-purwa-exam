import React, { Component } from 'react';
import Header from '../../components/Header'
import './listprod.css'
import { 
    Breadcrumb, BreadcrumbItem, Card, CardImg} from 'reactstrap';
import Axios from 'axios'
import {Link} from 'react-router-dom'
import { API_URL,priceFormatter } from '../../helpers/idrformat';

class ListProd extends Component {
    state = {
        Products:[],
        filterProd: ''
      }

    componentDidMount(){
        Axios.get(`${API_URL}/products`)
        .then((res)=>{
            console.log(res.data)
            this.setState({Products:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    // renderCard=()=>{
    //     return this.state.Products.filter(val => Object.keys(val).includes(this.state.filterProd)).map((val)=>{
    //         return(
    //             <div key={val.id} className="col-md-3 px-2 py-2">
    //                 <Link to={'/products/'+val.id}>
    //                     <Card className='kartu card-rounded'>
    //                         <CardImg top width="100%" className='card-rounded' height={200} src={val.gambar} alt="Card image cap" />
    //                         <div className="overlay card-rounded">
    //                             <div className="text">
    //                                 <div>
    //                                     {val.namatrip}
    //                                 </div>
    //                                 <div>
    //                                     {priceFormatter(val.harga)}
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </Card>
    //                 </Link>
    //             </div>
    //         )
    //     })
    // }

    onSearchBar = (e) => {
        this.setState({filterProd: e.target.value})
    }

    render() {
        const { filterProd, Products } = this.state;
        const lowercasedFilter = filterProd.toLowerCase();
        const filteredData = Products.filter(item => {
            return Object.keys(item).some(key =>
                typeof item[key] === "string" && item[key].toLowerCase().includes(lowercasedFilter)
            );
        });
        console.log(filteredData)
        
        return (
            <div>
                <Header/>
                <div className='pt-3 px-4'>
                    <div className='d-flex justify-content-between'>
                        <Breadcrumb className='tranparant m-0 px-2'>
                            <BreadcrumbItem ><Link className='link-class' to="/">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Products</BreadcrumbItem>
                        </Breadcrumb>
                        <input value={this.state.filterProd} onChange={this.onSearchBar} type="text" class="form-control" placeholder="Search City" style={{width: '15%', marginTop: '1%', marginRight: '1%'}}/>
                    </div>
                    <div className="row p-0 m-0">
                        {/* {this.renderCard()} */}
                        {
                            filteredData.map(val => {
                                if(val.tanggalmulai > new Date().getTime()) {
                                    return(
                                        <div key={val.id} className="col-md-3 px-2 py-2">
                                            <Link to={'/products/'+val.id}>
                                                <Card className='kartu card-rounded'>
                                                    <CardImg top width="100%" className='card-rounded' height={200} src={val.gambar} alt="Card image cap" />
                                                    <div className="overlay card-rounded">
                                                        <div className="text">
                                                            <div>
                                                                {val.namatrip}
                                                            </div>
                                                            <div>
                                                                {priceFormatter(val.harga)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Link>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
         );
    }
}
 
export default ListProd;