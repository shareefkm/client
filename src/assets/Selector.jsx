import React, {useState} from 'react'
import Select from 'react-select';
function Selector() {
    const [selectedOption,setSelectedOption] = useState()
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ];
      const customStyles = {
        control: provided => ({
          ...provided,
          border: 'none', // Remove the border
        //   boxShadow: 'none', // Remove the box shadow
        }),
      };
  return (
    <div>
        <div>
      <Select 
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        styles={customStyles}
      />
        </div>
    </div>
  )
}

export default Selector
