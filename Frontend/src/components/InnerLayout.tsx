import { Outlet } from 'react-router-dom'
import { DrawerVoter } from './DrawerVoter'

export const InnerLayout = () => {
  return (
    <>
    <div className='pt-12'>
    <DrawerVoter/>
    <Outlet/>
    </div>
    </>
    
  )
}
