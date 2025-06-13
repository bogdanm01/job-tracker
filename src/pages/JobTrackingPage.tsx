import { Tabs, Tab } from "@heroui/tabs";
import { useState } from "react";
import {
  ListBulletIcon,
  ChatBubbleLeftEllipsisIcon,
  FolderOpenIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

import ApplicationsTab from "@/components/jobTrackingPage/ApplicationsTab";

const JobTrackingPage = () => {
  const [selected, setSelected] = useState<any>("applications");

  const renderSelectedTab = () => {
    switch (selected) {
      case "applications": {
        return <ApplicationsTab />;
      }
      case "activities": {
        return <h1>Activities</h1>;
      }
      case "documents": {
        return <h1>Documents</h1>;
      }
    }
  };

  return (
    <div className="flex flex-col">
      <Tabs
        className="mb-8"
        aria-label="Options"
        variant="solid"
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab
          key="applications"
          title={
            <div className="flex items-center space-x-2">
              <ListBulletIcon className="size-5" />
              <span>Applications</span>
            </div>
          }
        />
        <Tab
          key="activities"
          title={
            <div className="flex items-center space-x-2">
              <ChatBubbleLeftEllipsisIcon className="size-5" />
              <span>Activities</span>
            </div>
          }
        />
        <Tab
          key="documents"
          title={
            <div className="flex items-center space-x-2">
              <FolderOpenIcon className="size-5" />
              <span>Documents</span>
            </div>
          }
        />
        <Tab
          key="wishlist"
          title={
            <div className="flex items-center space-x-2">
              <HeartIcon className="size-5" />
              <span>Wishlist</span>
            </div>
          }
        />
      </Tabs>
      {renderSelectedTab()}
    </div>
  );
};

export default JobTrackingPage;
