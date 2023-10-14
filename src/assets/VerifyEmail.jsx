import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserAxios from "../Axios/UserAxios";

function VerifyEmail({value}) {
  
  const { id } = useParams();
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await UserAxios.get(`verify/${id}`);
        setSuccess(true);
        console.log("Email verification response:", response.data);
      } catch (error) {
        setFail(true);
        console.error("Error verifying email:", error);
      }
    };

    verifyEmail();
  }, [id]);

  const handleNavigate = ()=>{
    if(value == "user"){
      navigate("/login")
    }else if(value == "restaurant"){
      navigate("/restaurant/login")
    }else if(value == "employee"){
      navigate("/employee/login")
    }
  }

  return (
    <div>
      {success ? (
        <div className="bg-gray-100 h-full">
          <div className="bg-white p-6  md:mx-auto">
            <svg
              viewBox="0 0 24 24"
              className="text-green-600 w-16 h-16 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Email successfully verified!
              </h3>
              <p className="text-gray-600 my-2">Thank you</p>
              <p> Have a great day! </p>
              <div className="py-10 text-center">
                <a
                  href="#"
                  onClick={handleNavigate}
                  className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : fail ? (
        "fail try again by clicking the link"
      ) : (
        ""
      )}
    </div>
  );
}

export default VerifyEmail;
