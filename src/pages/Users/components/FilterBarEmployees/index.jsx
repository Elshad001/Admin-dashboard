import { useState } from "react";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";
import { PlusCircleFilled } from '@ant-design/icons'
import { FilterDrawerEmployees } from "@/pages/Users/components";
import { SwitchBtn, RenderIf } from "@/shared/components";
import { CreateEmployee } from '@/pages/Users/modals';
import { useModal } from '@/pages/Users/modals';
import "./filterBarEmployees.scss";

// eslint-disable-next-line react/prop-types
const FilterBarEmployees = () => {

  const profile = useSelector((state) => state.auth.profile)
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = () => {
    setOpenDrawer(true);

  };
  const onClose = () => {
    setOpenDrawer(false);
  };

  const createModal = useModal();


  return (
    <>
      <div className="filterBar">
        <RenderIf condition={profile?.role === 'SuperAdmin' || profile?.role === 'Admin'}>
          <div className="filterBar-right">
            <div className="filter">
              <p>Filter</p>
              <SwitchBtn toggleDrawer={toggleDrawer} openDrawer={openDrawer} />
              <FilterDrawerEmployees onClose={onClose} openDrawer={openDrawer} />
            </div>
            <Tooltip title="add">
              <PlusCircleFilled className="plus-icon" onClick={createModal?.showModal} />
            </Tooltip>
            <CreateEmployee isModalOpen={createModal.isModalOpen} handleOk={createModal.handleOk} handleCancel={createModal.handleCancel} />
          </div>
        </RenderIf>
      </div>
    </>
  )
}

export default FilterBarEmployees
