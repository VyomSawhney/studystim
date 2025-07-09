import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Save to database (MongoDB, PostgreSQL, etc.)
    // 2. Send to email service (Mailchimp, ConvertKit, etc.)
    // 3. Send confirmation email
    
    // For now, we'll just log it and return success
    console.log('New waitlist signup:', email)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json(
      { 
        message: 'Successfully added to waitlist',
        email: email
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Waitlist signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 