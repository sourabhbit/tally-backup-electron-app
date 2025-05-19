import React, { useState, useEffect } from "react";
import { checkTallyConnection } from "../utils/tallyConnection";
import { checkInternetConnection } from "../utils/internetStatus";

interface StatusBarProps {
  appVersion: string;
  tallyHost: string;
  tallyPort: number;
}

const StatusBar: React.FC<StatusBarProps> = ({
  appVersion,
  tallyHost,
  tallyPort,
}) => {
  const [tallyConnected, setTallyConnected] = useState<boolean>(false);
  const [internetConnected, setInternetConnected] = useState<boolean>(false);
  const [checkingTally, setCheckingTally] = useState<boolean>(false);
  const [checkingInternet, setCheckingInternet] = useState<boolean>(false);
  const [lastTallyCheck, setLastTallyCheck] = useState<Date | null>(null);
  const [lastInternetCheck, setLastInternetCheck] = useState<Date | null>(null);

  // Check Tally connection status periodically
  useEffect(() => {
    const checkTally = async () => {
      setCheckingTally(true);
      try {
        const status = await checkTallyConnection(tallyHost, tallyPort);
        setTallyConnected(status);
      } finally {
        setCheckingTally(false);
        setLastTallyCheck(new Date());
      }
    };

    // Check immediately on mount
    checkTally();

    // Then check every 10 seconds
    const interval = setInterval(checkTally, 10000);

    return () => clearInterval(interval);
  }, [tallyHost, tallyPort]);

  // Check internet connection status periodically
  useEffect(() => {
    const checkInternet = async () => {
      setCheckingInternet(true);
      try {
        const status = await checkInternetConnection();
        setInternetConnected(status);
      } finally {
        setCheckingInternet(false);
        setLastInternetCheck(new Date());
      }
    };

    // Check immediately on mount
    checkInternet();

    // Then check every 15 seconds
    const interval = setInterval(checkInternet, 15000);

    return () => clearInterval(interval);
  }, []);

  // Format the last check time
  const formatLastCheck = (date: Date | null): string => {
    if (!date) return "Never";

    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSeconds < 60) {
      return `${diffSeconds}s ago`;
    } else if (diffSeconds < 3600) {
      return `${Math.floor(diffSeconds / 60)}m ago`;
    } else {
      return date.toLocaleTimeString();
    }
  };

  // Function to manually check both connections
  const checkConnections = async () => {
    // Check Tally
    setCheckingTally(true);
    try {
      const tallyStatus = await checkTallyConnection(tallyHost, tallyPort);
      setTallyConnected(tallyStatus);
    } finally {
      setCheckingTally(false);
      setLastTallyCheck(new Date());
    }

    // Check Internet
    setCheckingInternet(true);
    try {
      const internetStatus = await checkInternetConnection();
      setInternetConnected(internetStatus);
    } finally {
      setCheckingInternet(false);
      setLastInternetCheck(new Date());
    }
  };

  return (
    <div className="bg-gray-200 border-t border-gray-300 px-4 py-1 text-sm flex justify-between items-center">
      {/* Tally connection status */}
      <div className="flex items-center">
        <div
          className={`w-3 h-3 rounded-full mr-2 ${
            checkingTally
              ? "bg-yellow-500 animate-pulse"
              : tallyConnected
              ? "bg-green-500"
              : "bg-red-500"
          }`}
          title={`Last checked: ${formatLastCheck(lastTallyCheck)}`}
        ></div>
        <span>
          Tally:{" "}
          {checkingTally
            ? "CHECKING..."
            : tallyConnected
            ? "CONNECTED"
            : "DISCONNECTED"}
          ({tallyHost}:{tallyPort})
        </span>
      </div>

      {/* Center section with app version and refresh button */}
      <div className="flex items-center">
        <span className="mr-3">v{appVersion}</span>
        <button
          onClick={checkConnections}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-2 py-0.5 rounded text-xs flex items-center"
          disabled={checkingTally || checkingInternet}
          title="Check connections"
        >
          <svg
            className={`w-3 h-3 mr-1 ${
              checkingTally || checkingInternet ? "animate-spin" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
      </div>

      {/* Internet connection status */}
      <div className="flex items-center">
        <span>
          Internet:{" "}
          {checkingInternet
            ? "CHECKING..."
            : internetConnected
            ? "CONNECTED"
            : "DISCONNECTED"}
        </span>
        <div
          className={`w-3 h-3 rounded-full ml-2 ${
            checkingInternet
              ? "bg-yellow-500 animate-pulse"
              : internetConnected
              ? "bg-green-500"
              : "bg-red-500"
          }`}
          title={`Last checked: ${formatLastCheck(lastInternetCheck)}`}
        ></div>
      </div>
    </div>
  );
};

export default StatusBar;
