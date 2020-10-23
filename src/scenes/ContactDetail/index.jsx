import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Grid, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
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
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  textContent: {
    fontSize: '18px',
    textAlign: 'left',
  },
  avatar: {
    maxWidth: '250px',
    height: '250px',
    margin: 'auto',
  },
  button: {
    background: '#1DBBCF',
    padding: '6px',
    color: 'white'
  }
})

const ContactDetail = () => {
  const { user } = useUser();
  const classes = useStyles();
  const history = useHistory();

  const handleReturn = () => {
    history.push('/')
  }

  let userInfo = []

  for (let property in user) {
    if (property === 'id' || property === 'avatar') {
      continue;
    }
    let label = `${property.charAt(0).toUpperCase()}${property.replace("_", " ").slice(1)}`
    userInfo.push(
      <Grid key={property} >
        <Typography className={classes.smallTitle}>{label}</Typography>
        <Typography className={classes.textContent}>{user[property]}</Typography>
      </Grid>
    )
  }

  return (
    <Container className={classes.container}>
      <Grid>
        <Typography className={classes.title}>User detail</Typography>
      </Grid>
      <Grid >
        <Grid style={{ float: 'left' }}>
          <img alt={user.first_name} src={user.avatar} className={classes.avatar} />
          {userInfo}
        </Grid>
        <Grid style={{ float: 'right' }}>
          <Button className={classes.button} onClick={handleReturn}>
            RETURN
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ContactDetail;