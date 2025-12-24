import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";

export default function MainLayout({ children }) {
  return (
    <div>
      <Navbar /> 
      <main>{children}</main>
      <Footer/>
    </div>
  )
}