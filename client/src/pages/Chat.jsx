import React, { Fragment } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Stack } from '@mui/material'
import { grayColor } from '../constants/color';
import { useRef } from 'react';
import { AttachFile as AttachFileIcon } from '@mui/icons-material';
import { Send as SendIcon } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import { orange } from '../constants/color';
import { sampleMessages } from '../constants/SampleData';
import MessageComponent from './../components/shared/MessageComponent';

function Chat() {
  const containerRef = useRef(null);

  const user = {
    _id: "fsfawv",
    name: "jeel rupareliya",
  }
  return (
    <Fragment>
      <Stack
        ref={ containerRef }
        box-sizing={ "border-box" }
        padding={ "1rem" }
        spacing={ "1rem" }
        bgcolor={ grayColor }
        height={"90%"}
        sx={ {
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
       
        {
          sampleMessages.map((i) => (
            <MessageComponent message={ i } key={i._id} user={ user } />
          ))
        }
        
      </Stack>
      <form style={{
          height: "10%",
        } }>

        <Stack
          direction={ "row" }
          height={ "100%" }
          padding={ "8px 24px" }
          alignItems={ "center" }
          position={ "relative" }
        >
          <IconButton
            sx={ {
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
          }}
          >
            <AttachFileIcon/>
          </IconButton>

          <InputBox sx={ {
            height: "100%",
          }} placeholder='Type Messaeg here...'/>
          <IconButton
            type="submit"
            sx={ {
              rotate: "-30deg",
              bgcolor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              }
            }}
          >
            <SendIcon/>
          </IconButton>
          </Stack>

      </form>
    </Fragment>
  )
}

export default AppLayout(Chat)