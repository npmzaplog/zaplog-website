// src/components/Features.tsx
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Zap, Minimize, Globe, FileText, AlertTriangle, Settings, BatteryCharging } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 transition-all duration-700 hover:shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/20`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease, transform 0.6s ease`,
        transitionDelay: `${delay * 100}ms`,
      }}
    >
      <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <Minimize className="h-6 w-6" />,
      title: "Minimalist Design",
      description: "Works out of the box with sensible defaults, no configuration needed."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Browser Support",
      description: "Seamlessly works in both browser and Node.js environments."
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Flexible Log Levels",
      description: "Supports info, error, warn, and debug levels for all your needs."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Environment-Sensitive",
      description: "Adjusts logging behavior based on development, test, or production."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "File Writing",
      description: "Automatically writes logs to categorized files for easy access."
    },
    {
      icon: <BatteryCharging className="h-6 w-6" />,
      title: "Zero Configuration",
      description: "No need for initial setup; just import and start logging."
    }
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div 
          ref={ref}
          className="text-center max-w-3xl mx-auto mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <div className="inline-flex items-center bg-indigo-900/30 px-4 py-2 rounded-full mb-6">
            <Zap className="h-4 w-4 text-indigo-400 mr-2" />
            <span className="text-sm font-medium text-indigo-300">Why choose Zaplog?</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Designed for <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">simplicity and efficiency</span>
          </h2>
          <p className="text-lg text-slate-300">
            Zaplog provides everything you need for effective logging without unnecessary complexity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index + 1}
            />
          ))}
        </div>
      </div>
      
      <div className="absolute top-1/2  -right-64 log transform -translate-y-1/2 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full"></div>
    </section>
  );
};

export default Features;