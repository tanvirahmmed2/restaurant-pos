
import SalesCart from "@/components/page/SalesCart"
import SalesNavbar from "@/components/bar/SalesNavbar"
import SalesSidebar from "@/components/bar/SalesSidebar"

export const metadata = {
  title: 'Sales | Restaurant',
  description: 'Sales site'
}


const PosLayout = async ({ children }) => {
  return (
    <div className='w-full flex flex-col'>
      <SalesNavbar />
        <div className=" flex flex-row w-full  justify-between">
          <SalesSidebar />
          {children}
          <SalesCart />
        </div>

    </div>
  )
}

export default PosLayout
