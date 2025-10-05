import { supabase } from '../../../../utils/supabase/client';
import { compare } from 'bcryptjs';
import { NextResponse } from 'next/server';

// We no longer need 'jsonwebtoken', 'cookies', or 'jose' for this approach

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    // 1. Find the admin user in the database
    const { data: admin, error } = await supabase
      .from('admins')
      .select('password_hash')
      .eq('email', email)
      .single();

    if (error || !admin) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    // 2. Compare the provided password with the stored hash
    const isPasswordValid = await compare(password, admin.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    // 3. --- THE KEY CHANGE ---
    // If credentials are valid, we simply return a success message.
    // We DO NOT create or set any JWT cookie. The session exists only in the browser's memory.
    
    return NextResponse.json({ message: 'Login successful!' }, { status: 200 });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}