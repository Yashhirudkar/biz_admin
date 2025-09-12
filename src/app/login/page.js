'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Tab,
  Tabs,
  Paper,
  Fade,
  InputAdornment,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Dashboard,
} from '@mui/icons-material';
import { loginUser, registerUser, loadUser } from '../../redux/loginSlice';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, errors, user } = useSelector((state) => state.login);
  const [tabValue, setTabValue] = useState(0);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(registerData));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (user) {
    return (
      <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
        <Box sx={{ 
          width: '100%', 
          textAlign: 'center', 
          p: 3, 
          borderRadius: 2,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}>
          <Dashboard sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
            Welcome back, {user.name}!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            You are already logged in.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => router.push('/dashboard')}
            sx={{ borderRadius: 2, px: 4, py: 1 }}
          >
            Go to Dashboard
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ height: '88vh', display: 'flex', alignItems: 'center' }}>
      <Box sx={{ 
        width: '100%',
      }}>
        <Fade in={true} timeout={800}>
          <Paper elevation={10} sx={{ 
            width: '100%', 
            p: { xs: 2, sm: 3 },
            borderRadius: 3,
            background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
            overflow: 'hidden',
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: '#1976d2'
            }
          }}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="h4" component="h1" sx={{ 
                fontWeight: 700, 
                background: '#1976d2',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 0.5
              }}>
                Welcome
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {tabValue === 0 ? 'Sign in to continue' : 'Create your account'}
              </Typography>
            </Box>
            
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="login tabs"
              variant="fullWidth"
              sx={{
                mb: 1,
                '& .MuiTab-root': {
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textTransform: 'none',
                  borderRadius: 1,
                  mx: 0.5,
                  minHeight: '48px'
                },
                '& .Mui-selected': {
                  color: 'primary.main',
                },
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: 2,
                }
              }}
            >
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>
            
            <TabPanel value={tabValue} index={0}>
              <Box component="form" onSubmit={handleLoginSubmit}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={loginData.email}
                  onChange={handleLoginChange}
                  sx={{ mb: 1.5 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.general && (
                  <Alert severity="error" sx={{ mt: 1.5, borderRadius: 2 }}>
                    {errors.general}
                  </Alert>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ 
                    mt: 2, 
                    mb: 1.5, 
                    py: 1, 
                    borderRadius: 2,
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    background: '#1976d2',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    '&:hover': {
                      boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                    }
                  }}
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
                <Divider sx={{ my: 1.5 }}>or</Divider>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Don't have an account?{' '}
                    <Button 
                      color="primary" 
                      onClick={() => setTabValue(1)}
                      sx={{ textTransform: 'none', fontWeight: 600, fontSize: '0.9rem' }}
                    >
                      Sign up
                    </Button>
                  </Typography>
                </Box>
              </Box>
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <Box component="form" onSubmit={handleRegisterSubmit}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  sx={{ mb: 1.5 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  sx={{ mb: 1.5 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.general && (
                  <Alert severity="error" sx={{ mt: 1.5, borderRadius: 2 }}>
                    {errors.general}
                  </Alert>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ 
                    mt: 2, 
                    mb: 1.5, 
                    py: 1, 
                    borderRadius: 2,
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    background: '#1976d2',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    '&:hover': {
                      boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                    }
                  }}
                  disabled={loading}
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </Button>
                <Divider sx={{ my: 1.5 }}>or</Divider>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Already have an account?{' '}
                    <Button 
                      color="primary" 
                      onClick={() => setTabValue(0)}
                      sx={{ textTransform: 'none', fontWeight: 600, fontSize: '0.9rem' }}
                    >
                      Sign in
                    </Button>
                  </Typography>
                </Box>
              </Box>
            </TabPanel>
          </Paper>
        </Fade>
      </Box>
    </Container>
  );
}