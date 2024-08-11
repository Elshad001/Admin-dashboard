import { useState } from "react";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";
import { PlusCircleFilled, ExportOutlined } from '@ant-design/icons'
import { FilterDrawerDailyReports } from "@/pages/DailyReports/components";
import { CreateDailyReport } from '@/pages/DailyReports/modals';
import { SwitchBtn, RenderIf } from "@/shared/components";
import { useModal } from '@/pages/Users/modals';
import "./filterBarDailyReports.scss";


// eslint-disable-next-line react/prop-types
const FilterBarDailyReports = () => {

  const profile = useSelector((state) => state.auth.profile)
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = () => {
    setOpenDrawer(true);

  };
  const onClose = () => {
    setOpenDrawer(false);
  };

  const dailyReportsModal = useModal();

  return (
    <>
      <RenderIf condition={profile?.role === 'SuperAdmin' || profile?.role === 'Admin'}  >
        <div className="filterBar">
          <div className="filterBar-right">
            <div className="filter">
              <p>Filter</p>
              <SwitchBtn toggleDrawer={toggleDrawer} openDrawer={openDrawer} />
              <FilterDrawerDailyReports onClose={onClose} openDrawer={openDrawer} />
            </div>
            <Tooltip title="export">
              <ExportOutlined />
            </Tooltip>
          </div>
        </div>
      </RenderIf>
      <RenderIf condition={profile?.role === 'Employee'}>
        <div className="filterBar">
          <div className="filterBar-right">
            <div className="filter">
              <p>Filter</p>
              <SwitchBtn toggleDrawer={toggleDrawer} openDrawer={openDrawer} />
              <FilterDrawerDailyReports onClose={onClose} openDrawer={openDrawer} />
            </div>
            <Tooltip title="add">
              <PlusCircleFilled onClick={dailyReportsModal?.showModal} />
            </Tooltip>
            <Tooltip title="export">
              <ExportOutlined />
            </Tooltip>
            <CreateDailyReport isModalOpen={dailyReportsModal.isModalOpen} handleOk={dailyReportsModal.handleOk} handleCancel={dailyReportsModal.handleCancel} />
          </div>
        </div>
      </RenderIf>
    </>
  )
}

export default FilterBarDailyReports 