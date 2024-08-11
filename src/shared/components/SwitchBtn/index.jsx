import { Switch } from 'antd';
import "./switch-btn.scss";

// eslint-disable-next-line react/prop-types
const SwitchBtn = ({toggleDrawer,openDrawer}) => <Switch className='switch-btn' checked={openDrawer ? 'checked' : ''}  onChange={toggleDrawer} />;
export default  SwitchBtn;