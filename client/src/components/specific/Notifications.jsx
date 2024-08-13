import React, { memo } from 'react'
import Dialog from '@mui/material/Dialog'
import { Avatar, Button, DialogTitle, IconButton, InputAdornment, List, ListItemText, Stack, TextField, Typography } from '@mui/material'
import { sampleNotifications } from '../../constants/SampleData'

function Notifications() {
  const friendRequestHandler = ({_id, accept}) => {
    // Accept or reject friend request
  }

  return (
    <Dialog open>
      <Stack p={ {
        xs: "1rem",
        sm: "2rem"
      } }
      maxWidth={"25rem"} >
      <DialogTitle >Notifications</DialogTitle>
        {
          sampleNotifications.length > 0 ? (
            sampleNotifications.map((notification) => <NotificationItem
              sender={ notification.sender }
              _id={ notification._id }
              handler={ friendRequestHandler }
              key={ notification._id }
            />)
          ) : (
            <Typography textAlign={ "center" }>No Notifications</Typography>
          )
        }
      </Stack>
  </Dialog>
  )
}

const NotificationItem = memo(({ sender, _id, handler }) => { 
  const { name, avatar } = sender;
  return (
    <ListItemText>
      <Stack
        direction={ "row" }
        alignContent={ "center" }
        spacing={ "1rem" }
        width={ "100%" }
      >
        <Avatar />
        <Typography
          variant="body1"
          noWrap 
          
          sx={ {
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%"
          } }
        >{ `${name} sent you a friend request` }</Typography>
       
        <Stack direction={ {
          xs: "column",
          sm: "row"
        }}>
          <Button onClick={() => handler({_id, accept: true})}>Accept</Button>
          <Button color='error' onClick={ () => handler({ _id, accept: false }) }>Reject</Button>
        </Stack>

      </Stack>
    </ListItemText>
  )
}) 

export default Notifications  