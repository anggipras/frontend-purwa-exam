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
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {API_URL} from '../../helpers/idrformat'
import ButtonUi from './../../components/button'
import Axios from 'axios'
import {connect} from 'react-redux'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 580,
  },
});

function ConfirmAdmin() {
  const classes = useStyles();
  const [modaledit, setModaledit] = useState(false);

  // const [editform,seteditform]=useState({
  //   namaTrip:useRef(),
  //   gambar:useRef(),
  //   tanggalmulai:useRef(),
  //   tanggalberakhir:useRef(),
  //   harga:'',
  //   descripsi:useRef()
  // })

  const [indexedit,setindexedit]=useState(0)
  const [transactions,setTransactions]=useState([])

  useEffect(()=>{
    Axios.get(`${API_URL}/transactions?status=WaitingAdmin&_expand=user`)
    .then((res)=> {
        setTransactions(res.data)
    }).catch((err)=> {
        console.log(err)
    })
  },[])

  const dateFormat=(n)=>{
    var today = new Date(n);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today
  }

  const onEditClick= (index)=>{
    setindexedit(index)
    setModaledit(true)
  }

  const onUpdateClick =(id)=>{
    Axios.patch(`${API_URL}/transactions/${id}`,{
        status: 'Completed'
    })
    .then(()=>{
      Axios.get(`${API_URL}/products`)
        .then((res)=>{
          setTransactions([])
          setModaledit(false)
        }).catch((err)=>{
          console.log(err)
        })
    })
  }

  const renderTable=()=>{
    return transactions.map((val,index)=>{
      return(
        <TableRow key={val.id}>
            <TableCell>{index+1}</TableCell>
            <TableCell>{val.user.username}</TableCell>
            <TableCell>
                <div style={{maxWidth:'200px'}}>
                    <img width='100%' height='100%' src={val.paymentinvoice} alt={val.paymentinvoice} />
                </div>
            </TableCell>
            <TableCell>{val.status}</TableCell>
            <TableCell>{dateFormat(val.tanggalPembayaran)}</TableCell>
            <TableCell>
                <ButtonUi onClick={()=> onEditClick(index)}>
                    See Transactions
                </ButtonUi>
            </TableCell>
        </TableRow>
      )
    })
  }

  const toggleedit = () => setModaledit(!modaledit);

    return (
        <div style={{background: 'linear-gradient(180deg, #6bfefe81 10%, #fafafa 70%)'}}>
          {
            transactions.length?
              <Modal isOpen={modaledit} toggle={toggleedit} >
                  <ModalHeader toggle={toggleedit}>USER: {transactions.length? transactions[indexedit].user.username : ''}</ModalHeader>
                  <ModalBody>
                    <div style={{maxWidth:'500px'}}>
                        <img width='100%' height='100%' src={transactions[indexedit].paymentinvoice} alt={transactions[indexedit].paymentinvoice}/>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                      <Button color="primary" onClick={()=>onUpdateClick(transactions[indexedit].id)}>Update Payment</Button>
                      <Button color="secondary" onClick={toggleedit}>Cancel</Button>
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
                          <TableCell>User</TableCell>
                          <TableCell>Invoice</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Payment Date</TableCell>
                          <TableCell>Transactions</TableCell>
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

export default connect(MapstatetoProps) (ConfirmAdmin);