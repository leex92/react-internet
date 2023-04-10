import { Button } from "antd";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const handleExit = () => {
    navigate("/login");
  };
  return (
    <div className="header">
      <div>网络安全攻防靶场系统</div>
      <div>
        <Button type="link" onClick={handleExit}>
          退出
        </Button>
      </div>
    </div>
  );
};
export default Header;
