import { Box } from '@mui/material'
import StarterBox from 'components/StarterBox'

const SellerAuth = () => {
  return (
    <Box sx={{height: '100vh', mt:15}}>
      <StarterBox signUppath={'/seller/new'} loginPath="/seller/login" mode="Sellers"/>
    </Box>
  )
}

export default SellerAuth