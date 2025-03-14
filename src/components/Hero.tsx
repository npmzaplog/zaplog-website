import React, { useEffect, useState } from "react";
import { Zap, Terminal, Files } from "lucide-react";
import { notify } from "@/lib/notify";

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typingState, setTypingState] = useState({
    currentLine: 0,
    text: ["", "", ""],
  });

  const codeLines = [
    'import {createLogger} from "zaplog";',
    "const logger = createLogger(); // default environment is  'node'",
    'logger.info("Zero config logging for Node.js and browser");',
  ];

  useEffect(() => {
    setIsVisible(true);

    const typeNextLine = (lineIndex: number) => {
      let charIndex = 0;
      const line = codeLines[lineIndex];

      const interval = setInterval(() => {
        if (charIndex < line.length) {
          setTypingState((prev) => {
            const newText = [...prev.text];
            newText[lineIndex] = line.substring(0, charIndex + 1);
            return {
              ...prev,
              text: newText,
            };
          });
          charIndex++;
        } else {
          clearInterval(interval);

          // Move to next line if there is one
          if (lineIndex < codeLines.length - 1) {
            setTimeout(() => {
              setTypingState((prev) => ({
                ...prev,
                currentLine: lineIndex + 1,
              }));
              typeNextLine(lineIndex + 1);
            }, 400); // Pause between lines
          }
        }
      }, 50); // Speed of typing

      return () => clearInterval(interval);
    };

    // Start typing the first line after a short delay when component is visible
    const timeout = setTimeout(() => {
      typeNextLine(0);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  // Function to render each line with character-by-character animation and syntax highlighting
  const renderCodeLine = (lineIndex: number) => {
    const lineText = typingState.text[lineIndex];

    if (lineIndex === 0) {
      // First line: import {createLogger} from "zaplog";
      const importKeyword = lineText.substring(0, Math.min(6, lineText.length));
      const afterImport =
        lineText.length > 6
          ? lineText.substring(6, Math.min(21, lineText.length))
          : "";
      const fromKeyword =
        lineText.length > 13
          ? lineText.substring(21, Math.min(26, lineText.length))
          : "";
      const quotedText = lineText.length > 26 ? lineText.substring(26) : "";

      return (
        <>
          <span className="text-indigo-400">{importKeyword}</span>
          <span className="text-white">{afterImport}</span>
          <span className="text-indigo-400">{fromKeyword}</span>
          <span className="text-orange-300">{quotedText}</span>
        </>
      );
    }

    if (lineIndex === 1) {
      // Second line: const logger = createLogger();
      const constKeyword = lineText.substring(0, Math.min(5, lineText.length));
      const loggerVar =
        lineText.length > 5
          ? lineText.substring(5, Math.min(13, lineText.length))
          : "";
      const equalsOp =
        lineText.length > 13
          ? lineText.substring(13, Math.min(15, lineText.length))
          : "";
      
      const createLoggerFuncCall = lineText.length > 15 ? lineText.substring(15, 30) : "";

      // const comment = lineText.length > 30 ? lineText.substring(30) : "";

      return (
        <>
          <span className="text-indigo-400">{constKeyword}</span>
          <span className="text-white">{loggerVar}</span>
          <span className="text-indigo-400">{equalsOp}</span>
          <span className="text-white">{createLoggerFuncCall}</span>
          {/* <span className="text-slate-400">{comment}</span> */}
        </>
      );
    }
    
    if (lineIndex === 2) {
      // Third line: logger.info("Zero config logging for Node.js and browser");
      const loggerObj = lineText.substring(0, Math.min(6, lineText.length));
      const dotInfo =
        lineText.length > 6
          ? lineText.substring(6, Math.min(11, lineText.length))
          : "";
      const openParen =
        lineText.length > 11
          ? lineText.substring(11, Math.min(12, lineText.length))
          : "";
      const stringContent =
        lineText.length > 12
          ? lineText.substring(
              12,
              lineText.length - (lineText.endsWith(");") ? 2 : 0)
            )
          : "";
      const closeParen = lineText.endsWith(");")
        ? ");"
        : lineText.endsWith(")")
        ? ")"
        : "";

      return (
        <>
          <span className="text-white">{loggerObj}</span>
          <span className="text-indigo-300">{dotInfo}</span>
          <span className="text-white">{openParen}</span>
          <span className="text-orange-300">{stringContent}</span>
          <span className="text-white">{closeParen}</span>
        </>
      );
    }

    return null;
  };

  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className={`inline-flex items-center bg-indigo-900/30 px-4 py-2 rounded-full mb-6 transition-all duration-700 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform -translate-y-4"
            }`}
          >
            <Zap className="h-4 w-4 text-indigo-400 mr-2" />
            <span className="text-sm font-medium text-indigo-300">
              Minimalist logging for modern applications
            </span>
          </div>

          <h1
            className={`text-4xl md:text-6xl font-bold leading-tight mb-6 transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform -translate-y-4"
            }`}
          >
            Elegant logging,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              zero config
            </span>
          </h1>

          <p
            className={`text-lg md:text-xl text-slate-300 mb-8 transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform -translate-y-4"
            }`}
          >
            Zaplog is a minimalist logging library designed to work out of the
            box with zero configurations. It provides four log levels and writes
            log messages to files.
          </p>

          <div
            className={`flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mb-12 transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform -translate-y-4"
            }`}
          >
            <a
              href="#examples"
              className="w-full md:w-auto px-8 py-3 rounded-lg font-medium bg-indigo-600 hover:bg-indigo-500 transition-colors text-center"
            >
              Get Started
            </a>
            <button
              className="w-full md:w-auto px-8 py-3 rounded-lg font-medium bg-slate-800 hover:bg-slate-700 transition-colors flex gap-2 items-center justify-center"
              onClick={() => {
                navigator.clipboard.writeText("npm install zaplog");
                notify.success("Code copied to clipboard");
              }}
            >
              <code>npm install zaplog</code>
              <Files fontSize={"5px"} size={16} />
            </button>
          </div>

          <div
            className={`max-w-2xl mx-auto bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-700 transition-all duration-700 delay-400 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform -translate-y-4"
            }`}
          >
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-400"></div>
              <span className="ml-2 text-xs text-slate-400">terminal</span>
            </div>
            <div className="font-mono text-sm text-slate-300 flex items-start">
              <Terminal className="h-4 w-4 text-indigo-400 mr-2 mt-1 flex-shrink-0" />
              <div className="text-left w-full">
                <div className="flex">
                  <span className="text-green-400 inline-block w-4 flex-shrink-0">
                    {">"}
                  </span>
                  <span className="flex-grow">
                    {renderCodeLine(0)}
                    {typingState.currentLine === 0 && (
                      <span className="animate-pulse">|</span>
                    )}
                  </span>
                </div>

                <div className="flex">
                  <span className="text-green-400 inline-block w-4 flex-shrink-0">
                    {">"}
                  </span>
                  <span className="flex-grow">
                    {renderCodeLine(1)}
                    {typingState.currentLine === 1 && (
                      <span className="animate-pulse">|</span>
                    )}
                  </span>
                </div>

                <div className="flex">
                  <span className="text-green-400 inline-block w-4 flex-shrink-0">
                    {">"}
                  </span>
                  <span className="flex-grow">
                    {renderCodeLine(2)}
                    {typingState.currentLine === 2 && (
                      <span className="animate-pulse">|</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-3/4 h-40 bg-indigo-600/20 blur-3xl rounded-full"></div>
    </section>
  );
};

export default Hero;
