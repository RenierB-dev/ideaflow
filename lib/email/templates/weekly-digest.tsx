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

interface Idea {
  id: string;
  problem: string;
  category: string;
  painScore: number;
  validationScore: number;
  redditUpvotes: number;
}

interface WeeklyDigestEmailProps {
  userName?: string;
  ideas?: Idea[];
  weekNumber?: number;
}

export const WeeklyDigestEmail = ({
  userName = 'there',
  ideas = [],
  weekNumber = 1,
}: WeeklyDigestEmailProps) => {
  const previewText = `${ideas.length} new validated startup ideas this week`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            🔥 {ideas.length} Hot Ideas This Week
          </Heading>

          <Text style={text}>
            Hi {userName},
          </Text>

          <Text style={text}>
            Here are the most validated startup opportunities we discovered from Reddit this week.
            Each idea is backed by real people asking for solutions.
          </Text>

          <Hr style={hr} />

          {ideas.slice(0, 5).map((idea, index) => (
            <Section key={idea.id} style={ideaCard}>
              <Text style={ideaNumber}>#{index + 1}</Text>
              <Heading style={ideaTitle}>{idea.problem}</Heading>

              <Section style={metaRow}>
                <Text style={badge}>
                  {idea.category}
                </Text>
                <Text style={score}>
                  Pain Score: {idea.painScore}/10
                </Text>
              </Section>

              <Text style={ideaText}>
                <strong>Validation:</strong> {idea.validationScore}% validated ·
                {idea.redditUpvotes} upvotes on Reddit
              </Text>

              <Button
                style={ideaButton}
                href={`${process.env.NEXT_PUBLIC_APP_URL}/ideas/${idea.id}`}
              >
                View AI Analysis
              </Button>
            </Section>
          ))}

          <Hr style={hr} />

          <Section style={statsBox}>
            <Heading style={statsHeading}>This Week's Stats</Heading>
            <Text style={statsText}>
              📊 {ideas.length} new ideas discovered<br />
              🔥 Average pain score: {(ideas.reduce((acc, i) => acc + i.painScore, 0) / ideas.length).toFixed(1)}/10<br />
              ⭐ Most popular category: {getMostPopularCategory(ideas)}
            </Text>
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href={`${process.env.NEXT_PUBLIC_APP_URL}/ideas`}>
              Browse All Ideas
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={promoText}>
            <strong>Want unlimited AI analysis?</strong> Upgrade to Pro and get detailed
            market insights, monetization strategies, and tech stack recommendations for every idea.
          </Text>

          <Section style={buttonContainer}>
            <Button style={secondaryButton} href={`${process.env.NEXT_PUBLIC_APP_URL}/pricing`}>
              Upgrade to Pro - $19/mo
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footerText}>
            IdeaFlow - Weekly Digest · Week {weekNumber}<br />
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/settings`} style={link}>
              Manage email preferences
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

function getMostPopularCategory(ideas: Idea[]): string {
  const counts: Record<string, number> = {};
  ideas.forEach(idea => {
    counts[idea.category] = (counts[idea.category] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'SaaS';
}

export default WeeklyDigestEmail;

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
  padding: '24px',
  margin: '16px 40px',
  border: '1px solid #e5e7eb',
};

const ideaNumber = {
  color: '#0070f3',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
};

const ideaTitle = {
  color: '#1a1a1a',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
  lineHeight: '1.4',
};

const metaRow = {
  display: 'flex',
  gap: '12px',
  margin: '12px 0',
};

const badge = {
  display: 'inline-block',
  backgroundColor: '#f0f9ff',
  color: '#0c4a6e',
  fontSize: '12px',
  fontWeight: '600',
  padding: '4px 12px',
  borderRadius: '4px',
  margin: '0',
};

const score = {
  color: '#ef4444',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
  padding: '4px 0',
};

const ideaText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '12px 0',
};

const ideaButton = {
  backgroundColor: '#0070f3',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '14px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '10px 20px',
  marginTop: '12px',
};

const statsBox = {
  backgroundColor: '#ecfdf5',
  borderRadius: '8px',
  padding: '24px',
  margin: '32px 40px',
  border: '1px solid #a7f3d0',
};

const statsHeading = {
  color: '#065f46',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
};

const statsText = {
  color: '#065f46',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0',
};

const buttonContainer = {
  padding: '20px 40px',
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
  padding: '14px 28px',
};

const secondaryButton = {
  backgroundColor: '#10b981',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '14px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

const promoText = {
  color: '#1a1a1a',
  fontSize: '15px',
  lineHeight: '24px',
  padding: '0 40px',
  margin: '16px 0',
  textAlign: 'center' as const,
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
