import React, { useState } from 'react';

interface TallyConfigProps {
  initialHost: string;
  initialPort: string;
  onSave: (host: string, port: string) => void;
}

const TallyConfig: React.FC<TallyConfigProps> = ({ initialHost, initialPort, onSave }) => {
  const [host, setHost] = useState(initialHost);
  const [port, setPort] = useState(initialPort);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(host, port);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Tally Configuration</h2>
      <p className="text-gray-600 mb-6">
        Connect your Tally to Biz Analyst using ODBC configuration.
        <a href="#" className="text-blue-500 hover:underline ml-2">
          Click here if you need help.
        </a>
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="host" className="block text-gray-700 mb-2">
            Tally Host (eg: localhost/127.0.0.1) *
          </label>
          <input
            type="text"
            id="host"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="port" className="block text-gray-700 mb-2">
            Tally Port (eg: 9000) *
          </label>
          <input
            type="text"
            id="port"
            value={port}
            onChange={(e) => setPort(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded"
        >
          SAVE
        </button>
      </form>
    </div>
  );
};

export default TallyConfig;
