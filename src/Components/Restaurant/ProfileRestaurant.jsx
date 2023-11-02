import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";

import Button from "../../assets/Button";
import RestaurantAxios from "../../Axios/RestaurantAxios";
import { IMAGE_REGEX } from "../../Regex/Regex";

function ProfileRestaurant() {
  const [resData, setResData] = useState({});
  const [is_edit, setIs_Edit] = useState(false);
  const [editData, setEditData] = useState({
    Name: "",
    Email: "",
    Mobile: "",
    Place: "",
  });
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [image, setImage] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState([]);

  const restaurant = useSelector((state) => state.restaurant);
  const restaurant_id = restaurant._id;

  useEffect(() => {
    RestaurantAxios.get(`/getresprofile?id=${restaurant_id}`).then(
      (response) => {
        setResData(response.data.restData);
        setEditData({
          Name: response.data.restData.Name,
          Email: response.data.restData.Email,
          Mobile: response.data.restData.Mobile,
          Place: response.data.restData.Place,
        });
        setAddress({
          street: response.data.restData?.Address?.street,
          city: response.data.restData?.Address?.city,
          state: response.data.restData?.Address?.state,
          postalCode: response.data.restData?.Address?.postalCode,
        });
        setImage(response.data.restData?.Image)
      }
    );
  }, [is_edit]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileName = event.target.files[0].name;
    if (file && IMAGE_REGEX.test(fileName)) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviewUrl(reader.result);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreviewUrl("");
    }
  };

  const handleUpdateData = () => {
    if (is_edit) {
      if (
        address.street.trim().length === 0 ||
        address.city.trim().length === 0 ||
        address.state.trim().length === 0 ||
        address.postalCode.trim().length === 0 ||
        editData.Name.trim().length === 0 ||
        editData.Email.trim().length === 0 ||
        editData.Mobile.trim().length === 0 ||
        editData.Place.trim().length === 0 
      ) {
        toast.error("Please fill all field", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
      } else {
        RestaurantAxios.post("/editprofile", {
          editData,
          image,
          address,
          restId: restaurant._id,
        })
          .then((response) => {
            setIs_Edit(!is_edit)
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1500,
            });
          })
          .catch((err) => {
            toast.error(err.response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1500,
            });
          });
      }
    }
    setIs_Edit(!is_edit);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  return (
    <div className="p-10">
      <div className="lg:flex">
        <div className="lg:w-1/2 leading-6">
          <label htmlFor="name" className="block font-medium">
            Restaurant Name:
          </label>
          <input
            type="text"
            id="name"
            value={is_edit ? editData.Name : resData.Name}
            onChange={(e) => setEditData({ ...editData, Name: e.target.value })}
            required
            className={
              is_edit
                ? "border border-gray-300 rounded-sm lg:w-3/5 mb-5 w-full"
                : "border border-gray-300 rounded-sm lg:w-3/5 bg-gray-300 mb-5 py-1 font-semibold italic pl-3 w-full"
            }
            placeholder={resData.Name}
          />

          <label htmlFor="place" className="block font-medium">
            Place:
          </label>
          <input
            type="text"
            id="place"
            value={is_edit ? editData.Place : resData.Place}
            onChange={(e) => setEditData({ ...editData, Place: e.target.value })}
            required
            className={
              is_edit
                ? "border border-gray-300 rounded-sm lg:w-3/5 mb-5  w-full"
                : "border border-gray-300 rounded-sm lg:w-3/5 bg-gray-300 mb-5 py-1 font-semibold italic pl-3  w-full"
            }
            placeholder={resData.Name}
          />

          <label htmlFor="description" className="block font-medium">
            Location Details:
          </label>
          {is_edit ? (
            <div className="border border-gray-300 rounded-sm lg:w-3/5 p-4 mb-5  w-full">
              {" "}
              <div>
                <label htmlFor="street">Street:</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={address.street}
                  onChange={handleChange}
                  placeholder={resData.Address?.street}
                />
              </div>
              <div>
                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                  placeholder={resData.Address?.city}
                />
              </div>
              <div>
                <label htmlFor="state">State:</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={address.state}
                  onChange={handleChange}
                  placeholder={resData.Address?.state}
                />
              </div>
              <div>
                <label htmlFor="postalCode">Postal Code:</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleChange}
                  placeholder={resData.Address?.postalCode}
                />
              </div>
            </div>
          ) : (
            <textarea
              id="Location"
              value={
                resData.Address
                  ? ` Street: ${resData.Address.street}
 City: ${resData.Address.city}
 State: ${resData.Address.state}
 Postal code: ${resData.Address.postalCode}`
                  : "Add Your Location Details"
              }
              readOnly
              className="border border-gray-300 rounded-sm lg:w-3/5 bg-gray-300 mb-5 h-32 font-semibold italic pl-3  w-full"
            />
          )}

          <label htmlFor="contact" className="block font-medium">
            Contact Details:
          </label>
          {is_edit ? (
            <div className="border border-gray-300 rounded-sm lg:w-3/5 p-4 mb-5  w-full">
              {/* <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={editData.Email}
                  onChange={(e) =>
                    setEditData({ ...editData, Email: e.target.value })
                  }
                  placeholder={resData.Email}
                />
              </div> */}
              <div>
                <label htmlFor="mobile">Phone:</label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={editData.Mobile}
                  onChange={(e) =>
                    setEditData({ ...editData, Mobile: e.target.value })
                  }
                  placeholder={resData.Mobile}
                />
              </div>
            </div>
          ) : (
            <textarea
              id="contact"
              value={` Email: ${resData.Email}
 Mobile: ${resData.Mobile}`}
              readOnly
              className="border border-gray-300 rounded-sm lg:w-3/5 bg-gray-300 mb-5 py-1 font-semibold italic pl-3  w-full"
            />
          )}
        </div>
        <div className="w-1/2 ">
          {/* <label htmlFor="restaurant_id" className="block font-medium">
            Restaurant ID
          </label>
          <input
            type="text"
            id="restaurant_id"
            value={restaurant_id}
            readOnly
            className="border border-gray-300 rounded-sm lg:w-3/5 bg-gray-300 mb-5 py-1 w-full"
          /> */}
          <div className="h-52 lg:flex items-center justify-center bg-gray-300 lg:w-3/5 w-full">
              <label htmlFor="profImage" className="cursor-pointer">
                <img
                  className="h-52 object-cover"
                  src={
                    image
                      ? image
                      : "/images/user.png"
                  }
                  alt=""
                />
              </label>
              <input
                type="file"
                id="profImage"
                name="profImage"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          <Button
            value={is_edit ? "Update Detail" : "Edit Details"}
            className="lg:w-3/5 mt-10"
            onClick={handleUpdateData}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileRestaurant;
