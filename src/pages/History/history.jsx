import React, {useState, useEffect} from 'react';
import Header from '../../components/Header'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {API_URL, priceFormatter} from '../../helpers/idrformat'
import ButtonUi from './../../components/button'
import Axios from 'axios'
import {connect} from 'react-redux'

const useStyles = makeStyles({
    root: {
      width: '60%',
      marginLeft: '20%',
      marginTop: '3%'
    },
    container: {
      maxHeight: 580,
    },
  });

function History(props) {
    const classes = useStyles();
    const [modaldetails, setModalDetails] = useState(false);
  
    const [indexDetails, setDetails]=useState(0)
    const [history, setHistory]=useState([])
    const [thedetails, setTheDetails] = useState([])
  
    useEffect(()=>{
      Axios.get(`${API_URL}/transactions?userId=${props.match.params.id}&_embed=transactionsdetails`)
      .then((res)=> {
          setHistory(res.data)
          console.log(res.data)
      }).catch((err)=> {
          console.log(err)
      })
    },[])
  
    const dateFormat=(n)=>{
      var today = new Date(n);
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
  
      today = dd + '-' + mm + '-' + yyyy;
      return today
    }
  
    const onDetailsClick= (index)=>{
      setDetails(index)
      setModalDetails(true)
      Axios.get(`${API_URL}/transactionsdetails?transactionId=${history[index].id}&_expand=product`)
        .then((res2)=> {
            setTheDetails(res2.data)
            console.log(res2.data)
        }).catch((err)=> {
            console.log(err)
        })
    }

    const renderDetails = () => {
      console.log(thedetails)
        return thedetails.map((val, index)=> {
            return(
                <TableRow key={val.id}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{val.product.namatrip}</TableCell>
                    <TableCell>
                        <div style={{maxWidth:'200px'}}>
                            <img width='100%' height='100%' src={val.product.gambar} alt={val.product.namatrip}/>
                        </div>
                    </TableCell>
                    <TableCell>{val.qty}</TableCell>
                    <TableCell>{priceFormatter(val.price)}</TableCell>
                    <TableCell>{priceFormatter(val.price*val.qty)}</TableCell>
                </TableRow>
            )
        })
    }

    const renderTotalPrice=()=>{
        var total = thedetails.reduce((total,num)=>{
            return total + (num.price * num.qty)
        },0)
        return total
    }

    const renderTable=()=>{
      return history.map((val,index)=>{
        return(
          <TableRow key={val.id}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{val.metode}</TableCell>
              <TableCell>{dateFormat(val.tanggalPembayaran)}</TableCell>
              <TableCell>
                  <ButtonUi onClick={()=> onDetailsClick(index)}>
                      Details
                  </ButtonUi>
              </TableCell>
          </TableRow>
        )
      })
    }
  
    const toggledetails = () => setModalDetails(!modaldetails);
  
      return (
          <div style={{background: 'linear-gradient(180deg, #6bfefe81 10%, #fafafa 70%)'}}>
            {
              history.length?
                <Modal size='lg' isOpen={modaldetails} toggle={toggledetails} >
                    <ModalHeader toggle={toggledetails}>Details</ModalHeader>
                    <ModalBody>
                        <TableContainer >
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No.</TableCell>
                                        <TableCell>Name of Product</TableCell>
                                        <TableCell style={{width:'200px'}}>Image</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Subtotal Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {renderDetails()}
                                </TableBody>
                                <TableFooter>
                                    <TableCell colSpan={4}></TableCell>
                                    <TableCell style={{fontWeight:'700', color:'black', fontSize:20}}>Subtotal Price</TableCell>
                                    <TableCell style={{color:'black', fontSize:20}}>{priceFormatter(renderTotalPrice())}</TableCell>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </ModalBody>
                    <ModalFooter>
                        <ButtonUi onClick={toggledetails}>
                            OK
                        </ButtonUi>
                    </ModalFooter>
                </Modal>
              :
              null
            }
  
            <Header/>
            <div className='px-5 my-3'>
                <Paper className={classes.root}>
                  <TableContainer className={classes.container}>
                      <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                          <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Payment Method</TableCell>
                            <TableCell>Payment Date</TableCell>
                            <TableCell>Details</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {renderTable()}
                      </TableBody>
                      </Table>
                  </TableContainer>
                </Paper>
            </div>
          </div>
      );
  }
  
  const MapstatetoProps=({Auth})=>{
    return{
      ...Auth
    }
  }
  
  export default connect(MapstatetoProps) (History);