import { useLocation } from "react-router-dom";

const Header = ({ children }: any) => {
  const location = useLocation();

  return (
    <div className="col-start-2 col-end-2 border-b-1 border-gray-100 flex items-center px-6">
      {children}
    </div>
  );
};

export default Header;
