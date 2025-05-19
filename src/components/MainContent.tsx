import React from 'react';
import { TabType } from './Sidebar';
import TallyConfig from './TallyConfig';

interface MainContentProps {
  activeTab: TabType;
  tallyHost: string;
  tallyPort: string;
  onSaveTallyConfig: (host: string, port: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  activeTab,
  tallyHost,
  tallyPort,
  onSaveTallyConfig,
}) => {
  // Navigation tabs at the top
  const navTabs = [
    { id: 'tally', label: 'TALLY' },
    { id: 'sync', label: 'SYNC' },
    { id: 'additional', label: 'ADDITIONAL' },
  ];

  // Placeholder content for tabs other than settings
  const renderPlaceholderContent = (tabName: string) => (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">{tabName} Content</h2>
      <p className="text-gray-600">This is a placeholder for the {tabName} tab content.</p>
    </div>
  );

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'settings':
        return (
          <div>
            <div className="border-b border-gray-300">
              <div className="flex">
                {navTabs.map((tab) => (
                  <div
                    key={tab.id}
                    className={`px-6 py-3 cursor-pointer ${
                      tab.id === 'tally' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'
                    }`}
                  >
                    {tab.label}
                  </div>
                ))}
              </div>
            </div>
            <TallyConfig
              initialHost={tallyHost}
              initialPort={tallyPort}
              onSave={onSaveTallyConfig}
            />
          </div>
        );
      case 'my-companies':
        return renderPlaceholderContent('My Companies');
      case 'add-company':
        return renderPlaceholderContent('Add Company');
      case 'profile':
        return renderPlaceholderContent('Profile');
      case 'system-info':
        return renderPlaceholderContent('System Info');
      case 'tutorial':
        return renderPlaceholderContent('Tutorial');
      case 'support':
        return renderPlaceholderContent('Support');
      case 'purchase':
        return renderPlaceholderContent('Purchase');
      default:
        return <div className="p-6">Select a tab from the sidebar</div>;
    }
  };

  return <div className="flex-1 overflow-auto">{renderContent()}</div>;
};

export default MainContent;
