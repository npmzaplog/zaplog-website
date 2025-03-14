// src/components/CodeExample.tsx
import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Zap, Terminal } from "lucide-react";
import { notify } from "@/lib/notify";

const CodeExample: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState("basic");

  const basicCode = `import {createLogger} from "zaplog";

const logger = new createLogger();

// Log messages
logger.info("This is an info message");
logger.error("An error occurred");
logger.warn("This is a warning");
logger.debug("Debugging information");`;

  const contextCode = `import {createLogger} from "zaplog";

const logger = createLogger();

// Log messages with context
logger.info("User logged in", "AuthService");
logger.error("Database connection failed", "DBService");
logger.warn("Rate limiting applied", "APIService");
logger.debug("Query execution time: 120ms", "DatabaseService");`;

  const customCode = `import { createLogger } from "zaplog";
import path from 'path';

// For nodejs
const logger = createLogger("node", {
  level: "debug",  // Set custom log level
  errorStack: true,
  logFiles: {
    error: path.join(import.meta.dirname, "logs/errors.log"),
    warn: path.join(import.meta.dirname, "logs/warnings.log"),
    info: path.join(import.meta.dirname, "logs/info.log"),
    debug: path.join(import.meta.dirname, "logs/debug.log"),
    combined: path.join(import.meta.dirname, "logs/combined.log"),
  },
});

// For browser
const logger = createLogger("browser", {
  level: "debug",  // Set custom log level
  errorStack: true,
});

logger.info("Custom configuration applied!");`;

  function handleCopyToClipboard() {
    navigator.clipboard.writeText(
      activeTab === "basic"
        ? basicCode
        : activeTab === "context"
        ? contextCode
        : customCode
    );
    notify.success("Code copied to clipboard!");
  }

  return (
    <section id="examples" className="py-20 bg-slate-900/50 relative">
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
            <Terminal className="h-4 w-4 text-indigo-400 mr-2" />
            <span className="text-sm font-medium text-indigo-300">
              Ready to use
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Simple API,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              powerful logging
            </span>
          </h2>
          <p className="text-lg text-slate-300">
            Get started with Zaplog in seconds with these example patterns
          </p>
        </div>

        <div className="max-w-3xl mx-auto rounded-xl overflow-hidden border border-slate-700 shadow-lg">
          <div className="flex border-b border-slate-700">
            <button
              className={`px-6 py-3 text-sm font-medium flex-1 transition-colors ${
                activeTab === "basic"
                  ? "bg-slate-800 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("basic")}
            >
              Basic Usage
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium flex-1 transition-colors ${
                activeTab === "context"
                  ? "bg-slate-800 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("context")}
            >
              With Context
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium flex-1 transition-colors ${
                activeTab === "custom"
                  ? "bg-slate-800 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("custom")}
            >
              Custom Config
            </button>
          </div>

          <div className="bg-slate-800 p-6 overflow-x-auto">
            <pre className="font-mono text-sm text-slate-300">
              <code>
                {activeTab === "basic" && basicCode}
                {activeTab === "context" && contextCode}
                {activeTab === "custom" && customCode}
              </code>
            </pre>
          </div>

          <div className="flex justify-end bg-slate-900 p-4">
            <button
              className="text-xs font-medium px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center"
              onClick={handleCopyToClipboard}
            >
              Copy to clipboard
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://www.npmjs.com/package/zaplog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
          >
            <span>View full documentation</span>
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CodeExample;
