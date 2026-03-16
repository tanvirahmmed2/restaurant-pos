import ManageNavbar from "@/components/bar/ManageNavbar"
import ManageSidebar from "@/components/bar/ManageSidebar"
import { isStaff } from "@/lib/auth/staffmiddleware"
import { redirect } from "next/navigation"

export const metadata={
  title:'Manage | Restaurant',
  description:'Management site'
}


const PosLayout = async({children, }) => {
  const auth= await isStaff()
  if(!auth.success) return redirect('/staff-login')

  return (
    <div className='w-full flex flex-col'>
        <ManageNavbar/>
        <div className=" flex flex-row w-full justify-between">
            <ManageSidebar/>
            {children}
        </div>
    </div>
  )
}

export default PosLayout
