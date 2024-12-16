import React, { useState } from 'react';

interface TabsProps {
  tabs: { [key: string]: React.FC }; // Prop type for the tabs object
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const tabNames = Object.keys(tabs); // Get the tab names (keys of the object)
  const [activeTab, setActiveTab] = useState(tabNames[0]); // Set the first tab as active by default

  const ActiveTabComponent = tabs[activeTab]; // Get the active tab component

  return (
    <div>
      {/* Tab Buttons */}
      <div className="tab-buttons">
        {tabNames.map((tabName) => (
          <button
            key={tabName}
            onClick={() => setActiveTab(tabName)}
            className={activeTab === tabName ? 'active' : ''}
          >
            {tabName}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        <ActiveTabComponent /> {/* Render the active tab component */}
      </div>
    </div>
  );
};

export default Tabs;
