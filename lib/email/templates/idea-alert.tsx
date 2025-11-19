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

interface IdeaAlertEmailProps {
  userName?: string;
  idea: {
    id: string;
    problem: string;
    category: string;
    painScore: number;
    validationScore: number;
    redditUpvotes: number;
    redditComments: number;
  };
}

export const IdeaAlertEmail = ({
  userName = 'there',
  idea,
}: IdeaAlertEmailProps) => {
  const previewText = `New ${idea.category} idea: ${idea.problem.substring(0, 50)}...`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={alertBadge}>
            🔔 New Idea Alert
          </Section>

          <Heading style={h1}>
            New {idea.category} Opportunity Detected
          </Heading>

          <Text style={text}>
            Hi {userName},
          </Text>

          <Text style={text}>
            We just discovered a high-potential startup idea in your favorite category:
          </Text>

          <Section style={ideaCard}>
            <Text style={categoryBadge}>{idea.category}</Text>

            <Heading style={ideaTitle}>{idea.problem}</Heading>

            <Hr style={divider} />

            <Section style={metricsGrid}>
              <Section style={metric}>
                <Text style={metricValue}>{idea.painScore}/10</Text>
                <Text style={metricLabel}>Pain Score</Text>
              </Section>

              <Section style={metric}>
                <Text style={metricValue}>{idea.validationScore}%</Text>
                <Text style={metricLabel}>Validated</Text>
              </Section>

              <Section style={metric}>
                <Text style={metricValue}>{idea.redditUpvotes}</Text>
                <Text style={metricLabel}>Upvotes</Text>
              </Section>

              <Section style={metric}>
                <Text style={metricValue}>{idea.redditComments}</Text>
                <Text style={metricLabel}>Comments</Text>
              </Section>
            </Section>

            <Hr style={divider} />

            <Text style={ideaText}>
              This idea scored {idea.painScore}/10 on our pain scale and has {idea.validationScore}%
              validation based on Reddit engagement. People are actively discussing this problem.
            </Text>

            <Button
              style={button}
              href={`${process.env.NEXT_PUBLIC_APP_URL}/ideas/${idea.id}`}
            >
              View Full AI Analysis
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={tipBox}>
            💡 <strong>Pro Tip:</strong> High-pain problems (8+/10) with strong validation
            make the best startup opportunities. Act fast before someone else does!
          </Text>

          <Hr style={hr} />

          <Text style={footerText}>
            IdeaFlow - Idea Alert<br />
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/settings/alerts`} style={link}>
              Manage alert preferences
            </Link>
            {' · '}
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/settings/notifications`} style={link}>
              Unsubscribe
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default IdeaAlertEmail;

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

const alertBadge = {
  backgroundColor: '#fef3c7',
  color: '#92400e',
  fontSize: '12px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  padding: '8px 16px',
  margin: '20px 40px',
  borderRadius: '6px',
  border: '1px solid #fbbf24',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '20px 40px',
  lineHeight: '1.3',
};

const text = {
  color: '#525252',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 40px',
  margin: '16px 0',
};

const ideaCard = {
  backgroundColor: '#fafafa',
  borderRadius: '12px',
  padding: '32px',
  margin: '24px 40px',
  border: '2px solid #0070f3',
};

const categoryBadge = {
  display: 'inline-block',
  backgroundColor: '#eff6ff',
  color: '#1e40af',
  fontSize: '12px',
  fontWeight: 'bold',
  padding: '6px 12px',
  borderRadius: '6px',
  margin: '0 0 16px 0',
};

const ideaTitle = {
  color: '#1a1a1a',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0',
  lineHeight: '1.4',
};

const divider = {
  borderColor: '#e5e7eb',
  margin: '20px 0',
};

const metricsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '16px',
  margin: '20px 0',
};

const metric = {
  textAlign: 'center' as const,
};

const metricValue = {
  color: '#0070f3',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 4px 0',
};

const metricLabel = {
  color: '#6b7280',
  fontSize: '12px',
  margin: '0',
};

const ideaText = {
  color: '#525252',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '20px 0',
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
  marginTop: '20px',
};

const tipBox = {
  backgroundColor: '#ecfdf5',
  color: '#065f46',
  fontSize: '14px',
  lineHeight: '22px',
  padding: '16px 20px',
  margin: '0 40px',
  borderRadius: '8px',
  border: '1px solid #a7f3d0',
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
