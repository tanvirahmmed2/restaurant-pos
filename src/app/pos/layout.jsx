

const PosLayout = ({children, navbar, sidebar, cart}) => {
  return (
    <div className='w-full flex flex-col'>
        {navbar}
        <div className=" flex flex-row w-full  justify-between">
            {sidebar}
            {children}
            {cart}
        </div>
    </div>
  )
}

export default PosLayout
