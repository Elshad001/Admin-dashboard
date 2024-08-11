import { Drawer } from 'antd';
import { Input, Space } from 'antd';
import { useLazySearchProjectQuery } from '@/redux/api/project/apiProject';
import { getShowProjects } from '@/redux/features/project/projectSlice';
import { useDispatch } from 'react-redux';


const { Search } = Input;


// eslint-disable-next-line react/prop-types
const FilterDrawerProjects = ({ onClose, openDrawer }) => {



  const dispatch = useDispatch();
  const [ searchProject, result] = useLazySearchProjectQuery();


  const onSearch = (value) => {
    searchProject(value);
    dispatch(getShowProjects(result?.data));
    onClose();
  }


  return (
    <>
      <Drawer onClose={onClose} open={openDrawer}>
        <Space direction="vertical" size="large">
          <div>
            <Space direction="vertical" size="large">
              <Search
                placeholder="search by Project name"
                enterButton="Search"
                size="large"
                onSearch={onSearch}
              />
            </Space>
          </div>
        </Space>
      </Drawer>
    </>
  );
};
export default FilterDrawerProjects

