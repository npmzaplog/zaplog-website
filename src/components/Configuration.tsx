// src/components/Configuration.tsx
import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Zap, Settings, PenTool } from "lucide-react";

const ConfigOption: React.FC<{
  name: string;
  description: string;
  defaultValue: string;
  type: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ name, description, defaultValue, type, isActive, onClick }) => {
  return (
    <button
      className={`w-full text-left p-4 border-b border-slate-700 last:border-b-0 transition-colors hover:bg-slate-700/50 ${
        isActive ? "bg-slate-700/50" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className="mt-1">
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              isActive ? "bg-indigo-400" : "bg-slate-500"
            } mr-3`}
          ></span>
        </div>
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-slate-400 mt-1 mb-2">{description}</p>
          <div className="flex items-center space-x-3">
            <span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300">
              Type: {type}
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300">
              Default: {defaultValue}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};

const Configuration: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeOption, setActiveOption] = useState("level");

  const configOptions = [
    {
      id: "level",
      name: "level",
      description: "Sets the minimum log level to record",
      defaultValue: '"info"',
      type: "string",
      example: `import { createLogger } from "zaplog";

// Set minimum log level to debug
const logger = createLogger("node", {
  level: "debug"
});
// For Browser
const logger = createLogger("browser",{
  level: "debug"
})

// Now even debug messages will be logged
logger.debug("Connection pool stats: 5 active, 3 idle");`,
    },
    {
      id: "errorStack",
      name: "errorStack",
      description: "Whether to include error stack traces in logs",
      defaultValue: "true",
      type: "boolean",
      example: `import { createLogger } from "zaplog";

// Disable error stack traces
const logger = createLogger("node", {
  errorStack: false
});

try {
  // Some code that throws an error
  throw new Error("Something went wrong");
} catch (error) {
  // Will log the error message but not the stack trace
  logger.error(error);
}`,
    },
    {
      id: "logFiles",
      name: "logFiles",
      description: "Custom file paths for log files (Node.js only)",
      defaultValue: "false",
      type: "object | boolean",
      example: `import { createLogger } from "zaplog";
import path from 'path';

// Custom log file paths
const logger = createLogger("node", {
  logFiles: {
    error: path.join(import.meta.dirname, "custom-logs/errors.log"),
    warn: path.join(import.meta.dirname, "custom-logs/warnings.log"),
    info: path.join(import.meta.dirname, "custom-logs/info.log"),
    debug: path.join(import.meta.dirname, "custom-logs/debug.log"),
    combined: path.join(import.meta.dirname, "custom-logs/combined.log")
  }
});

logger.info("Logs will be written to custom-logs directory");`,
    },
  ];

  const activeConfig = configOptions.find(
    (option) => option.id === activeOption
  );

  return (
    <section id="configuration" className="py-20 bg-slate-900/50 relative">
      <div
        ref={ref}
        className="container mx-auto px-6"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center bg-indigo-900/30 px-4 py-2 rounded-full mb-6">
            <Settings className="h-4 w-4 text-indigo-400 mr-2" />
            <span className="text-sm font-medium text-indigo-300">
              Customize Your Setup
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Configuration
            </span>{" "}
            options
          </h2>
          <p className="text-lg text-slate-300">
            While Zaplog works out of the box, you can customize it to fit your
            specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-5">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
              {configOptions.map((option) => (
                <ConfigOption
                  key={option.id}
                  name={option.name}
                  description={option.description}
                  defaultValue={option.defaultValue}
                  type={option.type}
                  isActive={activeOption === option.id}
                  onClick={() => setActiveOption(option.id)}
                />
              ))}
            </div>

            <div className="mt-6 p-5 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700">
              <div className="flex items-center mb-4">
                <PenTool className="h-5 w-5 text-indigo-400 mr-3" />
                <h3 className="font-medium">Default Configuration</h3>
              </div>
              <pre className="font-mono text-sm overflow-auto text-slate-300 bg-slate-900/50 p-4 rounded-lg">
                <code>{`{
  level: 'info', // Default log level based on the environment
  errorStack: true, // Includes stack traces in error logs
  logFiles: false, // No file writing by default
}`}</code>
              </pre>
            </div>
          </div>

          <div className="lg:col-span-7">
            {activeConfig && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 h-full flex flex-col">
                <div className="p-5 border-b border-slate-700">
                  <h3 className="text-lg font-medium">
                    {activeConfig.name} Configuration Example
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    How to customize the {activeConfig.name} option
                  </p>
                </div>

                <div className="p-5 flex-grow">
                  <pre className="font-mono text-sm text-slate-300 bg-slate-900/50 p-4 rounded-lg h-full overflow-auto">
                    <code>{activeConfig.example}</code>
                  </pre>
                </div>

                <div className="p-5 border-t border-slate-700 bg-slate-900/30">
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 text-indigo-400 mr-3 flex-shrink-0" />
                    <p className="text-sm text-slate-300">
                      {activeOption === "level" &&
                        "Setting the log level determines which messages are recorded. Higher levels include all lower levels."}
                      {activeOption === "errorStack" &&
                        "Error stack traces provide detailed information about where errors occurred, useful for debugging."}
                      {activeOption === "logFiles" &&
                        "In Node.js environments, logs can be written to custom file paths for better organization and analysis."}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute top-1/2  -left-64 log transform -translate-y-1/2 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full"></div>
    </section>
  );
};

export default Configuration;
