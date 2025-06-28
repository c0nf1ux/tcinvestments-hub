'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star, Zap, Crown, TrendingUp, Bell, Shield, Headphones } from 'lucide-react'

interface Plan {
  id: string
  name: string
  price: number
  interval: 'month' | 'year'
  features: string[]
  icon: React.ReactNode
  popular?: boolean
  description: string
}

const SubscriptionPlans = () => {
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month')
  const [loading, setLoading] = useState<string | null>(null)

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Cardhood Basic',
      price: 0,
      interval: 'month',
      description: 'Perfect for getting started with card trading',
      icon: <TrendingUp className="w-6 h-6" />,
      features: [
        'Basic portfolio tracking',
        'Up to 10 watchlist items',
        'Standard price charts',
        'Basic transaction history',
        'Community access',
        '2.5% transaction fees'
      ]
    },
    {
      id: 'premium',
      name: 'Cardhood Premium',
      price: billingInterval === 'month' ? 9.99 : 99.99,
      interval: billingInterval,
      description: 'Advanced features for serious collectors and traders',
      icon: <Star className="w-6 h-6" />,
      popular: true,
      features: [
        'Everything in Basic',
        'Unlimited watchlist items',
        'Real-time price alerts',
        'Advanced analytics & insights',
        'Portfolio optimization tools',
        'Market trend analysis',
        'Priority customer support',
        'API access for data export',
        'Advanced charting tools',
        'Risk assessment metrics'
      ]
    },
    {
      id: 'pro',
      name: 'Cardhood Pro',
      price: billingInterval === 'month' ? 29.99 : 299.99,
      interval: billingInterval,
      description: 'Professional tools for dealers and institutions',
      icon: <Crown className="w-6 h-6" />,
      features: [
        'Everything in Premium',
        'Bulk trading capabilities',
        'Advanced order types',
        'Market making tools',
        'Institutional analytics',
        'White-label solutions',
        'Dedicated account manager',
        'Custom integrations',
        'Priority API access',
        'Advanced risk management'
      ]
    }
  ]

  const handleSubscribe = async (planId: string) => {
    setLoading(planId)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would integrate with Stripe or another payment processor
    console.log('Subscribing to plan:', planId)
    
    setLoading(null)
    // Redirect to success page or update user state
  }

  const yearlyDiscount = 17 // 17% discount for yearly billing

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-periwinkle-900 mb-4">
          Choose Your Cardhood Plan
        </h1>
        <p className="text-xl text-periwinkle-600 mb-8">
          Unlock advanced features and maximize your trading potential
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex bg-periwinkle-100 rounded-lg p-1">
          <button
            onClick={() => setBillingInterval('month')}
            className={px-4 py-2 rounded-md font-medium transition-colors }
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingInterval('year')}
            className={px-4 py-2 rounded-md font-medium transition-colors }
          >
            Yearly
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Save {yearlyDiscount}%
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={elative bg-white rounded-2xl shadow-lg border-2 overflow-hidden }
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-periwinkle-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              </div>
            )}

            <div className="p-8">
              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-periwinkle-100 rounded-lg mb-4">
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-periwinkle-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-periwinkle-600 mb-4">
                  {plan.description}
                </p>
                
                {/* Pricing */}
                <div className="mb-6">
                  {plan.price === 0 ? (
                    <div className="text-4xl font-bold text-periwinkle-900">
                      Free
                    </div>
                  ) : (
                    <div>
                      <div className="text-4xl font-bold text-periwinkle-900">
                        
                        <span className="text-lg font-normal text-periwinkle-600">
                          /{plan.interval}
                        </span>
                      </div>
                      {billingInterval === 'year' && (
                        <div className="text-sm text-green-600 mt-1">
                          /month
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-periwinkle-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading === plan.id}
                className={w-full py-3 px-4 rounded-lg font-medium transition-colors  }
              >
                {loading === plan.id ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : plan.price === 0 ? (
                  'Get Started Free'
                ) : (
                  Subscribe to 
                )}
              </button>

              {plan.price > 0 && (
                <p className="text-xs text-periwinkle-500 text-center mt-3">
                  Cancel anytime. No long-term commitments.
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Feature Comparison */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-periwinkle-900 text-center mb-8">
          Feature Comparison
        </h2>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-periwinkle-50">
                <tr>
                  <th className="px-6 py-4 text-left text-periwinkle-900 font-medium">Features</th>
                  <th className="px-6 py-4 text-center text-periwinkle-900 font-medium">Basic</th>
                  <th className="px-6 py-4 text-center text-periwinkle-900 font-medium">Premium</th>
                  <th className="px-6 py-4 text-center text-periwinkle-900 font-medium">Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-periwinkle-100">
                {[
                  { feature: 'Portfolio Tracking', basic: true, premium: true, pro: true },
                  { feature: 'Watchlist Items', basic: '10', premium: 'Unlimited', pro: 'Unlimited' },
                  { feature: 'Price Alerts', basic: false, premium: true, pro: true },
                  { feature: 'Advanced Analytics', basic: false, premium: true, pro: true },
                  { feature: 'API Access', basic: false, premium: true, pro: true },
                  { feature: 'Bulk Trading', basic: false, premium: false, pro: true },
                  { feature: 'Priority Support', basic: false, premium: true, pro: true },
                  { feature: 'Custom Integrations', basic: false, premium: false, pro: true }
                ].map((row, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-periwinkle-900 font-medium">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      {typeof row.basic === 'boolean' ? (
                        row.basic ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-periwinkle-400"></span>
                        )
                      ) : (
                        <span className="text-periwinkle-700">{row.basic}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof row.premium === 'boolean' ? (
                        row.premium ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-periwinkle-400"></span>
                        )
                      ) : (
                        <span className="text-periwinkle-700">{row.premium}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-periwinkle-400"></span>
                        )
                      ) : (
                        <span className="text-periwinkle-700">{row.pro}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        <div className="flex flex-col items-center">
          <Shield className="w-8 h-8 text-periwinkle-500 mb-2" />
          <h3 className="font-medium text-periwinkle-900">Secure Payments</h3>
          <p className="text-sm text-periwinkle-600">256-bit SSL encryption</p>
        </div>
        <div className="flex flex-col items-center">
          <Headphones className="w-8 h-8 text-periwinkle-500 mb-2" />
          <h3 className="font-medium text-periwinkle-900">24/7 Support</h3>
          <p className="text-sm text-periwinkle-600">Always here to help</p>
        </div>
        <div className="flex flex-col items-center">
          <Zap className="w-8 h-8 text-periwinkle-500 mb-2" />
          <h3 className="font-medium text-periwinkle-900">Instant Activation</h3>
          <p className="text-sm text-periwinkle-600">Start using immediately</p>
        </div>
        <div className="flex flex-col items-center">
          <Bell className="w-8 h-8 text-periwinkle-500 mb-2" />
          <h3 className="font-medium text-periwinkle-900">Cancel Anytime</h3>
          <p className="text-sm text-periwinkle-600">No long-term contracts</p>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPlans
