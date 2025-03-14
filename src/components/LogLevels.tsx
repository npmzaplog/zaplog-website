// src/components/LogLevels.tsx
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Zap, AlertTriangle, Info, Bug, AlertCircle } from 'lucide-react';

const LogLevels: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [activeLevel, setActiveLevel] = useState('info');
  
  const logLevels = [
    {
      id: 'error',
      name: 'Error',
      code: 0,
      description: 'Critical issues requiring immediate attention',
      icon: <AlertCircle className="h-5 w-5" />,
      color: 'bg-red-500',
      textColor: 'text-red-400',
      example: `logger.error("Database connection failed", "DBService");
logger.error("Payment processing error: Invalid card", "PaymentService");
logger.error("Authentication failed for user", "AuthService");`
    },
    {
      id: 'warn',
      name: 'Warning',
      code: 1,
      description: 'Non-critical issues that might need attention',
      icon: <AlertTriangle className="h-5 w-5" />,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-400',
      example: `logger.warn("API rate limit approaching 80%", "APIService");
logger.warn("Deprecated method used: getUserById", "UserService");
logger.warn("Cache invalidation delayed", "CacheService");`
    },
    {
      id: 'info',
      name: 'Info',
      code: 2,
      description: 'General informational messages',
      icon: <Info className="h-5 w-5" />,
      color: 'bg-blue-500',
      textColor: 'text-blue-400',
      example: `logger.info("User logged in successfully", "AuthService");
logger.info("Payment of $50.00 processed", "PaymentService");
logger.info("Email notification sent", "NotificationService");`
    },
    {
      id: 'debug',
      name: 'Debug',
      code: 3,
      description: 'Detailed information useful for debugging',
      icon: <Bug className="h-5 w-5" />,
      color: 'bg-green-500',
      textColor: 'text-green-400',
      example: `logger.debug("Query execution time: 120ms", "DatabaseService");
logger.debug("User authentication JWT payload", "AuthService");
logger.debug("Redis cache hit ratio: 92%", "CacheService");`
    }
  ];
  
  const activeLogLevel = logLevels.find(level => level.id === activeLevel);
  
  return (
    <section id="log-levels" className="py-20 relative">
      <div 
        ref={ref}
        className="container mx-auto px-6"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center bg-indigo-900/30 px-4 py-2 rounded-full mb-6">
            <Zap className="h-4 w-4 text-indigo-400 mr-2" />
            <span className="text-sm font-medium text-indigo-300">Granular Control</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Log Levels</span> for every need
          </h2>
          <p className="text-lg text-slate-300">
            Zaplog provides different log levels to help you categorize and filter your logs effectively.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-5">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
              {logLevels.map((level) => (
                <button
                  key={level.id}
                  className={`w-full text-left p-4 border-b border-slate-700 last:border-b-0 transition-colors hover:bg-slate-700/50 ${activeLevel === level.id ? 'bg-slate-700/50' : ''}`}
                  onClick={() => setActiveLevel(level.id)}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-md ${level.color}/20 flex items-center justify-center ${level.textColor} mr-3`}>
                      {level.icon}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">{level.name}</h3>
                        <span className="ml-2 text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300">Code: {level.code}</span>
                      </div>
                      <p className="text-sm text-slate-400 mt-1">{level.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-7">
            {activeLogLevel && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 h-full flex flex-col">
                <div className="p-5 border-b border-slate-700">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-md ${activeLogLevel.color}/20 flex items-center justify-center ${activeLogLevel.textColor} mr-4`}>
                      {activeLogLevel.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{activeLogLevel.name} Examples</h3>
                      <p className="text-sm text-slate-400">How to use the {activeLogLevel.name.toLowerCase()} log level</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 flex-grow">
                  <pre className="font-mono text-sm text-slate-300 bg-slate-900/50 p-4 rounded-lg h-full overflow-auto">
                    <code>{activeLogLevel.example}</code>
                  </pre>
                </div>
                
                <div className="p-5 border-t border-slate-700 bg-slate-900/30">
                  <h4 className="font-medium mb-2">Environment Behavior</h4>
                  <p className="text-sm text-slate-400">
                    {activeLogLevel.id === 'error' && 'Errors are always logged in all environments (development, test, production)'}
                    {activeLogLevel.id === 'warn' && 'Warnings are logged in development and production environments, but not in test'}
                    {activeLogLevel.id === 'info' && 'Info messages are logged in development environment, but not in test or production'}
                    {activeLogLevel.id === 'debug' && 'Debug messages are only logged in development when debug level is explicitly set'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="absolute top-1/3 -left-64 transform -translate-y-1/2 w-96 h-96 bg-indigo-600/20 blur-3xl rounded-full"></div>
    </section>
  );
};

export default LogLevels;