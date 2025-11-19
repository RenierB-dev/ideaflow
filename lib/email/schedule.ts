import { createClient } from '@/lib/supabase/server';

interface EmailSchedule {
  userId: string;
  emailType: 'welcome' | 'digest' | 'alert' | 'upgrade' | 'payment';
  scheduledFor: Date;
  data?: any;
}

// Schedule an email to be sent later
export async function scheduleEmail(schedule: EmailSchedule) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('email_queue')
    .insert({
      user_id: schedule.userId,
      email_type: schedule.emailType,
      scheduled_for: schedule.scheduledFor.toISOString(),
      data: schedule.data,
      status: 'pending',
    })
    .select()
    .single();

  if (error) {
    console.error('Failed to schedule email:', error);
    throw error;
  }

  return data;
}

// Get pending emails that should be sent
export async function getPendingEmails() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('email_queue')
    .select('*')
    .eq('status', 'pending')
    .lte('scheduled_for', new Date().toISOString())
    .order('scheduled_for', { ascending: true });

  if (error) {
    console.error('Failed to fetch pending emails:', error);
    throw error;
  }

  return data || [];
}

// Mark email as sent
export async function markEmailSent(emailId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('email_queue')
    .update({
      status: 'sent',
      sent_at: new Date().toISOString()
    })
    .eq('id', emailId);

  if (error) {
    console.error('Failed to mark email as sent:', error);
    throw error;
  }
}

// Mark email as failed
export async function markEmailFailed(emailId: string, errorMessage: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('email_queue')
    .update({
      status: 'failed',
      error: errorMessage,
      failed_at: new Date().toISOString()
    })
    .eq('id', emailId);

  if (error) {
    console.error('Failed to mark email as failed:', error);
    throw error;
  }
}

// User email preferences
export async function getUserEmailPreferences(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('user_email_preferences')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
    console.error('Failed to fetch email preferences:', error);
    throw error;
  }

  // Default preferences if none exist
  return data || {
    user_id: userId,
    weekly_digest: true,
    idea_alerts: true,
    marketing: true,
    product_updates: true,
  };
}

// Update user email preferences
export async function updateUserEmailPreferences(
  userId: string,
  preferences: Partial<{
    weekly_digest: boolean;
    idea_alerts: boolean;
    marketing: boolean;
    product_updates: boolean;
  }>
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('user_email_preferences')
    .upsert({
      user_id: userId,
      ...preferences,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('Failed to update email preferences:', error);
    throw error;
  }

  return data;
}

// Check if user should receive email type
export async function shouldSendEmail(userId: string, emailType: string): Promise<boolean> {
  const preferences = await getUserEmailPreferences(userId);

  const mapping: Record<string, keyof typeof preferences> = {
    'digest': 'weekly_digest',
    'alert': 'idea_alerts',
    'upgrade': 'marketing',
    'payment': 'product_updates',
  };

  const preferenceKey = mapping[emailType];
  if (!preferenceKey) return true; // Always send if no preference key

  return preferences[preferenceKey] === true;
}
