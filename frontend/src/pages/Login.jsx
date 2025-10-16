import NewLogin from "@/components/NewLogin";

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="w-[80%] sm:w-[35%]  lg:w-[30%] xl:w-[20%] ">
        <NewLogin />
      </div>
    </div>
  )
}
