import { Button } from "antd";
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const [type, setType] = useState(0);
  useState(() => {
    const local = localStorage.getItem("type");
    setType(local);
  }, []);
  const handleExit = () => {
    navigate("/login");
    
  };
  return (
    <div className="header">
      <div>网络安全攻防靶场系统</div>
      <div>
        {+type === 0 && <span>管理员</span>}
        {+type === 1 && <span>裁判</span>}
        {+type === 2 && <span>攻击者</span>}
        {+type === 3 && <span>防御者</span>}
        {+type === 4 && <span>教师</span>}
        <Button type="link" onClick={handleExit}>
          退出
        </Button>
      </div>
    </div>
  );
};
export default Header;
