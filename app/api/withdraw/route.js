import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const response = await fetch('https://stocktitan.site/api/withdrawals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Withdraw API error:', error)
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    )
  }
}
