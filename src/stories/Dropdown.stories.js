import React, { useState } from 'react';
import Dropdown from '../components/Dropdown';

export default {
  title: 'Dropdown',
  component: Dropdown,
};

const Template = (args) => {
  const [selectedValue, setSelectedValue] = useState(args.value);

  const handleChange = (value) => {
    setSelectedValue(value);
    console.log('Selected value:', value);
  };

  return (
    <div>
      <Dropdown {...args} value={selectedValue} onChange={handleChange} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  options: [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' },
    { value: 3, label: 'Option 3' },
  ],
  multiple: false,
  searchable: true,
  value: null,
};