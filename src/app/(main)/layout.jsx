import CartBar from "@/components/bar/CartBar";
import Footer from "@/components/bar/Footer";
import Navbar from "@/components/bar/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="w-full relative pt-16 text-black ">
      <Navbar /> 
      {children}
      <CartBar/>
      <Footer/>
    </div>
  )
}