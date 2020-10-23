import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import { Button, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  modal: {
    height: '100%',
    padding: '5% 5% 5% 5%',
  },
  row: {
    padding: '5px',
  },
  button: {
    background: '#1DBBCF',
    padding: '6px',
    color: 'white'
  }
});

const emptyUser = {
  id: 0,
  email: '',
  first_name: '',
  last_name: '',
  avatar: 'https://cdn11.bigcommerce.com/s-hcp6qon/stencil/e7115e30-d125-0138-2c47-0242ac110007/icons/icon-no-image.svg'
};

const UserModal = (props) => {
  const classes = useStyles();
  const [user, setUser] = useState({ ...emptyUser });

  useEffect(() => {
    if (props.user && !props.isAddUser) {
      console.log('Entro! if')
      setUser(props.user);
    } else {
      setUser({ ...emptyUser });
    }
  }, [props.user, props.isAddUser]);

  const onChage = (property, value) => {
    const newUser = { ...user };
    newUser[property] = value;
    setUser(newUser);
  }

  const uploadImage = (event, action) => {
    event.preventDefault();
    let file = event.target.files[0];
    let reader = new FileReader();
    if (event.target.files.length === 0) {
      return;
    }
    reader.onloadend = (e) => {
      setUser(prev => ({ ...prev, avatar: [reader.result] }));
    }
    reader.readAsDataURL(file);
  }

  let userObject = []

  for (let property in user) {
    if (property === 'id' || property === 'avatar') {
      continue;
    }
    let label = `${property.charAt(0).toUpperCase()}${property.replace("_", " ").slice(1)}`
    userObject.push(
      <Grid key={property} item xs={12} sm={9} className={classes.row}>
        <TextField
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          label={label}
          value={user[property]}
          onChange={(e) => onChage(property, e.target.value)}
        />
      </Grid>
    )
  }

  return (
    <Dialog
      maxWidth='sm'
      fullWidth
      open={props.open}
    >
      {(props.isAddUser)}
      <Grid style={{ float: 'left', padding: '5%' }}>
        <img
          alt={user.first_name}
          src={user.avatar}
          style={{ height: '150px', width: '150px' }}
        />
      </Grid>
      <Grid className={classes.modal}>
        {(userObject)}
        <Grid key={'image'} item xs={12} sm={9} className={classes.row}>
          <TextField
            type={'file'}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            label={'Avatar'}
            value={''}
            onChange={uploadImage}
          />
        </Grid>
        <Grid style={{ float: 'right' }}>
          <Button className={classes.button} onClick={props.closeModal}>
            CANCEL
        </Button>
          <Button className={classes.button} onClick={(e) => props.saveModal(user)}>
            SAVE
        </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default UserModal;