import React from "react";
import { Container, Typography, Box } from "@mui/material";

const TermsOfService = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Terms of Service
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Last Updated: [Date]
        </Typography>
        
        <Box mt={2}>
          <Typography variant="h6">1. Acceptance of Terms</Typography>
          <Typography>
            By accessing or using [Your Website Name], you agree to comply with these Terms of Service. If you do not agree, please do not use our website.
          </Typography>
        </Box>

        <Box mt={2}>
          <Typography variant="h6">2. Use of Website</Typography>
          <Typography>You agree not to:</Typography>
          <ul>
            <li>Use the site for unlawful purposes.</li>
            <li>Disrupt or interfere with the website’s functionality.</li>
            <li>Copy, modify, or distribute content without permission.</li>
          </ul>
        </Box>

        <Box mt={2}>
          <Typography variant="h6">3. Intellectual Property</Typography>
          <Typography>
            All content on this site, including text, graphics, and logos, is the property of [Your Company Name] and protected by copyright laws.
          </Typography>
        </Box>

        <Box mt={2}>
          <Typography variant="h6">4. Limitation of Liability</Typography>
          <Typography>
            We are not responsible for any damages resulting from your use of the website. The site is provided "as is" without warranties.
          </Typography>
        </Box>

        <Box mt={2}>
          <Typography variant="h6">5. Changes to Terms</Typography>
          <Typography>
            We reserve the right to update these terms at any time. Continued use of the site after changes means you accept the new terms.
          </Typography>
        </Box>

        <Box mt={2}>
          <Typography variant="h6">6. Contact Us</Typography>
          <Typography>
            For any questions about these terms, contact us at [Your Contact Email].
          </Typography>
        </Box>
    </Container>
  );
};

export default TermsOfService;
