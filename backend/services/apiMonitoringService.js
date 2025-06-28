const fs = require('fs');

class APIMonitoringService {
   constructor() {
       this.stats = {
           requests: 0,
           errors: 0,
           rateLimits: {},
           uptime: Date.now(),
           responses: []
       };
   }

   logRequest(service, query, responseTime, success = true) {
       this.stats.requests++;
       if (!success) this.stats.errors++;
       
       this.stats.responses.push({
           service,
           query,
           responseTime,
           success,
           timestamp: Date.now()
       });

       // Keep only last 1000 responses
       if (this.stats.responses.length > 1000) {
           this.stats.responses = this.stats.responses.slice(-1000);
       }
   }

   updateRateLimit(service, remaining) {
       this.stats.rateLimits[service] = {
           remaining,
           lastUpdate: Date.now()
       };
   }

   getHealthStatus() {
       const uptime = Date.now() - this.stats.uptime;
       const successRate = this.stats.requests > 0 ? 
           ((this.stats.requests - this.stats.errors) / this.stats.requests * 100).toFixed(2) : 100;

       return {
           uptime: Math.floor(uptime / 1000),
           totalRequests: this.stats.requests,
           errorRate: this.stats.errors,
           successRate: `${successRate}%`,
           rateLimits: this.stats.rateLimits,
           averageResponseTime: this.getAverageResponseTime()
       };
   }

   getAverageResponseTime() {
       if (this.stats.responses.length === 0) return 0;
       const total = this.stats.responses.reduce((sum, r) => sum + r.responseTime, 0);
       return Math.round(total / this.stats.responses.length);
   }
}

module.exports = new APIMonitoringService();


