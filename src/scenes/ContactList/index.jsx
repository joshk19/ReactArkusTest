import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useHistory } from 'react-router-dom';
import FindInPageRoundedIcon from '@material-ui/icons/FindInPageRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import Tooltip from '@material-ui/core/Tooltip';
import UserModal from '../../components/UserModal';
import useUser from '../../contexts/UserContexts/UserContext';

const useStyles = makeStyles({
  container: {
    padding: '4% 0%',
  },
  title: {
    fontSize: '38px',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingBottom: '25px'
  },
  smallTitle: {
    fontSize: '25px',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  addUserButton: {
    background: '#1DBBCF',
    color: 'white'
  },
  tableHead: {
    '& th': {
      fontWeight: 'bold',
      textAlign: 'left',
    },
  },
  rowActions: {
    '& *': {
      cursor: 'pointer'
    }
  }
});

const ContactList = () => {
  const classes = useStyles();
  const history = useHistory();
  const { usersList, addNewUser, editUser, deleteUser, setUser } = useUser();
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [isAddUser, setIsAddUser] = useState(false);

  const handleViewDetail = (userId) => {
    const newUsers = [...users];
    const newUser = newUsers.find(p => p.id === userId);
    console.log('detailUser', newUser);
    setUser(newUser);
    history.push('/contact-detail');
  }

  const handleEditUser = (index) => {
    const user = users[index];
    setSelectedUser(user);
    setOpenModal(true);
    setIsAddUser(false);
  }

  const handleNewUser = () => {
    setOpenModal(true);
    setIsAddUser(true);
  }

  const handleDeleteUser = (userId) => {
    const deleteUsers = [...users];
    const deletedUser = deleteUsers.find(p => p.id === userId);
    deleteUser(deletedUser);
  }

  const handleSaveModal = (newUser) => {
    const newUsers = [...users];
    if(!isAddUser){
      setIsAddUser(true);
      editUser(newUser)
    }
    else{
      let ids = usersList.map(a => a.id);
      newUser.id = Math.max(...ids) + 1;
      newUsers.push({...newUser});
      setTotalUsers(totalUsers + 1);
      setIsAddUser(false);
      addNewUser(newUser);
    }
    setOpenModal(false);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  useEffect(() => {
    const callGetUsers = async () => {
      if (usersList) {
        setUsers(usersList);
        setIsLoading(false);
        setTotalUsers(usersList.length);
      }
    }
    callGetUsers();
  }, [usersList]);

  return (
    <Container className={classes.container}>
      <Grid container style={{}}>
        <Typography className={classes.title} > Contact List </Typography>
      </Grid>
      <Grid style={{ float: 'right' }}>
        <Button
          className={classes.addUserButton}
          onClick={handleNewUser}
        >
          Add new user
        </Button>
      </Grid>
      <Grid>
        <Typography className={classes.smallTitle}>Contacts</Typography>
        <TableContainer>
          <Table>
            <TableHead style={{ fontWeight: 'bold' }}>
              <TableRow className={classes.tableHead}>
                <TableCell>
                  Image
                </TableCell>
                <TableCell>
                  Id
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  First name
                </TableCell>
                <TableCell>
                  Last name
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? <Grid style={{ textAlign: 'center' }}>loading...</Grid>
                :
                users.map((item, index) => (
                  <TableRow key={index} >
                    <TableCell>
                      <img alt={item.first_name} src={item.avatar} style={{ height: '50px', width: '50px' }} />
                    </TableCell>
                    <TableCell>
                      {item.id}
                    </TableCell>
                    <TableCell>
                      {item.email}
                    </TableCell>
                    <TableCell>
                      {item.first_name}
                    </TableCell>
                    <TableCell>
                      {item.last_name}
                    </TableCell>
                    <TableCell className={classes.rowActions}>
                      <Tooltip title='Details' placement='top-start'>
                        <FindInPageRoundedIcon
                          onClick={(e) => handleViewDetail(item.id)}
                        />
                      </Tooltip>
                      <Tooltip title='Edit' placement='top'>
                        <EditRoundedIcon
                          onClick={(e) => handleEditUser(index)}
                        />
                      </Tooltip>
                      <Tooltip title='Delete' placement='top-end'>
                        <DeleteForeverRoundedIcon
                          onClick={(e)=> handleDeleteUser(item.id)}
                        />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <UserModal
        isAddUser={isAddUser}
        open={openModal}
        user={selectedUser}
        closeModal={handleCloseModal}
        saveModal={handleSaveModal}
      />
    </Container>
  )
}

export default ContactList;