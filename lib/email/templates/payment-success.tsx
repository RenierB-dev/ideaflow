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

interface PaymentSuccessEmailProps {
  userName?: string;
  amount?: number;
  plan?: string;
  nextBillingDate?: string;
}

export const PaymentSuccessEmail = ({
  userName = 'there',
  amount = 19,
  plan = 'Pro',
  nextBillingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
}: PaymentSuccessEmailProps) => {
  const previewText = `Welcome to IdeaFlow ${plan}! Your subscription is active.`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={successBadge}>
            ✅ Payment Successful
          </Section>

          <Heading style={h1}>
            Welcome to IdeaFlow {plan}! 🎉
          </Heading>

          <Text style={text}>
            Hi {userName},
          </Text>

          <Text style={text}>
            Thank you for upgrading to IdeaFlow {plan}! Your subscription is now active,
            and you have full access to all premium features.
          </Text>

          <Section style={invoiceBox}>
            <Heading style={invoiceHeading}>Payment Summary</Heading>

            <Section style={invoiceRow}>
              <Text style={invoiceLabel}>Plan</Text>
              <Text style={invoiceValue}>IdeaFlow {plan}</Text>
            </Section>

            <Section style={invoiceRow}>
              <Text style={invoiceLabel}>Amount</Text>
              <Text style={invoiceValue}>${amount}.00</Text>
            </Section>

            <Section style={invoiceRow}>
              <Text style={invoiceLabel}>Billing Cycle</Text>
              <Text style={invoiceValue}>Monthly</Text>
            </Section>

            <Section style={invoiceRow}>
              <Text style={invoiceLabel}>Next Billing Date</Text>
              <Text style={invoiceValue}>{nextBillingDate}</Text>
            </Section>

            <Hr style={divider} />

            <Section style={invoiceRow}>
              <Text style={invoiceTotal}>Total Paid</Text>
              <Text style={invoiceTotal}>${amount}.00</Text>
            </Section>
          </Section>

          <Hr style={hr} />

          <Heading style={h2}>What's Included in Your {plan} Plan:</Heading>

          <Section style={featureGrid}>
            <Section style={featureCard}>
              <Text style={featureIcon}>🤖</Text>
              <Text style={featureTitle}>Unlimited AI Analysis</Text>
              <Text style={featureDesc}>
                Get detailed market insights, monetization strategies, and tech recommendations
                for every idea.
              </Text>
            </Section>

            <Section style={featureCard}>
              <Text style={featureIcon}>💡</Text>
              <Text style={featureTitle}>Unlimited Saved Ideas</Text>
              <Text style={featureDesc}>
                Save as many ideas as you want and organize them into your personal board.
              </Text>
            </Section>

            <Section style={featureCard}>
              <Text style={featureIcon}>📧</Text>
              <Text style={featureTitle}>Email Alerts</Text>
              <Text style={featureDesc}>
                Get notified when new high-potential ideas match your preferences.
              </Text>
            </Section>

            <Section style={featureCard}>
              <Text style={featureIcon}>⚡</Text>
              <Text style={featureTitle}>Priority Support</Text>
              <Text style={featureDesc}>
                Get faster responses and dedicated help from our team.
              </Text>
            </Section>
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href={`${process.env.NEXT_PUBLIC_APP_URL}/ideas`}>
              Start Exploring Ideas
            </Button>
          </Section>

          <Hr style={hr} />

          <Section style={tipsBox}>
            <Heading style={tipsHeading}>Getting Started Tips:</Heading>
            <Text style={tipItem}>
              1️⃣ <strong>Browse trending ideas</strong> - Check out what's hot this week
            </Text>
            <Text style={tipItem}>
              2️⃣ <strong>Use AI analysis</strong> - Click any idea to see detailed insights
            </Text>
            <Text style={tipItem}>
              3️⃣ <strong>Set up alerts</strong> - Get notified about ideas in your favorite categories
            </Text>
            <Text style={tipItem}>
              4️⃣ <strong>Save & organize</strong> - Build your personal idea board
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={text}>
            <strong>Need Help?</strong>
          </Text>

          <Text style={text}>
            • <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/docs`} style={link}>Documentation & Guides</Link><br />
            • <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/faq`} style={link}>Frequently Asked Questions</Link><br />
            • <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/support`} style={link}>Contact Support</Link><br />
            • <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/settings/billing`} style={link}>Manage Subscription</Link>
          </Text>

          <Hr style={hr} />

          <Text style={appreciationText}>
            We're thrilled to have you as a Pro member! If you have any questions or feedback,
            just reply to this email. We're here to help you find your next big idea. 🚀
          </Text>

          <Text style={signature}>
            Best regards,<br />
            The IdeaFlow Team
          </Text>

          <Hr style={hr} />

          <Text style={footerText}>
            IdeaFlow {plan} Subscription · ${amount}/month<br />
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/settings/billing`} style={link}>
              Manage subscription
            </Link>
            {' · '}
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/invoices`} style={link}>
              View invoices
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default PaymentSuccessEmail;

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

const successBadge = {
  backgroundColor: '#d1fae5',
  color: '#065f46',
  fontSize: '14px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  padding: '12px 16px',
  margin: '20px 40px',
  borderRadius: '8px',
  border: '2px solid #10b981',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '24px 40px',
  lineHeight: '1.3',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#1a1a1a',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '32px 40px 20px',
  lineHeight: '1.3',
};

const text = {
  color: '#525252',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 40px',
  margin: '16px 0',
};

const invoiceBox = {
  backgroundColor: '#fafafa',
  borderRadius: '12px',
  padding: '24px',
  margin: '32px 40px',
  border: '1px solid #e5e7eb',
};

const invoiceHeading = {
  color: '#1a1a1a',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 20px 0',
};

const invoiceRow = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '12px 0',
};

const invoiceLabel = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0',
};

const invoiceValue = {
  color: '#1a1a1a',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
};

const invoiceTotal = {
  color: '#1a1a1a',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
};

const divider = {
  borderColor: '#e5e7eb',
  margin: '16px 0',
};

const featureGrid = {
  padding: '0 40px',
};

const featureCard = {
  marginBottom: '24px',
};

const featureIcon = {
  fontSize: '32px',
  margin: '0 0 8px 0',
};

const featureTitle = {
  color: '#1a1a1a',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
};

const featureDesc = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0',
};

const buttonContainer = {
  padding: '32px 40px',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#0070f3',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
};

const tipsBox = {
  backgroundColor: '#eff6ff',
  borderRadius: '8px',
  padding: '24px',
  margin: '32px 40px',
  border: '1px solid #bfdbfe',
};

const tipsHeading = {
  color: '#1e40af',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
};

const tipItem = {
  color: '#1e40af',
  fontSize: '14px',
  lineHeight: '28px',
  margin: '0',
};

const appreciationText = {
  color: '#1a1a1a',
  fontSize: '15px',
  lineHeight: '24px',
  padding: '0 40px',
  margin: '16px 0',
  textAlign: 'center' as const,
};

const signature = {
  color: '#1a1a1a',
  fontSize: '15px',
  lineHeight: '24px',
  padding: '0 40px',
  margin: '24px 0',
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
  fontSize: '12px',
  lineHeight: '20px',
  padding: '0 40px',
  margin: '16px 0',
  textAlign: 'center' as const,
};
