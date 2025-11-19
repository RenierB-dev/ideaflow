import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface UpgradePromptEmailProps {
  userName?: string;
  ideasSaved?: number;
  analysesViewed?: number;
}

export const UpgradePromptEmail = ({
  userName = 'there',
  ideasSaved = 5,
  analysesViewed = 3,
}: UpgradePromptEmailProps) => {
  const previewText = `Unlock unlimited AI analysis with IdeaFlow Pro`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            You're loving IdeaFlow! 💎
          </Heading>

          <Text style={text}>
            Hi {userName},
          </Text>

          <Text style={text}>
            We noticed you've saved {ideasSaved} ideas and viewed {analysesViewed} AI analyses.
            You're clearly serious about finding your next startup opportunity!
          </Text>

          <Section style={statsBox}>
            <Text style={statsText}>
              📊 Your IdeaFlow Activity<br /><br />
              💡 {ideasSaved} ideas saved<br />
              🤖 {analysesViewed} AI analyses viewed<br />
              ⏰ Free tier limit reached
            </Text>
          </Section>

          <Text style={text}>
            <strong>Ready to unlock your full potential?</strong>
          </Text>

          <Section style={proBox}>
            <Heading style={proHeading}>IdeaFlow Pro - $19/month</Heading>

            <Section style={featureList}>
              <Text style={feature}>✅ Unlimited AI market analyses</Text>
              <Text style={feature}>✅ Detailed monetization strategies</Text>
              <Text style={feature}>✅ Tech stack recommendations</Text>
              <Text style={feature}>✅ Build time & cost estimates</Text>
              <Text style={feature}>✅ Competition analysis</Text>
              <Text style={feature}>✅ Target customer profiles</Text>
              <Text style={feature}>✅ Priority email support</Text>
              <Text style={feature}>✅ Early access to new features</Text>
            </Section>

            <Button style={proButton} href={`${process.env.NEXT_PUBLIC_APP_URL}/pricing`}>
              Upgrade to Pro - $19/mo
            </Button>

            <Text style={guarantee}>
              🔒 Cancel anytime · 30-day money-back guarantee
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={comparisonSection}>
            <Heading style={comparisonHeading}>Free vs Pro</Heading>

            <table style={table}>
              <thead>
                <tr>
                  <th style={tableHeader}>Feature</th>
                  <th style={tableHeader}>Free</th>
                  <th style={tableHeader}>Pro</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tableCell}>AI Analyses</td>
                  <td style={tableCell}>3/month</td>
                  <td style={tableCellPro}>Unlimited</td>
                </tr>
                <tr style={tableRowAlt}>
                  <td style={tableCell}>Saved Ideas</td>
                  <td style={tableCell}>10 max</td>
                  <td style={tableCellPro}>Unlimited</td>
                </tr>
                <tr>
                  <td style={tableCell}>Email Alerts</td>
                  <td style={tableCell}>❌</td>
                  <td style={tableCellPro}>✅</td>
                </tr>
                <tr style={tableRowAlt}>
                  <td style={tableCell}>Priority Support</td>
                  <td style={tableCell}>❌</td>
                  <td style={tableCellPro}>✅</td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Hr style={hr} />

          <Section style={testimonialBox}>
            <Text style={testimonialText}>
              "IdeaFlow Pro helped me discover and validate my SaaS idea in just 2 weeks.
              The AI analysis saved me months of research. Best $19 I've ever spent!"
            </Text>
            <Text style={testimonialAuthor}>
              — Sarah K., Founder @ TaskFlow
            </Text>
          </Section>

          <Section style={urgencyBox}>
            <Text style={urgencyText}>
              ⚡ <strong>Limited Time:</strong> Upgrade this week and get your first month 50% off!
              Use code <strong>LAUNCH50</strong> at checkout.
            </Text>
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href={`${process.env.NEXT_PUBLIC_APP_URL}/pricing?code=LAUNCH50`}>
              Claim 50% Off - Upgrade Now
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footerText}>
            Questions? Reply to this email or check our{' '}
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/faq`} style={link}>FAQ</Link>.<br /><br />
            Not interested? <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/settings`} style={link}>
              Update email preferences
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default UpgradePromptEmail;

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
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '40px 40px 20px',
  lineHeight: '1.3',
  textAlign: 'center' as const,
};

const text = {
  color: '#525252',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 40px',
  margin: '16px 0',
};

const statsBox = {
  backgroundColor: '#fafafa',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 40px',
  border: '1px solid #e5e7eb',
  textAlign: 'center' as const,
};

const statsText = {
  color: '#1a1a1a',
  fontSize: '16px',
  lineHeight: '28px',
  margin: '0',
};

const proBox = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '12px',
  padding: '32px',
  margin: '32px 40px',
  textAlign: 'center' as const,
};

const proHeading = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 24px 0',
};

const featureList = {
  textAlign: 'left' as const,
  margin: '20px 0',
};

const feature = {
  color: '#ffffff',
  fontSize: '15px',
  lineHeight: '32px',
  margin: '0',
};

const proButton = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  color: '#667eea',
  fontSize: '18px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
  marginTop: '24px',
};

const guarantee = {
  color: '#ffffff',
  fontSize: '13px',
  margin: '16px 0 0 0',
  opacity: 0.9,
};

const comparisonSection = {
  padding: '0 40px',
  margin: '32px 0',
};

const comparisonHeading = {
  color: '#1a1a1a',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 20px 0',
  textAlign: 'center' as const,
};

const table = {
  width: '100%',
  borderCollapse: 'collapse' as const,
};

const tableHeader = {
  backgroundColor: '#f9fafb',
  color: '#1a1a1a',
  fontSize: '14px',
  fontWeight: 'bold',
  padding: '12px',
  textAlign: 'left' as const,
  borderBottom: '2px solid #e5e7eb',
};

const tableRow = {
  borderBottom: '1px solid #f3f4f6',
};

const tableRowAlt = {
  backgroundColor: '#fafafa',
  borderBottom: '1px solid #f3f4f6',
};

const tableCell = {
  color: '#525252',
  fontSize: '14px',
  padding: '12px',
};

const tableCellPro = {
  color: '#0070f3',
  fontSize: '14px',
  fontWeight: '600',
  padding: '12px',
};

const testimonialBox = {
  backgroundColor: '#f0f9ff',
  borderRadius: '8px',
  padding: '24px',
  margin: '32px 40px',
  borderLeft: '4px solid #0070f3',
};

const testimonialText = {
  color: '#1a1a1a',
  fontSize: '15px',
  fontStyle: 'italic',
  lineHeight: '24px',
  margin: '0 0 12px 0',
};

const testimonialAuthor = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0',
};

const urgencyBox = {
  backgroundColor: '#fef3c7',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 40px',
  border: '2px solid #fbbf24',
  textAlign: 'center' as const,
};

const urgencyText = {
  color: '#92400e',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0',
};

const buttonContainer = {
  padding: '24px 40px',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#10b981',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '32px 40px',
};

const link = {
  color: '#0070f3',
  textDecoration: 'underline',
};

const footerText = {
  color: '#8898aa',
  fontSize: '13px',
  lineHeight: '20px',
  padding: '0 40px',
  margin: '16px 0',
  textAlign: 'center' as const,
};
