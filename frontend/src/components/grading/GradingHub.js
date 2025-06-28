import React, { useState, useEffect } from 'react';
import './GradingHub.css';

const GradingHub = () => {
  const [activeService, setActiveService] = useState('PSA');
  const [submissions, setSubmissions] = useState([]);
  const [gradingForm, setGradingForm] = useState({
    service: 'PSA',
    cardType: 'sports',
    submissionType: 'regular',
    quantity: 1
  });

  // Grading services data - 8M+ annual submissions
  const gradingServices = {
    PSA: {
      name: 'Professional Sports Authenticator',
      marketShare: '60%',
      logo: '',
      pricing: {
        regular: 20,
        express: 75,
        super_express: 150,
        walk_through: 600
      },
      turnaround: {
        regular: '45 business days',
        express: '12 business days', 
        super_express: '5 business days',
        walk_through: '1 business day'
      },
      description: 'Industry leader with highest market value multiplier',
      annualSubmissions: '4.8M cards'
    },
    BGS: {
      name: 'Beckett Grading Services',
      marketShare: '25%',
      logo: '',
      pricing: {
        regular: 25,
        express: 85,
        super_express: 175,
        walk_through: 750
      },
      turnaround: {
        regular: '30 business days',
        express: '10 business days',
        super_express: '4 business days', 
        walk_through: '1 business day'
      },
      description: 'Subgrade system provides detailed condition analysis',
      annualSubmissions: '2M cards'
    },
    SGC: {
      name: 'Sportscard Guaranty Corporation',
      marketShare: '10%',
      logo: '',
      pricing: {
        regular: 15,
        express: 50,
        super_express: 100,
        walk_through: 400
      },
      turnaround: {
        regular: '21 business days',
        express: '8 business days',
        super_express: '3 business days',
        walk_through: '1 business day'
      },
      description: 'Fast turnaround with competitive pricing',
      annualSubmissions: '800K cards'
    },
    CGC: {
      name: 'Certified Guaranty Company',
      marketShare: '5%',
      logo: '',
      pricing: {
        regular: 18,
        express: 65,
        super_express: 125,
        walk_through: 500
      },
      turnaround: {
        regular: '28 business days',
        express: '9 business days',
        super_express: '4 business days',
        walk_through: '1 business day'
      },
      description: 'Newest service with growing TCG focus',
      annualSubmissions: '400K cards'
    }
  };

  const mockSubmissions = [
    {
      id: 'PSA001234567',
      service: 'PSA',
      status: 'Grading',
      submitted: '2024-05-15',
      cards: 12,
      estimated_completion: '2024-07-01',
      total_cost: 240
    },
    {
      id: 'BGS987654321', 
      service: 'BGS',
      status: 'Quality Control',
      submitted: '2024-05-20',
      cards: 8,
      estimated_completion: '2024-06-25',
      total_cost: 200
    },
    {
      id: 'SGC555666777',
      service: 'SGC', 
      status: 'Completed',
      submitted: '2024-04-10',
      cards: 15,
      estimated_completion: '2024-05-15',
      total_cost: 225,
      grades: [9, 9, 10, 8, 9, 10, 9, 8, 9, 9, 10, 9, 8, 9, 9]
    }
  ];

  useEffect(() => {
    setSubmissions(mockSubmissions);
  }, []);

  const calculateROI = (originalValue, grade, service) => {
    const multipliers = {
      PSA: { 8: 1.5, 9: 3.2, 10: 8.5 },
      BGS: { 8: 1.3, 9: 2.8, 10: 7.2 },
      SGC: { 8: 1.2, 9: 2.5, 10: 6.0 },
      CGC: { 8: 1.1, 9: 2.2, 10: 5.5 }
    };
    return (originalValue * multipliers[service][grade] - originalValue).toFixed(2);
  };

  return (
    <div className="grading-hub">
      <div className="hub-header">
        <h2> Professional Grading Services - 8M+ Annual Submissions</h2>
        <p>Complete grading ecosystem with submission tracking and ROI analysis</p>
      </div>

      {/* Service Selector */}
      <div className="service-selector">
        {Object.entries(gradingServices).map(([key, service]) => (
          <button
            key={key}
            className={`service-btn ${activeService === key ? 'active' : ''}`}
            onClick={() => setActiveService(key)}
          >
            <div className="service-info">
              <span className="service-logo">{service.logo}</span>
              <span className="service-name">{key}</span>
              <span className="market-share">{service.marketShare}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Active Service Details */}
      <div className="service-details">
        <div className="service-overview">
          <h3>{gradingServices[activeService].logo} {gradingServices[activeService].name}</h3>
          <p>{gradingServices[activeService].description}</p>
          <div className="service-stats">
            <div className="stat">
              <h4>Market Share</h4>
              <p>{gradingServices[activeService].marketShare}</p>
            </div>
            <div className="stat">
              <h4>Annual Volume</h4>
              <p>{gradingServices[activeService].annualSubmissions}</p>
            </div>
          </div>
        </div>

        <div className="pricing-table">
          <h4> Pricing & Turnaround</h4>
          <table>
            <thead>
              <tr>
                <th>Service Level</th>
                <th>Price per Card</th>
                <th>Turnaround</th>
                <th>Best For</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(gradingServices[activeService].pricing).map(([level, price]) => (
                <tr key={level}>
                  <td>{level.replace('_', ' ').toUpperCase()}</td>
                  <td>${price}</td>
                  <td>{gradingServices[activeService].turnaround[level]}</td>
                  <td>
                    {level === 'regular' && 'Bulk submissions'}
                    {level === 'express' && 'Moderate value cards'}
                    {level === 'super_express' && 'High value cards'}
                    {level === 'walk_through' && 'Ultra premium cards'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submission Tracker */}
      <div className="submission-tracker">
        <h3> Submission Tracker</h3>
        <div className="submissions-list">
          {submissions.map(sub => (
            <div key={sub.id} className="submission-card">
              <div className="submission-header">
                <span className="submission-id">{sub.id}</span>
                <span className={`status ${sub.status.toLowerCase().replace(' ', '-')}`}>
                  {sub.status}
                </span>
              </div>
              <div className="submission-details">
                <p><strong>Service:</strong> {sub.service}</p>
                <p><strong>Submitted:</strong> {sub.submitted}</p>
                <p><strong>Cards:</strong> {sub.cards}</p>
                <p><strong>Total Cost:</strong> ${sub.total_cost}</p>
                <p><strong>Est. Completion:</strong> {sub.estimated_completion}</p>
                {sub.grades && (
                  <div className="grades-preview">
                    <strong>Grades:</strong> {sub.grades.join(', ')}
                    <p className="roi-estimate">
                      Est. ROI: +${sub.grades.reduce((acc, grade) => acc + parseFloat(calculateROI(50, grade, sub.service)), 0).toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROI Calculator */}
      <div className="roi-calculator">
        <h3> Grading ROI Calculator</h3>
        <div className="calculator-form">
          <input type="number" placeholder="Card Value ($)" />
          <select>
            <option value="8">Grade 8</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
          </select>
          <select>
            {Object.keys(gradingServices).map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
          <button>Calculate ROI</button>
        </div>
      </div>

      {/* Market Statistics */}
      <div className="market-stats">
        <h3> Grading Market Overview</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <h4>Total Annual Submissions</h4>
            <p className="big-number">8M+</p>
            <p className="growth">+22% YoY</p>
          </div>
          <div className="stat-card">
            <h4>Average Grade Distribution</h4>
            <div className="grade-dist">
              <span>PSA 10: 12%</span>
              <span>PSA 9: 35%</span>
              <span>PSA 8: 28%</span>
            </div>
          </div>
          <div className="stat-card">
            <h4>Market Value</h4>
            <p className="big-number">$2.1B</p>
            <p className="growth">Graded cards premium</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradingHub;
