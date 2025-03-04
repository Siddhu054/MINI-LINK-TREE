import React from 'react';
import { Check, Zap, Shield, Globe, Star } from 'lucide-react';

const Pro: React.FC = () => {
  const features = [
    { icon: Shield, title: 'Advanced Security', description: 'Enhanced link protection and password-protected links' },
    { icon: Globe, title: 'Custom Domains', description: 'Use your own domain for branded short links' },
    { icon: Zap, title: 'Advanced Analytics', description: 'Detailed click analytics and visitor insights' },
    { icon: Star, title: 'Priority Support', description: '24/7 priority customer support' },
  ];

  const plans = [
    {
      name: 'Monthly',
      price: '$9.99',
      period: 'per month',
      features: ['All Pro features', 'Cancel anytime', 'Monthly billing'],
      popular: false
    },
    {
      name: 'Yearly',
      price: '$99.99',
      period: 'per year',
      features: ['All Pro features', '2 months free', 'Annual billing'],
      popular: true
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Upgrade to MiniLink Pro
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get access to advanced features and take your link management to the next level
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((Feature, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Feature.icon className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{Feature.title}</h3>
                <p className="text-gray-600 text-sm">{Feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan, index) => (
          <div 
            key={index}
            className={`relative bg-white rounded-2xl shadow-sm overflow-hidden
              ${plan.popular ? 'ring-2 ring-indigo-600' : 'border border-gray-200'}`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-indigo-600 text-white text-sm px-4 py-1 rounded-bl-lg">
                Popular
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="ml-2 text-gray-500">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 w-full py-3 px-6 rounded-lg text-center font-medium transition-colors
                  ${plan.popular 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 rounded-2xl p-8 mt-12">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
            <p className="text-gray-600">Yes, you can cancel your subscription at any time. You'll continue to have access to Pro features until the end of your billing period.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600">We accept all major credit cards, PayPal, and various local payment methods.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pro; 