import { useSelector } from "react-redux";
import { Tooltip } from "antd";
import { PlusCircleFilled } from '@ant-design/icons'
import { CreateTeam } from '@/pages/Teams/modals';
import { useModal } from '@/pages/Users/modals';
import { RenderIf } from "@/shared/components";
import "./filterBarTeams.scss";


// eslint-disable-next-line react/prop-types
const FilterBarTeams = () => {

  const profile = useSelector((state) => state.auth.profile)

  const createModal = useModal();


  return (
    <>
      <RenderIf condition={profile?.role === 'SuperAdmin' || profile?.role === 'Admin'}>
        <div className="filterBar">
          <div className="filterBar-right">
            <Tooltip title="add">
              <PlusCircleFilled className="plus-icon" onClick={createModal?.showModal} />
            </Tooltip>
            <CreateTeam isModalOpen={createModal.isModalOpen} handleOk={createModal.handleOk} handleCancel={createModal.handleCancel} />
          </div>
        </div>
      </RenderIf></>
  )
}

export default FilterBarTeams
