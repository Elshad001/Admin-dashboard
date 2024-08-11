import { Select, Space } from 'antd';


// eslint-disable-next-line react/prop-types
const MultipleSelectInput = ({options}) => (
  <Select
    mode="multiple"
    style={{
      width: '100%',
    }}
    placeholder="select"
    // eslint-disable-next-line react/prop-types
    defaultValue={options?.[0]?.value}
    optionLabelProp="label"
    options={options}
    optionRender={(option) => (
      <Space>
        <span role="img" aria-label={option.data.label}>
          {option.data.emoji}
        </span>
        {option.data.desc}
      </Space>
    )}
  />
);
export default MultipleSelectInput;