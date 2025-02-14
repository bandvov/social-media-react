import React from "react";
import { Container, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Privacy Policy
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Last Updated: [Date]
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="h5" gutterBottom>
        1. Introduction
      </Typography>
      <Typography paragraph>
        Welcome to [Your Company Name]. Your privacy is important to us. This Privacy Policy explains how we collect, 
        use, disclose, and safeguard your information when you visit our website.
      </Typography>
      
      <Typography variant="h5" gutterBottom>
        2. Information We Collect
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Personal Information (e.g., name, email, phone number) when you sign up or contact us." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Usage Data (e.g., IP address, browser type, pages visited) to improve our services." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Cookies & Tracking Technologies to personalize user experience." />
        </ListItem>
      </List>
      
      <Typography variant="h5" gutterBottom>
        3. How We Use Your Information
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Provide, operate, and improve our website." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Send updates, promotions, or respond to inquiries." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Ensure security and prevent fraud." />
        </ListItem>
      </List>
      
      <Typography variant="h5" gutterBottom>
        4. Sharing Your Information
      </Typography>
      <Typography paragraph>
        We do not sell your personal data. However, we may share it with:
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Service providers (e.g., hosting, analytics) who help us run the website." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Law enforcement if required by law." />
        </ListItem>
      </List>
      
      <Typography variant="h5" gutterBottom>
        5. Your Rights & Choices
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Access, update, or delete your personal data." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Opt out of marketing communications." />
        </ListItem>
      </List>
      
      <Typography variant="h5" gutterBottom>
        6. Contact Us
      </Typography>
      <Typography paragraph>
        If you have any questions about this Privacy Policy, please contact us at [Your Contact Email].
      </Typography>
    </Container>
  );
};

export default PrivacyPolicy;
