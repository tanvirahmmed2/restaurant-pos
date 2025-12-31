import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="w-full relative">
      <Navbar /> 
      <main className="w-full mt-14">{children}</main>
      <Footer/>
    </div>
  )
}