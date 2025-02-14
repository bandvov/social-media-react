import React from "react";
import { Container, Typography, Box, IconButton, Link } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn, YouTube } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#333",
        color: "white",
        textAlign: "center",
        p: 2,
      }}
    >
      <Container>
        <Typography variant="body1">&copy; {new Date().getFullYear()} Your Company</Typography>
        <Box mt={1}>
          <IconButton href="https://facebook.com/yourpage" target="_blank" sx={{ color: "white" }}>
            <Facebook />
          </IconButton>
          <IconButton href="https://twitter.com/yourhandle" target="_blank" sx={{ color: "white" }}>
            <Twitter />
          </IconButton>
          <IconButton href="https://instagram.com/yourprofile" target="_blank" sx={{ color: "white" }}>
            <Instagram />
          </IconButton>
          <IconButton href="https://linkedin.com/company/yourcompany" target="_blank" sx={{ color: "white" }}>
            <LinkedIn />
          </IconButton>
          <IconButton href="https://youtube.com/yourchannel" target="_blank" sx={{ color: "white" }}>
            <YouTube />
          </IconButton>
        </Box>
        <Box mt={2}>
          <Link href="/privacy-policy" color="inherit" underline="hover" sx={{ mx: 1 }}>Privacy Policy</Link>
          <Link href="/terms-of-service" color="inherit" underline="hover" sx={{ mx: 1 }}>Terms of Service</Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
