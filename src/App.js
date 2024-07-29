import React, { useState } from 'react';
import Dropdown from '../src/components/Dropdown';

const App = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' },
    { value: 3, label: 'Option 3' },
  ];

  return (
    <Dropdown
      options={options}
      multiple={true}
      searchable={true}
      value={selectedOptions}
      onChange={setSelectedOptions}
    />
  );
};

export default App;