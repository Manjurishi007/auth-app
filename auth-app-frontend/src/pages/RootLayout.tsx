import { Outlet } from "react-router"
import Navbar from "./../components/ui/Navbar"
import { Toaster } from "react-hot-toast"

function RootLayout() {
  return (
    <div>
        <Toaster />
        <Navbar />
        <Outlet />

    </div>
  )
}

export default RootLayout