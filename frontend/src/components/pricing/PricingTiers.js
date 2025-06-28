import React from 'react';
import './PricingTiers.css';

const PricingTiers = () => {
  const tiers = [
    {
      name: 'Free',
      price: 0,
      period: 'forever',
      features: [
        'Basic card search',
        'Community features',
        'Portfolio tracking up to \',
        'Basic deck building',
        'Standard support'
      ],
      limitations: [
        'No advanced analytics',
        'No real-time alerts',
        'Limited searches per day'
      ],
      buttonText: 'Get Started Free',
      buttonClass: 'btn-free'
    },
    {
      name: 'Premium',
      price: 9.99,
      period: 'month',
      features: [
        'Everything in Free',
        'Advanced market analytics',
        'Real-time price alerts',
        'Unlimited portfolio tracking',
        'AI-powered recommendations',
        'Priority support',
        'Advanced deck building'
      ],
      buttonText: 'Start Premium Trial',
      buttonClass: 'btn-premium',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 14.99,
      period: 'month',
      features: [
        'Everything in Premium',
        'Unlimited TC Investments processing',
        'API access for developers',
        'Advanced trading tools',
        'Tax reporting features',
        'White-label options',
        'Dedicated account manager'
      ],
      buttonText: 'Contact Sales',
      buttonClass: 'btn-enterprise'
    }
  ];

  return (
    <div className="pricing-container">
      <h2>Choose Your Plan</h2>
      <div className="pricing-grid">
        {tiers.map((tier, index) => (
          <div key={index} className={\pricing-card \\}>
            {tier.popular && <div className="popular-badge">Most Popular</div>}
            <h3>{tier.name}</h3>
            <div className="price">
              <span className="currency">\$</span>
              <span className="amount">{tier.price}</span>
              {tier.price > 0 && <span className="period">/{tier.period}</span>}
            </div>
            <ul className="features">
              {tier.features.map((feature, i) => (
                <li key={i} className="feature"> {feature}</li>
              ))}
            </ul>
            <button className={\pricing-button \\}>
              {tier.buttonText}
            </button>
          </div>
        ))}
      </div>
      
      <div className="tc-investments-addon">
        <h3>TC Investments File Processing</h3>
        <p><strong>\ per file</strong> - Available to all tiers</p>
        <p>Professional file processing and analysis service</p>
        <button className="btn-file-processing">Process a File</button>
      </div>
    </div>
  );
};

export default PricingTiers;
