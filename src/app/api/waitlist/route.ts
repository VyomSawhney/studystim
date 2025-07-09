import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/firebase'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'

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

    // Check if email already exists
    const waitlistRef = collection(db, 'waitlist')
    const emailQuery = query(waitlistRef, where('email', '==', email.toLowerCase()))
    const existingEmails = await getDocs(emailQuery)

    if (!existingEmails.empty) {
      return NextResponse.json(
        { error: 'Email already registered for waitlist' },
        { status: 409 }
      )
    }

    // Add email to Firestore
    const docRef = await addDoc(waitlistRef, {
      email: email.toLowerCase(),
      timestamp: new Date(),
      source: 'landing_page',
      status: 'active'
    })

    console.log('New waitlist signup saved to Firestore:', email, 'Doc ID:', docRef.id)

    return NextResponse.json(
      { 
        message: 'Successfully added to waitlist',
        email: email
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Waitlist signup error:', error)
    
    // More specific error handling
    if (error instanceof Error) {
      if (error.message.includes('Firebase')) {
        return NextResponse.json(
          { error: 'Database connection error. Please try again.' },
          { status: 503 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 