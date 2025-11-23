import React from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';
import {
  TrendingUp,
  Schedule,
  AttachMoney,
  Route,
  Flight,
  Train,
  DirectionsBus
} from '@mui/icons-material';

const StatsOverview = ({ stats = {} }) => {
  const defaultStats = {
    totalRoutes: 156,
    avgPrice: 245,
    avgDuration: '4h 32m',
    savedAmount: 89,
    priceChange: '+12%',
    routesAnalyzed: '2.5M+',
    ...stats
  };

  const statItems = [
    {
      title: 'Routes Found',
      value: defaultStats.totalRoutes,
      icon: <Route className="text-travel-blue" />,
      color: 'text-travel-blue',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Average Price',
      value: `$${defaultStats.avgPrice}`,
      icon: <AttachMoney className="text-travel-green" />,
      color: 'text-travel-green',
      bgColor: 'bg-green-50',
      trend: defaultStats.priceChange
    },
    {
      title: 'Average Duration',
      value: defaultStats.avgDuration,
      icon: <Schedule className="text-travel-orange" />,
      color: 'text-travel-orange',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Potential Savings',
      value: `$${defaultStats.savedAmount}`,
      icon: <TrendingUp className="text-travel-purple" />,
      color: 'text-travel-purple',
      bgColor: 'bg-purple-50'
    }
  ];

  const transportStats = [
    { icon: <Flight />, label: 'Flights', count: 45, color: 'text-travel-blue' },
    { icon: <Train />, label: 'Trains', count: 72, color: 'text-travel-green' },
    { icon: <DirectionsBus />, label: 'Buses', count: 39, color: 'text-travel-orange' }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <Grid container spacing={3}>
        {statItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper className="p-4 bg-gradient-card shadow-card rounded-xl border border-border hover:shadow-travel transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${item.bgColor}`}>
                  {item.icon}
                </div>
                {item.trend && (
                  <Typography 
                    variant="caption" 
                    className={`font-semibold ${
                      item.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {item.trend}
                  </Typography>
                )}
              </div>
              <Typography variant="h5" className={`font-bold ${item.color} mb-1`}>
                {item.value}
              </Typography>
              <Typography variant="body2" className="text-muted-foreground">
                {item.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Transport Mode Distribution */}
      <Paper className="p-6 bg-gradient-card shadow-card rounded-xl border border-border">
        <Typography variant="h6" className="font-semibold text-foreground mb-4">
          Transportation Mode Distribution
        </Typography>
        <Grid container spacing={3}>
          {transportStats.map((transport, index) => (
            <Grid item xs={4} key={index}>
              <div className="text-center">
                <Box className="flex justify-center mb-2">
                  <div className="p-3 rounded-full bg-secondary">
                    {React.cloneElement(transport.icon, { 
                      className: `text-2xl ${transport.color}` 
                    })}
                  </div>
                </Box>
                <Typography variant="h6" className={`font-bold ${transport.color}`}>
                  {transport.count}
                </Typography>
                <Typography variant="body2" className="text-muted-foreground">
                  {transport.label}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* AI Insights */}
      <Paper className="p-6 bg-gradient-card shadow-card rounded-xl border border-border">
        <Typography variant="h6" className="font-semibold text-foreground mb-4">
          AI Travel Insights
        </Typography>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
            <TrendingUp className="text-travel-green mt-1" />
            <div>
              <Typography variant="body2" className="font-semibold text-foreground">
                Best Booking Time
              </Typography>
              <Typography variant="body2" className="text-muted-foreground">
                Prices typically drop 23% on Tuesday afternoons for your selected route.
              </Typography>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
            <Schedule className="text-travel-orange mt-1" />
            <div>
              <Typography variant="body2" className="font-semibold text-foreground">
                Peak Season Alert
              </Typography>
              <Typography variant="body2" className="text-muted-foreground">
                Demand increases 45% in the next 2 weeks. Consider flexible dates.
              </Typography>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default StatsOverview;