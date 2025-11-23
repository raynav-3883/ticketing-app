import React from 'react';
import {
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Box,
  Divider,
  LinearProgress
} from '@mui/material';
import {
  Flight,
  Train,
  DirectionsBus,
  AccessTime,
  AttachMoney,
  TrendingUp,
  Star,
  Schedule,
  Route
} from '@mui/icons-material';

const RouteResults = ({ routes = [], loading = false }) => {
  const transportIcons = {
    flight: <Flight className="text-travel-blue" />,
    train: <Train className="text-travel-green" />,
    bus: <DirectionsBus className="text-travel-orange" />
  };

  const routeTypeColors = {
    cheapest: 'success',
    fastest: 'warning',
    balanced: 'primary'
  };

  const routeTypeIcons = {
    cheapest: <AttachMoney />,
    fastest: <AccessTime />,
    balanced: <TrendingUp />
  };

  if (loading) {
    return (
      <Paper className="p-6 bg-gradient-card shadow-card rounded-2xl">
        <Typography variant="h6" className="mb-4 text-foreground">
          Searching for routes...
        </Typography>
        <LinearProgress className="mb-4" />
        <Typography variant="body2" className="text-muted-foreground">
          Our AI is analyzing thousands of routes to find the best options for you.
        </Typography>
      </Paper>
    );
  }

  if (!routes.length) {
    return (
      <Paper className="p-6 bg-gradient-card shadow-card rounded-2xl text-center">
        <Route className="text-6xl text-muted-foreground mb-4" />
        <Typography variant="h6" className="mb-2 text-foreground">
          No routes found
        </Typography>
        <Typography variant="body2" className="text-muted-foreground">
          Try adjusting your search criteria or transportation modes.
        </Typography>
      </Paper>
    );
  }

  return (
    <div className="space-y-4">
      <Typography variant="h5" className="font-bold text-foreground mb-6">
        Route Results ({routes.length})
      </Typography>
      
      {routes.map((route, index) => (
        <Card 
          key={index} 
          className="shadow-card hover:shadow-travel transition-all duration-300 border border-border"
          elevation={0}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Chip
                  icon={routeTypeIcons[route.type]}
                  label={route.type.charAt(0).toUpperCase() + route.type.slice(1)}
                  color={routeTypeColors[route.type]}
                  variant="filled"
                  className="font-semibold"
                />
                {route.recommended && (
                  <Chip
                    icon={<Star />}
                    label="AI Recommended"
                    color="warning"
                    variant="outlined"
                    size="small"
                  />
                )}
              </div>
              <Typography variant="h6" className="font-bold text-primary">
                Rs.{route.price}
              </Typography>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <AccessTime className="text-muted-foreground" />
                <div>
                  <Typography variant="body2" className="text-muted-foreground">
                    Duration
                  </Typography>
                  <Typography variant="body1" className="font-semibold">
                    {route.duration}
                  </Typography>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Schedule className="text-muted-foreground" />
                <div>
                  <Typography variant="body2" className="text-muted-foreground">
                    Departure
                  </Typography>
                  <Typography variant="body1" className="font-semibold">
                    {route.departure}
                  </Typography>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <TrendingUp className="text-muted-foreground" />
                <div>
                  <Typography variant="body2" className="text-muted-foreground">
                    Transfers
                  </Typography>
                  <Typography variant="body1" className="font-semibold">
                    {route.transfers}
                  </Typography>
                </div>
              </div>
            </div>

            <Divider className="my-4" />

            {/* Route Segments */}
            <div className="space-y-3">
              <Typography variant="body2" className="text-muted-foreground mb-2">
                Route Details
              </Typography>
              {route.segments?.map((segment, segIndex) => (
                <div key={segIndex} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                  {transportIcons[segment.mode]}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <Typography variant="body2" className="font-semibold">
                        {segment.from} → {segment.to}
                      </Typography>
                      <Typography variant="body2" className="text-muted-foreground">
                        {segment.duration}
                      </Typography>
                    </div>
                    <Typography variant="caption" className="text-muted-foreground">
                      {segment.operator} • {segment.mode.charAt(0).toUpperCase() + segment.mode.slice(1)}
                    </Typography>
                  </div>
                  <Typography variant="body2" className="font-semibold text-primary">
                    Rs.{segment.price}
                  </Typography>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              
              <Button
                variant="contained"
                className="bg-gradient-primary text-white"
                size="large"
              >
                Book Now
              </Button>
              <Button
                variant="outlined"
                className="border-border text-foreground"
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RouteResults;