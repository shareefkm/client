import { useState } from 'react';
import {useNavigate,useParams} from 'react-router-dom';
import { toast } from 'react-toastify';
import UserAxios from '../Axios/UserAxios';
import { PW_REGEX } from '../Regex/Regex';
import RestaurantAxios from '../Axios/RestaurantAxios';
import EmployeeAxios from '../Axios/EmployeeAxios';

function ResetPassword({value}) {
const {id} = useParams()
const [newPassword,setNewPassword] = useState('')
const [rePassword,setRepassword] = useState('')
const [success,setSuccess] = useState(false)
const navigate = useNavigate()

const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const validPsw = PW_REGEX.test(newPassword);
      if (validPsw) {
        if (newPassword === rePassword) {
          if (value === "user") {
            const response = await UserAxios.patch("/resetpassword", {
              newPassword,
              _id: id,
            });
            if (response.data.success) {
              toast.success(response.data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
              });
              setNewPassword('');
              setRepassword('');
              setSuccess(true);
              navigate('/login');
            } else {
              toast.error(response.data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
              });
            }
          } else if (value === "restaurant") {
            const response = await RestaurantAxios.patch("/resetpassword", {
              newPassword,
              _id: id,
            });
            if (response.data.success) {
              toast.success(response.data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
              });
              setNewPassword('');
              setRepassword('');
              setSuccess(true);
              navigate('/restaurant/login');
            } else {
              toast.error(response.data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
              });
            }
          } else if (value === "employee") {
            const response = await EmployeeAxios.patch("/resetpassword", {
              newPassword,
              _id: id,
            });
            if (response.data.success) {
              toast.success(response.data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
              });
              setNewPassword('');
              setRepassword('');
              setSuccess(true);
              navigate('/employee/login');
            } else {
              toast.error(response.data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
              });
            }
          }
        } else {
          toast.error("Passwords do not match.", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
        }
      } else {
        toast.error("Passwords must include uppercase, lowercase, special character, and number", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    }
  };
  

  return (
    <> <main id="content" role="main" className="w-screen flex h-screen items-center max-w-md mx-auto p-6">
    <div className="mt-7 w-full bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
            <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Enter new password</h1>
            </div>

            <div className="mt-5">
                <div>
                    <div className="grid gap-y-4">
                        <div>
                            <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">Enter Password</label>
                            <div className="relative">
                                <input
                                    type='password'
                                    placeholder='password'
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">RePassword</label>
                            <div className="relative">
                                <input
                                    type='password'
                                    placeholder='repassword'
                                    onChange={(e) => setRepassword(e.target.value)}
                                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                    required
                                />
                            </div>
                            {/* <p className="text-xs text-center text-red-600 mt-2">{err || '[password should contain A-Z&a-z&1-9]'}</p> */}
                        </div>
                        {success ? <button
                            onClick={() => navigate('/login')}
                            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                        >
                            Go to login
                        </button> : <button
                            onClick={resetPassword}
                            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                        >
                            Reset password
                        </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
    </>
  )
}

export default ResetPassword