import { Outlet } from "react-router-dom"

// importing UI components
import Header from "../Ui/Header"


const Layout = () => {
  return (
    <div>
      <Header/>
      <div className="pt-[111px]">
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout
