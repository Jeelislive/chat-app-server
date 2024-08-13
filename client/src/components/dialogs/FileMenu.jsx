import { Menu } from '@mui/material'
import React from 'react'

const FileMenu = ({anchorE1}) => {
  return (
      <Menu anchorEl={anchorE1} open={false}>
          <div style={ {
              width:"10rem",
          }}>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque commodi exercitationem odio sint temporibus ratione! Quaerat tempora, tempore aut id nisi natus cumque. Provident assumenda, vel aliquid odio et veritatis.
          </div>
    </Menu>
  )
}

export default FileMenu