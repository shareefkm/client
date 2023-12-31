import React, { Fragment, useEffect, useState } from 'react'
import EmployeeAxios from '../../Axios/EmployeeAxios'
import { useSelector } from 'react-redux'

function DeliveryHistoryItem() {
    const [deliveryHistory,setDeliveryHistory] = useState()

    const employee = useSelector((state)=> state.employee)

    useEffect(() => {
        EmployeeAxios.get(`/getordersempl/?id=${employee._id}`).then((response) => {
            setDeliveryHistory(response.data);
        });
      }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Delivery History</h2>
      {deliveryHistory?.ordersDetails.map((delivery) => (
          <Fragment key={delivery._id}>
          {delivery.item.map((deliveryItem) =>
            (deliveryItem.orderStatus === 'Delivered' && deliveryItem.employeeId === employee._id) ? (
                <div key={deliveryItem._id} className="flex border items-center justify-between">
              <div className="p-4 mb-4">
                <div>
                  <strong>Order ID:</strong> {delivery._id.toString().substr(-4)}
                </div>
                <div>
                  <strong>Date:</strong> {delivery.updatedAt}
                </div>
                <div>
                  <strong>Status:</strong> {deliveryItem.orderStatus}
                </div>
                <div>
                  <strong>Customer:</strong> {delivery.userId.Name}
                </div>
                <div>
                  {/* <strong>Items Delivered:</strong> {deliveryItem.items.join(', ')} */}
                </div>
                <div>
                  <strong>Feedback:</strong> {deliveryItem.feedback}
                </div>
              </div>
           <div className="bg-green-500 text-white rounded-full p-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
                </div>
            ) : null
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default DeliveryHistoryItem
