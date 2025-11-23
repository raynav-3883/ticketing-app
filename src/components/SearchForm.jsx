import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Chip,
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  Stack
} from '@mui/material';
import {
  SwapHoriz,
  Flight,
  Train,
  DirectionsBus,
  Search,
  LocationOn,
  CalendarMonth,
  Speed,
  AccountBalanceWallet,
  Balance,
  TrendingUp,
  Explore
} from '@mui/icons-material';

const SearchForm = ({ onSearch }) => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    transportModes: ['flight', 'train', 'bus'],
    routeType: 'balanced'
  });

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTransportModeToggle = (mode) => {
    const newModes = searchData.transportModes.includes(mode)
      ? searchData.transportModes.filter(m => m !== mode)
      : [...searchData.transportModes, mode];
    
    setSearchData(prev => ({
      ...prev,
      transportModes: newModes
    }));
  };

  const swapCities = () => {
    setSearchData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  const handleSearch = () => {
    if (searchData.from && searchData.to) {
      onSearch(searchData);
    }
  };

  const transportOptions = {
    flight: { 
      icon: <Flight />, 
      label: 'Flight',
      color: '#3B82F6',
      bgColor: 'rgba(59, 130, 246, 0.1)'
    },
    train: { 
      icon: <Train />, 
      label: 'Train',
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.1)'
    },
    bus: { 
      icon: <DirectionsBus />, 
      label: 'Bus',
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.1)'
    }
  };

  const routeTypeOptions = {
    cheapest: { 
      icon: <AccountBalanceWallet />, 
      label: 'Cheapest',
      description: 'Best price for your journey',
      color: '#10B981'
    },
    fastest: { 
      icon: <Speed />, 
      label: 'Fastest',
      description: 'Quickest route available',
      color: '#EF4444'
    },
    balanced: { 
      icon: <Balance />, 
      label: 'Balanced',
      description: 'Perfect mix of price & time',
      color: '#8B5CF6'
    }
  };

  return (
    <Card 
      elevation={8}
      sx={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)',
        backdropFilter: 'blur(10px)',
        borderRadius: 4,
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'visible'
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box textAlign="center" mb={4}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            Find Your Perfect Route
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ fontSize: '1.1rem' }}
          >
            Discover the best travel options tailored just for you
          </Typography>
        </Box>
        
        <Stack spacing={4}>
          {/* Journey Details Section */}
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2, 
                display: 'flex', 
                alignItems: 'center',
                color: '#667eea',
                fontWeight: 700,
                fontSize: '1.25rem'
              }}
            >
              <Explore sx={{ mr: 1.5 }} />
              Journey Details
            </Typography>
            
            <Card 
              variant="outlined" 
              sx={{ 
                p: 3.5, 
                background: 'linear-gradient(135deg, rgba(103, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
                border: '2px solid rgba(103, 126, 234, 0.15)',
                borderRadius: 3,
                position: 'relative',
                overflow: 'visible'
              }}
            >
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={5}>
                  <Box>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        mb: 1, 
                        color: '#4B5563',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontSize: '0.75rem'
                      }}
                    >
                      Departure
                    </Typography>
                    <TextField
                      fullWidth
                      label="From"
                      variant="outlined"
                      value={searchData.from}
                      onChange={(e) => handleInputChange('from', e.target.value)}
                      placeholder="Enter departure city"
                      InputProps={{
                        startAdornment: <LocationOn sx={{ mr: 1.5, color: '#667eea' }} />
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                          borderRadius: 2.5,
                          height: 56,
                          fontSize: '1.1rem',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 12px 30px -8px rgba(103, 126, 234, 0.25)'
                          },
                          '&.Mui-focused': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 16px 40px -8px rgba(103, 126, 234, 0.35)'
                          }
                        }
                      }}
                    />
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={2} display="flex" justifyContent="center" alignItems="flex-end" sx={{ pb: 1 }}>
                  <Tooltip title="Swap cities" placement="top">
                    <IconButton
                      onClick={swapCities}
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        width: 64,
                        height: 64,
                        boxShadow: '0 8px 25px -8px rgba(103, 126, 234, 0.4)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          transform: 'rotate(180deg) scale(1.15)',
                          boxShadow: '0 16px 40px -8px rgba(103, 126, 234, 0.6)'
                        }
                      }}
                    >
                      <SwapHoriz sx={{ fontSize: 28 }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
                
                <Grid item xs={12} md={5}>
                  <Box>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        mb: 1, 
                        color: '#4B5563',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontSize: '0.75rem'
                      }}
                    >
                      Destination
                    </Typography>
                    <TextField
                      fullWidth
                      label="To"
                      variant="outlined"
                      value={searchData.to}
                      onChange={(e) => handleInputChange('to', e.target.value)}
                      placeholder="Enter destination city"
                      InputProps={{
                        startAdornment: <LocationOn sx={{ mr: 1.5, color: '#764ba2' }} />
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                          borderRadius: 2.5,
                          height: 56,
                          fontSize: '1.1rem',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 12px 30px -8px rgba(118, 75, 162, 0.25)'
                          },
                          '&.Mui-focused': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 16px 40px -8px rgba(118, 75, 162, 0.35)'
                          }
                        }
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Box>

          {/* Travel Preferences Section */}
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2, 
                display: 'flex', 
                alignItems: 'center',
                color: '#4B5563',
                fontWeight: 700,
                fontSize: '1.25rem'
              }}
            >
              <CalendarMonth sx={{ mr: 1.5 }} />
              Travel Preferences
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    p: 3, 
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.04) 100%)',
                    border: '2px solid rgba(16, 185, 129, 0.15)',
                    borderRadius: 3,
                    height: '100%'
                  }}
                >
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      mb: 2, 
                      color: '#059669',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      fontSize: '0.75rem'
                    }}
                  >
                    When are you traveling?
                  </Typography>
                  <TextField
                    fullWidth
                    label="Departure Date"
                    type="date"
                    variant="outlined"
                    value={searchData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <CalendarMonth sx={{ mr: 1.5, color: '#10B981' }} />
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                        borderRadius: 2.5,
                        height: 56,
                        fontSize: '1.1rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-1px)',
                          boxShadow: '0 8px 25px -8px rgba(16, 185, 129, 0.25)'
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-1px)',
                          boxShadow: '0 12px 35px -8px rgba(16, 185, 129, 0.35)'
                        }
                      }
                    }}
                  />
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    p: 3, 
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0.04) 100%)',
                    border: '2px solid rgba(139, 92, 246, 0.15)',
                    borderRadius: 3,
                    height: '100%'
                  }}
                >
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      mb: 2, 
                      color: '#7C3AED',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      fontSize: '0.75rem'
                    }}
                  >
                    What matters most?
                  </Typography>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Route Preference</InputLabel>
                    <Select
                      value={searchData.routeType}
                      onChange={(e) => handleInputChange('routeType', e.target.value)}
                      label="Route Preference"
                      sx={{
                        backgroundColor: 'white',
                        borderRadius: 2.5,
                        height: 56,
                        fontSize: '1.1rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-1px)',
                          boxShadow: '0 8px 25px -8px rgba(139, 92, 246, 0.25)'
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-1px)',
                          boxShadow: '0 12px 35px -8px rgba(139, 92, 246, 0.35)'
                        }
                      }}
                    >
                      {Object.entries(routeTypeOptions).map(([key, option]) => (
                        <MenuItem key={key} value={key} sx={{ py: 2 }}>
                          <Box display="flex" alignItems="center" width="100%">
                            {React.cloneElement(option.icon, { 
                              sx: { mr: 2, color: option.color, fontSize: 24 } 
                            })}
                            <Box>
                              <Typography variant="body1" fontWeight={600} sx={{ fontSize: '1.1rem' }}>
                                {option.label}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                                {option.description}
                              </Typography>
                            </Box>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Transportation Modes Section */}
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2, 
                display: 'flex', 
                alignItems: 'center',
                color: '#4B5563',
                fontWeight: 700,
                fontSize: '1.25rem'
              }}
            >
              <TrendingUp sx={{ mr: 1.5 }} />
              Transportation Modes
            </Typography>
            
            <Card 
              variant="outlined" 
              sx={{ 
                p: 4, 
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(16, 185, 129, 0.03) 50%, rgba(245, 158, 11, 0.03) 100%)',
                border: '2px solid rgba(59, 130, 246, 0.1)',
                borderRadius: 3
              }}
            >
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 3, 
                  color: '#6B7280',
                  fontSize: '1rem',
                  textAlign: 'center'
                }}
              >
                Select your preferred modes of transportation
              </Typography>
              
              <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
                {Object.entries(transportOptions).map(([mode, option]) => (
                  <Chip
                    key={mode}
                    icon={option.icon}
                    label={option.label}
                    onClick={() => handleTransportModeToggle(mode)}
                    sx={{
                      px: 3,
                      py: 1.5,
                      height: 56,
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      borderRadius: 4,
                      minWidth: 140,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      ...(searchData.transportModes.includes(mode) ? {
                        background: `linear-gradient(135deg, ${option.color} 0%, ${option.color}DD 100%)`,
                        color: 'white',
                        boxShadow: `0 12px 30px -8px ${option.color}60`,
                        transform: 'translateY(-3px)',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: `0 20px 45px -8px ${option.color}80`
                        }
                      } : {
                        backgroundColor: 'white',
                        color: option.color,
                        border: `2px solid ${option.color}40`,
                        '&:hover': {
                          backgroundColor: option.bgColor,
                          transform: 'translateY(-2px)',
                          boxShadow: `0 8px 25px -8px ${option.color}40`
                        }
                      })
                    }}
                  />
                ))}
              </Box>
            </Card>
          </Box>

          {/* Search Button Section */}
          <Box sx={{ pt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSearch}
              disabled={!searchData.from || !searchData.to}
              startIcon={<Search sx={{ fontSize: 24 }} />}
              sx={{
                py: 3,
                px: 6,
                fontSize: '1.3rem',
                fontWeight: 800,
                borderRadius: 4,
                height: 64,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 16px 40px -8px rgba(103, 126, 234, 0.4)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                textTransform: 'none',
                letterSpacing: '0.5px',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 25px 55px -8px rgba(103, 126, 234, 0.6)'
                },
                '&:active': {
                  transform: 'translateY(-2px)'
                },
                '&:disabled': {
                  background: 'linear-gradient(135deg, #D1D5DB 0%, #9CA3AF 100%)',
                  transform: 'none',
                  boxShadow: 'none',
                  color: '#6B7280'
                }
              }}
            >
              Search Amazing Routes
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SearchForm;