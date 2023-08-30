import React from 'react'

function Button(props) {
  return (
    <div>
      <button
            // disabled={ 
            //   (props.user && (!validName || !valiPassword || !valiConform)) ||
            //   (props.restaurant && (!validName || !valiPassword))    
            // }
            type="submit"
            className="md:w-40 bg-yellow text-white py-2 px-10 mb-4 rounded-sm focus:outline-none focus:ring focus:ring-indigo-200"
          >
            {props.value}
          </button>
    </div>
  )
}

export default Button
