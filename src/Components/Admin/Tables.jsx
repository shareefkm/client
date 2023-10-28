import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

import AdminAxios from '../../Axios/AdminAxios.jsx'
import { restaurantLogout } from "../../Redux/Auth/RestaurantSlice";
import { employeeLogout } from "../../Redux/Auth/EmployeeSlice";
import EmployeeAxios from '../../Axios/EmployeeAxios.jsx'
import RestaurantAxios from '../../Axios/RestaurantAxios.jsx'
import ViewDetails from './ViewDetails.jsx'


function Tables({path, action}) {
    const employee = useSelector((state)=> state.employee)
    const restaurant = useSelector((state)=> state.restaurant)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [datas,setDatas] = useState([])
    const [Is_blocked,setIs_Blocked] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [item, setsetItem] = useState();

    useEffect(()=>{
        AdminAxios.get(path).then((response)=>{
            setDatas(response.data.employees ? response.data.employees : response.data.restaurant)
        })
    },[Is_blocked])
 
    const handleBlockStatus = async (id) => {
        AdminAxios.patch(action,{id}
          ).then((response)=>{
            if(response.data.success){
              setIs_Blocked(!Is_blocked)
                toast.success(response.data.message,{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500
                  })
                  if(response.data.message === 'Employee Blocked'){
                    dispatch(employeeLogout());
                  }else if(response.data.message === 'Restarant Blocked'){
                    dispatch(restaurantLogout());
                  }
            }else{
                toast.error(response.data.message,{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500
                  })
            }
        }).catch((err)=>{
          console.log(err);
          toast.error(err.response.data.message,{
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500
          })
        })
      };
console.log(path);
      const handleViewData = async (id) => {
        try {
          if(path === '/getemployees'){
            const { data } = await EmployeeAxios.get(`/getprofile/${id}`);
            if (data) {
              setsetItem(data.profile);
            }
          }else{
            const { data } = await RestaurantAxios.get(`/getresprofile?id=${id}`);
            if (data) {
              setsetItem(data.restData);
            }
          }
        } catch (error) {
          console.log(error);
        }
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
      console.log(item);
    return (
        <div className="overflow-x-auto pt-3">
      <ViewDetails isOpen={isModalOpen} close={closeModal} item={item} />
          <table className="min-w-full divide-y divide-gray-200 bg-table-blue text-off-White">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                  View
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-gray-600">
            {datas.map((data,i) => (
            <tr key={data._id} className={i%2 === 0 ? "bg-off-white2" : "bg-gray-200"}>
              <td className="px-6 py-2 whitespace-nowrap">{data.Name}</td>
              <td className="px-6 py-2 whitespace-nowrap">{data.Email}</td>
              <td className="px-6 py-2 whitespace-nowrap">{data.Mobile}</td>
              <td onClick={()=>{handleViewData(data._id)}} className="px-6 py-2 whitespace-nowrap text-blue-700">View Detail</td>
              <td className="px-6 py-2 whitespace-nowrap">
                {
                  data.Is_blocked ? 
                (<button
                  className="text-blue-600 hover:text-blue-900 mr-2"
                  onClick={() => handleBlockStatus(data._id)}
                >
                  Ublock
                </button>) :
                (<button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => handleBlockStatus(data._id)}
                >
                  Block
                </button>)
                    }
              </td>
            </tr>
          ))}
            </tbody>
          </table>
        </div>
      );
}

export default Tables
