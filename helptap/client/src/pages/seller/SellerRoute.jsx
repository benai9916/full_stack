import { PermanentDrawerLeft } from "components/common/LeftNavDrawer"
import { SELLER } from "constants"
import { useParams } from "react-router-dom"

export function SellerRoute() {
  const {sellerId} = useParams()
  localStorage.setItem('id', sellerId)
  return (
    <>
      <PermanentDrawerLeft clientType={SELLER}/>
    </>
  )
}