import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../../../theme/theme';
import MyAccount from './MyAccount';
import InsideLayout from '../../../layout/InsideLayout';
const MyAccountPage = () => {
  return (
    <InsideLayout >
      <CssBaseline />
      <MyAccount />
    </InsideLayout>
  );
};

export default MyAccountPage;
