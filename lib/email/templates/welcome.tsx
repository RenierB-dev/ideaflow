import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeEmailProps {
  userName?: string;
  userEmail?: string;
}

export const WelcomeEmail = ({
  userName = 'there',
  userEmail,
}: WelcomeEmailProps) => {
  const previewText = `Welcome to IdeaFlow - Discover validated startup ideas`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to IdeaFlow! 🚀</Heading>

          <Text style={text}>
            Hi {userName},
          </Text>

          <Text style={text}>
            Thanks for joining IdeaFlow! You're now part of a community of entrepreneurs
            discovering validated startup ideas from real problems people discuss on Reddit.
          </Text>

          <Section style={highlightBox}>
            <Text style={highlightText}>
              <strong>Here's what you can do:</strong>
            </Text>
            <Text style={bulletText}>
              ✅ Browse 100+ validated startup ideas<br />
              ✅ See pain scores and validation metrics<br />
              ✅ Save ideas to your personal board<br />
              ✅ Get AI-powered market analysis (Pro)<br />
              ✅ Receive weekly idea digests
            </Text>
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href={`${process.env.NEXT_PUBLIC_APP_URL}/ideas`}>
              Browse Ideas Now
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={text}>
            <strong>Quick Start Tips:</strong>
          </Text>
          <Text style={text}>
            1. <strong>Explore categories</strong> - Filter by SaaS, E-commerce, Productivity, and more<br />
            2. <strong>Check pain scores</strong> - Higher scores = bigger problems to solve<br />
            3. <strong>Save your favorites</strong> - Build your idea board for future reference<br />
            4. <strong>Upgrade to Pro</strong> - Get unlimited AI analysis and insights
          </Text>

          <Hr style={hr} />

          <Text style={text}>
            Need help getting started? Reply to this email or check out our{' '}
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/docs`} style={link}>
              documentation
            </Link>.
          </Text>

          <Text style={footer}>
            Happy idea hunting! 🎯<br />
            The IdeaFlow Team
          </Text>

          <Hr style={hr} />

          <Text style={footerText}>
            IdeaFlow - Validated Startup Ideas from Reddit<br />
            {userEmail && (
              <>
                You're receiving this because you signed up with {userEmail}.{' '}
              </>
            )}
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/settings`} style={link}>
              Manage preferences
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0 40px',
  lineHeight: '1.3',
};

const text = {
  color: '#525252',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 40px',
  margin: '16px 0',
};

const highlightBox = {
  backgroundColor: '#f0f9ff',
  borderRadius: '8px',
  padding: '24px',
  margin: '32px 40px',
  border: '1px solid #bae6fd',
};

const highlightText = {
  color: '#0c4a6e',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 12px 0',
};

const bulletText = {
  color: '#0c4a6e',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '8px 0',
};

const buttonContainer = {
  padding: '27px 40px',
};

const button = {
  backgroundColor: '#0070f3',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '14px 20px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '32px 40px',
};

const link = {
  color: '#0070f3',
  textDecoration: 'underline',
};

const footer = {
  color: '#1a1a1a',
  fontSize: '16px',
  lineHeight: '24px',
  padding: '0 40px',
  margin: '24px 0',
};

const footerText = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 40px',
  margin: '16px 0',
};
