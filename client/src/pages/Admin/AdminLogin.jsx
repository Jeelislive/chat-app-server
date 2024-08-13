import React from 'react'
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import bgimage from '../../assets/bgchatapp.jpg'
import { useInputValidation } from '6pp'
import { Navigate } from 'react-router-dom';

const isAdmin = true;

const AdminLogin = () => {

    const secretKey = useInputValidation("");




const submitHandler = (e) => {  
    e.preventDefault();
    console.log("submit");
    
    }

    if(isAdmin) return <Navigate to="/admin/dashboard" />

  return (
    <div
    style={ { 
    background: `url(${ bgimage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    } }
  >  
  <Container component={ "main" } maxWidth="xs" sx={ {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } }>
    <Paper elevation={ 3 } sx={ {
      padding: 4,
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
    } }>
      
            <Typography variant="h5">Admin Login </Typography>
            <form style={ {
              width: '100%',
              marginTop: '1rem'
            } }
              onSubmit={ submitHandler }>
              <TextField
                required
                fullWidth
                label="Secret Key"
                type="password"
                margin='normal'
                variant='outlined'
                value={ secretKey.value }
                onChange={ secretKey.changeHandler }
              />
              <Button
                sx={ { marginTop: "1rem" } }
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
              >
                Login
              </Button>

            </form>
         
    </Paper>
    </Container>
  </div>
  )
}

export default AdminLogin