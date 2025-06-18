import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const SidebarNavButton = ({ linkTo, text, icon }: any) => {
  const location = useLocation();

  return (
    <Link to={linkTo}>
      <div
        className={clsx(
          "flex w-full gap-2 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-50 border-white items-center",
          {
            " text-gray-800 bg-gray-100":
              linkTo === location.pathname.replace("/", ""),
          }
        )}
      >
        {icon}
        <p className="text-sm">{text}</p>
      </div>
    </Link>
  );
};

export default SidebarNavButton;
