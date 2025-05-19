import { useState } from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import AppBar from "./components/AppBar";
import Sidebar, { TabType } from "./components/Sidebar";
import MainContent from "./components/MainContent";
import StatusBar from "./components/StatusBar";

// Get app version from package.json
const APP_VERSION = "1.0.0"; // In a real app, this would be imported from package.json

function MainApp() {
  // State for active tab
  const [activeTab, setActiveTab] = useState<TabType>("settings");

  // State for Tally configuration
  const [tallyHost, setTallyHost] = useState<string>("localhost");
  const [tallyPort, setTallyPort] = useState<string>("9000");

  // Handle saving Tally configuration
  const handleSaveTallyConfig = (host: string, port: string) => {
    setTallyHost(host);
    setTallyPort(port);
    // In a real app, you would save this to persistent storage
    console.log(`Saved Tally config: ${host}:${port}`);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* App Bar */}
      <AppBar title="Maalati Infotech Mobile Connector" />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main Content */}
        <MainContent
          activeTab={activeTab}
          tallyHost={tallyHost}
          tallyPort={tallyPort}
          onSaveTallyConfig={handleSaveTallyConfig}
        />
      </div>

      {/* Status Bar */}
      <StatusBar
        appVersion={APP_VERSION}
        tallyHost={tallyHost}
        tallyPort={parseInt(tallyPort, 10)}
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
      </Routes>
    </Router>
  );
}
