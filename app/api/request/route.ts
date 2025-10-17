import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, contact, requestType, deviceType, message } = body;

    // Validate input
    if (!name || !email || !contact || !requestType || !deviceType || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to Admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Customer Request - ${requestType}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0b0b0b; color: #e0e0e0; padding: 20px; border-radius: 10px;">
          <h2 style="color: #00bcd4;">New Customer Request</h2>
          <p><strong>Full Name:</strong> ${name}</p>
          <p><strong>Email Address:</strong> ${email}</p>
          <p><strong>Contact Number / WhatsApp:</strong> ${contact}</p>
          <p><strong>Type of Request:</strong> ${requestType}</p>
          <p><strong>Device Type:</strong> ${deviceType}</p>
          <p><strong>Message / Description:</strong></p>
          <div style="background-color: #121212; padding: 15px; border-radius: 8px; color: #ccc;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr style="margin-top: 20px; border: 1px solid #333;">
          <p style="font-size: 12px; color: #888;">This message was sent automatically from the Customer Request form on your website.</p>
        </div>
      `,
      replyTo: email,
    };

    // Email to Customer (Confirmation)
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Request Confirmation - ${requestType}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0b0b0b; color: #e0e0e0; padding: 20px; border-radius: 10px;">
          <h2 style="color: #00bcd4;">Thank You for Contacting AA's Computer and Remote Services!</h2>
          <p>Hi ${name},</p>
          <p>We've successfully received your request regarding <strong>${requestType}</strong>.</p>
          <p>Our team will review your message and get back to you as soon as possible via email or WhatsApp.</p>
          <p>Thank you for trusting <strong>AA's Computer and Remote Services</strong> — we're always here to help you with your computer needs.</p>
          <hr style="margin-top: 20px; border: 1px solid #333;">
          <p style="font-size: 12px; color: #888;">This is an automated confirmation email. Please do not reply directly.</p>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerMailOptions),
    ]);

    return NextResponse.json(
      { message: 'Request sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send request. Please try again later.' },
      { status: 500 }
    );
  }
}
