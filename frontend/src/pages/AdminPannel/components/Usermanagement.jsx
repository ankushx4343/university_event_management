import { Calendar, CalendarCheck, Clock1, Plus, ShieldCheck, User, Users2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import toast from 'react-hot-toast';
import Userinfocard from './Additional/Userinfocard';
import useAuth from '../../../context/useAuth';
import DeleteUserModal from './modals/DeleteUserModal';
import UserInfo from './modals/UserInfo';

function Usermanagement() {

  const [users, setUsers] = useState([]);
  const [usersCount, setUserscount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const { user } = useAuth()
  //for deleteuser modal
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userTodelete, setUsertodelete] = useState(null)
  //for moreuserinfo modal
  const [userdetails,setUserdetails]=useState({})
  const [showUserdetailmodal,setshowuserdetailmodal]=useState(false);
  const [U_Iloading,setU_Iloading]=useState(false);
  console.log(user._id)

  //function for closing userinfo modal
  const onUIClose=()=>{
    setUserdetails(null);
    setshowuserdetailmodal(false)
  }
  //function for closing the modal
  const onClose = () => {
    setUsertodelete(null)
    setShowModal(false);
  }

  //function for opening the modal
  const handleClick = (id) => {
    setUsertodelete(id)
    setShowModal(true)
  }


  //function for getting user info
  const handleMoreinfo=async(userId)=>{
  try {
    setU_Iloading(true)
    setshowuserdetailmodal(true)
    const response=await api.get(`/user/${userId}`)
    setUserdetails(response.data.user)
  } catch (error) {
    console.log(error)
  }finally{
    setU_Iloading(false)
  }
  }

  //function for deleting the user
  const handleDelete = async () => {
    try {
      setLoading(true)
      await api.delete(`/user/${userTodelete}`)
      toast.success("user deleted ")
      //update users
      setUsers((prev) => prev.filter(user => user._id !== userTodelete));
      //update count 
      setUserscount((prev) => prev - 1)

      // Decrease admin count if deleted user was admin
      const deletedUser = users.find(user => user._id === userTodelete);
      if (deletedUser?.role === "admin") {
        setAdminCount((prev) => prev - 1);
      }
    } catch (error) {
      console.log(error);
      toast(error)
    } finally {
      setLoading(false)
      onClose()
    }
  }

  //fetching users for database
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/user/get-users");
        const allUsers = res.data.users.filter(us => us._id !== user._id)
        console.log(allUsers)
        setUsers(allUsers);
        setUserscount(allUsers.length + 1);
        setAdminCount(allUsers.filter((user) => user.role === "admin").length + 1)
      } catch (error) {
        toast.error(error.response.data.msg)
      }
    }
    fetch();
  }, [])

  return (
    <div className='w-[95%] min-h-full bg-white flex flex-col items-center'>
      <UserInfo isOpen={showUserdetailmodal} onClose={onUIClose} loading={U_Iloading} user={userdetails}/>
      <DeleteUserModal onConfirmdelete={handleDelete} onClose={onClose} isOpen={showModal} loading={loading} />
      <div className='w-[90%] min-h-[70%] shadow-2xl mt-10 px-10 rounded-2xl pb-10'>
        <div className='flex justify-between  pt-5 '>
          <div className='flex flex-col gap-4'>
            <h1 className='text-5xl font-bold'>Users Management</h1>
            <h3 className='text-2xl text-gray-600 font-semibold'>Manage and organize users</h3>
          </div>

        </div>
        <div className='mt-5 flex flex-col gap-4 width-full'>

          {/* //total events */}
          <div className='bg-blue-100 w-full flex justify-between items-center px-5 py-4 rounded-2xl'>
            <div className='flex flex-col gap-2'>
              <h3 className='text-xl font-semibold text-blue-500'>Total Users</h3>
              <h1 className='text-4xl font-bold text-blue-700'>{usersCount}</h1>
            </div>
            <div>
              <Users2 className='scale-150 text-blue-500 font-bold stroke-2 stroke-blue-500' />
            </div>
          </div>

          {/* //today events */}
          <div className='bg-green-100 w-full flex justify-between items-center px-5 py-4 rounded-2xl'>
            <div className='flex flex-col gap-2'>
              <h3 className='text-xl font-semibold text-green-500'>Admins</h3>
              <h1 className='text-4xl font-bold text-green-700'>{adminCount}</h1>
            </div>
            <div>
              <ShieldCheck className='scale-150 text-blue-500 font-bold stroke-2 stroke-blue-500' />
            </div>
          </div>

          {/* //upcoming events */}
          <div className='bg-blue-100 w-full flex justify-between items-center px-5 py-4 rounded-2xl'>
            <div className='flex flex-col gap-2'>
              <h3 className='text-xl font-semibold text-blue-500'>students</h3>
              <h1 className='text-4xl font-bold text-blue-700'>{usersCount - adminCount}</h1>
            </div>
            <div>
              <User className='scale-150 text-blue-500 font-bold stroke-2 stroke-blue-500' />
            </div>
          </div>
        </div>
      </div>

      <div className='w-[95%]  mt-10 flex flex-col gap-10 px-10'>
        {
          users.map((user) => {
            console.log(user)
            return (
              <Userinfocard user={user} handleDelete={handleClick} handleMoreinfo={handleMoreinfo} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Usermanagement