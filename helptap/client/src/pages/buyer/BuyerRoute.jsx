import { PermanentDrawerLeft } from "components/common/LeftNavDrawer"
import { BUYER } from "constants"
import { useParams } from "react-router-dom"

export const BuyerRoute = () => {
  const { buyerId} = useParams()
  return (
    <PermanentDrawerLeft clientType={BUYER}/>
  )
}