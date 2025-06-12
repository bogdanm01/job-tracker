import { useLocation } from "react-router-dom";
import { Button } from "@heroui/button";

import { BellIcon, MoonIcon } from "@heroicons/react/24/solid";

const Header = () => {
  const location = useLocation();

  const map: Record<string, string> = {
    "/tracking": "Job Tracking",
  };

  return (
    <div className="col-start-2 col-end-2 border-b-1 border-gray-100 flex items-center px-6 w-full justify-between">
      <h1 className="font-medium text-gray-900 text-lg">
        {map[location.pathname]}
      </h1>
      <div className="flex gap-1">
        <Button isIconOnly variant="light" className="text-gray-600">
          <BellIcon className="size-5" />
        </Button>
        <Button isIconOnly variant="light" className="text-gray-600">
          <MoonIcon className="size-5" />
        </Button>
      </div>
    </div>
  );
};

export default Header;
