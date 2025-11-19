import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user already has a referral code
    const { data: existingCode, error: fetchError } = await supabase
      .from('referral_codes')
      .select('code')
      .eq('user_id', user.id)
      .single();

    if (existingCode) {
      return NextResponse.json({
        success: true,
        code: existingCode.code,
        message: 'Referral code already exists',
      });
    }

    // Generate new referral code
    const { data: newCode, error: generateError } = await supabase
      .rpc('generate_referral_code');

    if (generateError) {
      console.error('Failed to generate code:', generateError);
      return NextResponse.json(
        { error: 'Failed to generate referral code' },
        { status: 500 }
      );
    }

    // Insert referral code
    const { error: insertError } = await supabase
      .from('referral_codes')
      .insert({
        user_id: user.id,
        code: newCode,
      });

    if (insertError) {
      console.error('Failed to insert code:', insertError);
      return NextResponse.json(
        { error: 'Failed to save referral code' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      code: newCode,
      message: 'Referral code generated successfully',
    });
  } catch (error) {
    console.error('Generate referral code error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's referral code
    const { data: code, error: fetchError } = await supabase
      .from('referral_codes')
      .select('code, created_at')
      .eq('user_id', user.id)
      .single();

    if (fetchError || !code) {
      return NextResponse.json(
        { error: 'No referral code found' },
        { status: 404 }
      );
    }

    // Get referral stats
    const { data: referrals, error: statsError } = await supabase
      .from('referrals')
      .select('status')
      .eq('referrer_id', user.id);

    const stats = {
      total: referrals?.length || 0,
      pending: referrals?.filter(r => r.status === 'pending').length || 0,
      completed: referrals?.filter(r => r.status === 'completed').length || 0,
      rewarded: referrals?.filter(r => r.status === 'rewarded').length || 0,
    };

    return NextResponse.json({
      success: true,
      code: code.code,
      createdAt: code.created_at,
      stats,
    });
  } catch (error) {
    console.error('Get referral code error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
