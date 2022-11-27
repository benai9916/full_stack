import React from 'react'
import { Box, Button, Grid } from "@mui/material";
import StarterBox from 'components/StarterBox';


const BuyerAuth = () => {
  return (
    <Box sx={{height: '100vh', mt:15}}>
      <StarterBox signUppath={'/buyer/new'} loginPath="/buyer/login" mode="Buyers"/>
  </Box>
  )
}

export default BuyerAuth