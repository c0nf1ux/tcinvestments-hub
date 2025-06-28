import React, { useState } from 'react';

const SubscriptionPlans = () => {
 const [loading, setLoading] = useState(false);

 const plans = [
   {
     name: 'Free',
     price: 0,
     period: 'forever',
     features: [
       'Basic card search',
       'Community features',
       'Portfolio up to $10K',
       'Basic deck building'
     ],
     buttonText: 'Current Plan',
     current: true
   },
   {
     name: 'Premium',
     price: 9.99,
     period: 'month',
     features: [
       'Everything in Free',
       'Advanced analytics',
       'Real-time alerts',
       'Unlimited portfolio',
       'AI recommendations'
     ],
     buttonText: 'Upgrade to Premium',
     popular: true
   },
   {
     name: 'Enterprise',
     price: 14.99,
     period: 'month',
     features: [
       'Everything in Premium',
       'Unlimited file processing',
       'API access',
       'Advanced trading tools',
       'Dedicated support'
     ],
     buttonText: 'Upgrade to Enterprise'
   }
 ];

 return (
   <div style={{padding: '2rem', color: '#fff', maxWidth: '1200px', margin: '0 auto'}}>
     <h1 style={{textAlign: 'center', color: '#8A2BE2', marginBottom: '2rem'}}>
       Choose Your Plan
     </h1>
     
     <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
       {plans.map((plan, index) => (
         <div 
           key={index} 
           style={{
             background: plan.popular ? 'rgba(138, 43, 226, 0.2)' : 'rgba(138, 43, 226, 0.1)',
             border: `2px solid ${plan.popular ? '#8A2BE2' : 'rgba(138, 43, 226, 0.3)'}`,
             borderRadius: '16px',
             padding: '2rem',
             textAlign: 'center',
             position: 'relative'
           }}
         >
           {plan.popular && (
             <div style={{
               position: 'absolute',
               top: '-12px',
               left: '50%',
               transform: 'translateX(-50%)',
               background: '#8A2BE2',
               color: 'white',
               padding: '0.5rem 1rem',
               borderRadius: '20px',
               fontSize: '0.8rem',
               fontWeight: 'bold'
             }}>
               Most Popular
             </div>
           )}
           
           <h3 style={{marginBottom: '1rem'}}>{plan.name}</h3>
           
           <div style={{fontSize: '3rem', fontWeight: 'bold', color: '#8A2BE2', margin: '1rem 0'}}>
             ${plan.price}
             {plan.price > 0 && <span style={{fontSize: '1rem', color: '#999'}}>/{plan.period}</span>}
           </div>
           
           <ul style={{listStyle: 'none', padding: 0, margin: '2rem 0', textAlign: 'left'}}>
             {plan.features.map((feature, i) => (
               <li key={i} style={{padding: '0.5rem 0', borderBottom: '1px solid rgba(138, 43, 226, 0.2)'}}>
                  {feature}
               </li>
             ))}
           </ul>
           
           <button 
             style={{
               width: '100%',
               padding: '1rem',
               border: 'none',
               borderRadius: '8px',
               background: plan.popular ? '#8A2BE2' : '#333',
               color: 'white',
               fontWeight: 'bold',
               cursor: 'pointer'
             }}
             disabled={loading || plan.current}
           >
             {loading ? 'Processing...' : plan.buttonText}
           </button>
         </div>
       ))}
     </div>
     
     <div style={{
       marginTop: '3rem',
       padding: '2rem',
       background: 'rgba(138, 43, 226, 0.1)',
       borderRadius: '16px',
       textAlign: 'center'
     }}>
       <h3 style={{color: '#8A2BE2'}}>TC Investments File Processing</h3>
       <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#8A2BE2', margin: '1rem 0'}}>
         $59 per file
       </div>
       <p>Professional file processing and analysis service</p>
       <button style={{
         background: '#8A2BE2',
         color: 'white',
         border: 'none',
         padding: '1rem 2rem',
         borderRadius: '8px',
         fontWeight: 'bold',
         cursor: 'pointer'
       }}>
         Process a File - $59
       </button>
     </div>
   </div>
 );
};

export default SubscriptionPlans;
