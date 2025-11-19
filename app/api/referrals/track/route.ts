import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Referral code is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Verify referral code exists
    const { data: referralCode, error: codeError } = await supabase
      .from('referral_codes')
      .select('user_id')
      .eq('code', code)
      .single();

    if (codeError || !referralCode) {
      return NextResponse.json(
        { error: 'Invalid referral code' },
        { status: 404 }
      );
    }

    // Create pending referral
    const { error: insertError } = await supabase
      .from('referrals')
      .insert({
        referrer_id: referralCode.user_id,
        code: code,
        status: 'pending',
      });

    if (insertError) {
      console.error('Failed to track referral:', insertError);
      return NextResponse.json(
        { error: 'Failed to track referral' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Referral tracked successfully',
    });
  } catch (error) {
    console.error('Track referral error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
