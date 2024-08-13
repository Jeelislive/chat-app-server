import React, { useState } from 'react'
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VisuallyHiddenInputComponent from '../components/styles/StyledComponents'
import { useInputValidation, useStrongPassword} from '6pp'
import { usernameValidator } from '../utils/validators';
import { useFileHandler } from '6pp';
import bgimage from '../assets/bgchatapp.jpg'

function Login() {
  let [ isLogedIn, setIsLogedIn ] = useState(true);
  const toggelLogin = () => setIsLogedIn((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useStrongPassword();
  const avatar = useFileHandler('single');

  const handleSignUp = (e) => {
    e.preventDefault();
  }

  
  const handlelogin = (e) => {
    e.preventDefault();
  }

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
        {
          isLogedIn ? (
            <>
              <Typography variant="h5"> Login </Typography>
              <form style={ {
                width: '100%',
                marginTop: '1rem'
              } }
                onSubmit={ handlelogin }>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  type='text'
                  margin='normal'
                  variant='outlined'
                  value={ name.value }
                  onChange={ name.changeHandler }
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type='password'
                  margin='normal'
                  variant='outlined'
                  value={ password.value }
                  onChange={ password.changeHandler }
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
                <Typography textAlign={ 'center' } m={ "1rem" }>OR</Typography>
                <Button
                  fullWidth
                  variant='text'
                  onClick={ toggelLogin }
                >
                  Sign Up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5"> Sign Up </Typography>
              <form style={ {
                width: '100%',
                marginTop: '1rem'
              } }
                onSubmit={ handleSignUp }>
                <Stack position={ 'relative' } width={ "10rem" } margin={ "auto" }>
                  <Avatar sx={ {
                    width: '10rem',
                    height: '10rem',
                    objectFit: "contain",
                      
                  } }
                    src={ avatar.preview }
                  />

                  <IconButton sx={ {
                        position: 'absolute',
                    bottom: 0,
                    right: 0,
                    color: 'white',
                    bottom: 0,
                    bgcolor: "rgba(0,0,0,0.5)",
                    ":hover": {
                      bgcolor: "rgba(0,0,0,0.7)"
                    }
                  } }
                    component="label"
                  >
                    <>
                      <VisuallyHiddenInputComponent onChange={ avatar.changeHandler } type="file" />
                      <CameraAltIcon />
                    </>
                  </IconButton>
                </Stack>
                {
                  avatar.error && (
                    <Typography m={ "1rem auto" }
                      width={ "fit-content" }
                      display={ "block" }
                      color='error'
                      variant='caption'>{ avatar.error }</Typography>
                  ) }

                <TextField
                  required
                  fullWidth
                  label="Name"
                  type='text'
                  margin='normal'
                  variant='outlined'
                  value={ name.value }
                  onChange={ name.changeHandler }
                />
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  type='text'
                  margin='normal'
                  variant='outlined'
                  value={ bio.value }
                  onChange={ bio.changeHandler }
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  type='text'
                  margin='normal'
                  variant='outlined'
                  value={ username.value }
                  onChange={ username.changeHandler }
                />
                {
                  username.error && (
                    <Typography color='error' variant='caption'>{ username.error }</Typography>
                  ) }
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type='password'
                  margin='normal'
                  variant='outlined'
                  value={ password.value }
                  onChange={ password.changeHandler }
                />
                {
                  password.error && (
                    <Typography color='error' variant='caption'>{ password.error }</Typography>
                  ) }
                <Button
                  sx={ { marginTop: "1rem" } }
                  type='submit'
                  variant='contained'
                  color='primary'
                  fullWidth
                >
                  Sign Up
                </Button>
                <Typography textAlign={ 'center' } m={ "1rem" }>OR</Typography>
                <Button
                  fullWidth
                  variant='text'
                  onClick={ toggelLogin }
                >
                  Login Instead
                </Button>
              </form>
            </>
          )
        }
      </Paper>
      </Container>
    </div>
  )
}

export default Login;