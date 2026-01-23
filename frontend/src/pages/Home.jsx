import { motion as Motion } from "motion/react"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContex } from "@/context/AuthContext";

export default function Home() {
  const {user}=useContext(AuthContex);
  console.log(user);
  const toSignin=user===null;
 
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white text-black">
      {/* Header / Navbar */}

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-24 items-center h-screen">
        <Motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-extrabold leading-tight mb-6">
            Discover. Participate. <span className="text-sky-500">Belong.</span>
          </h2>
          <p className="text-gray-700 mb-8 text-lg">
            One platform to explore all university events, register instantly,
            and never miss what matters on campus.
          </p>
          <div className="flex gap-4">
            <Button className="bg-black text-white hover:bg-gray-800">
               <Link to={toSignin?"/login":"/dashboard"}>
             Explore Events
              </Link>             
             
              </Button>
            <Button variant="outline" className="border-black text-black hover:bg-sky-100">
              <Link to={toSignin?"/login":user.role=="admin"?"/admin":"/dashboard"}>
              Create Event
              </Link>
            </Button>
          </div>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="w-80 h-80 rounded-2xl bg-sky-300 shadow-2xl flex items-center justify-center">
            <span className="text-2xl font-bold text-black">Event Preview</span>
          </div>
        </Motion.div>
      </section>

      {/* Features Section */}
      <section className="px-10 py-20 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12">Why UniEvents?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Smart Notifications", "Easy Registrations", "Campus-Wide Reach"].map(
            (feature) => (
              <Card key={feature} className="rounded-2xl shadow-md">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold mb-3">{feature}</h4>
                  <p className="text-gray-600">
                    Designed to keep students informed and involved without
                    information overload.
                  </p>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6 text-sm">
        © 2026 UniEvents. Built for students, by students.
      </footer>
    </div>
  );
}
