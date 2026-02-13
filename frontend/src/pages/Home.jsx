import { motion as Motion } from "motion/react"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContex } from "@/context/AuthContext";
import AnimatedBlob from "@/components/animatedbol";

export default function Home() {
  const { user } = useContext(AuthContex);
  console.log(user);
  const toSignin = user === null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white text-black">
      {/* Header / Navbar */}

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-7 px-12 py-24 items-center h-screen">
        <Motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-5"
        >
          <h2 className="text-6xl font-extrabold leading-tight mb-6 flex flex-col">
            Discover.<span>Participate.</span> <span className="text-sky-500">Belong.</span>
          </h2>
          <p className="text-gray-700 mb-8 text-lg">
            One platform to explore all university events, register instantly,
            and never miss what matters on campus.
          </p>
          <div className="flex gap-5">
            <Motion.div
              whileHover={{
                y: -10,
                scale: 1.02
              }}
              transition={{ duration: 0.2 }}>
              <Button className="bg-black text-white hover:bg-gray-800 scale-120">
                <Link to={toSignin ? "/login" : "/dashboard"}>
                  Explore Events
                </Link>
              </Button>
            </Motion.div>

            <Motion.div
              whileHover={{
                y: -10,
                scale: 1.02
              }}
              transition={{ duration: 0.2 }}>
              <Button variant="outline" className="border-black text-black hover:bg-sky-100">
                <Link to={toSignin ? "/login" : user.role == "admin" ? "/admin" : "/dashboard"}>
                  Create Event
                </Link>
              </Button>
            </Motion.div>
          </div>
        </Motion.div>
        <Motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="relative h-[500px] w-[500px] ">
            <AnimatedBlob delay={0} size="400px" color="from-purple-500 to-purple-700" />
            <AnimatedBlob delay={-2} size="350px" color="from-pink-400 to-red-500" />
            <AnimatedBlob delay={-4} size="300px" color="from-blue-400 to-cyan-400" />

            <Motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 p-8 rounded-2xl bg-white/90 backdrop-blur-md shadow-2xl text-center flex flex-col items-center justify-center gap-4"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity }}

            >
              <h3 className="text-3xl font-bold mb-4">Live Events</h3>
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-900 
                      bg-clip-text text-transparent">
                127
              </div>
              <p className="text-gray-600 mt-3 font-semibold">Events This Month</p>
              <div className="my-4 flex items-center h-[2px] bg-gray-400 w-[70%] justify-center"></div>
                 <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-900 
                      bg-clip-text text-transparent">
                127
              </div>
              <p className="text-gray-600 mt-3 font-semibold">Active Students</p> 
            </Motion.div>
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
