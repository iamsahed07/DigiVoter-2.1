import { Outlet } from 'react-router-dom'
import { DrawerAdmin } from './DrawerAdmin'

export const InnerLayoutAdmin = () => {
  return (
    <>
    <div className='pt-12'>
    <DrawerAdmin/>
    <Outlet/>
    </div>
    </>
    
  )
}
