import { useState } from "react";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";
import { PlusCircleFilled } from '@ant-design/icons'
import { FilterDrawerProjects } from "@/pages/Projects/components";
import { SwitchBtn } from "@/shared/components";
import { CreateProject } from '@/pages/Projects/modals';
import { useModal } from '@/pages/Users/modals';
import { RenderIf } from "@/shared/components";
import "./filterBarProjects.scss";

// eslint-disable-next-line react/prop-types
const FilterBarProjects = () => {

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
      <RenderIf condition={profile?.role === 'SuperAdmin' || profile?.role === 'Admin'}>
        <div className="filterBar">
          <div className="filterBar-right">
            <div className="filter">
              <p>Filter</p>
              <SwitchBtn toggleDrawer={toggleDrawer} openDrawer={openDrawer} />
              <FilterDrawerProjects onClose={onClose} openDrawer={openDrawer} />
            </div>
            <Tooltip title="add">
              <PlusCircleFilled className="plus-icon" onClick={createModal?.showModal} />
            </Tooltip>
            <CreateProject isModalOpen={createModal.isModalOpen} handleOk={createModal.handleOk} handleCancel={createModal.handleCancel} />
          </div>
        </div>
      </RenderIf>
    </>
  )
}

export default FilterBarProjects
