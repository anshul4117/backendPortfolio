import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { ObjectId } from 'mongodb';
import nodemailer from 'nodemailer';

// Helper function to check admin JWT authorization
async function verifyAdminAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
        return false;
    }

    try {
        const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key_anshul_portfolio_12345';
        const secret = new TextEncoder().encode(jwtSecret);
        await jwtVerify(token, secret);
        return true;
    } catch (err) {
        console.error('JWT verification error:', err);
        return false;
    }
}

// GET - Retrieve messages (protected)
export async function GET() {
    try {
        const isAuthorized = await verifyAdminAuth();
        if (!isAuthorized) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { db } = await connectToDatabase();
        const messages = await db
            .collection('messages')
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        // Convert Mongo ObjectID to string for JSON serialization
        const serialized = messages.map(msg => ({
            ...msg,
            _id: msg._id.toString(),
        }));

        return NextResponse.json({ success: true, messages: serialized });
    } catch (error) {
        console.error('Fetch messages error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST - Submit new contact message (public)
export async function POST(req: NextRequest) {
    try {
        const { name, company, email, topic, message } = await req.json();

        // Simple validation
        if (!name || !email || !topic || !message) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const { db } = await connectToDatabase();
        const newMessage = {
            name: name.trim(),
            company: company?.trim() || '',
            email: email.trim().toLowerCase(),
            topic,
            message: message.trim(),
            createdAt: new Date(),
        };

        const result = await db.collection('messages').insertOne(newMessage);

        // Send email alert to you using Nodemailer
        try {
            const emailUser = process.env.EMAIL_USER;
            const emailPass = process.env.EMAIL_PASS;
            const emailTo = process.env.EMAIL_TO || 'anshul41171@gmail.com';

            if (emailUser && emailPass) {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: emailUser,
                        pass: emailPass,
                    },
                });

                let topicLabel = topic;
                if (topic === 'hiring') topicLabel = '💼 Hiring for a Role';
                else if (topic === 'collaboration') topicLabel = '🛠️ Project Collaboration';
                else if (topic === 'tech_chat') topicLabel = '💬 Technical Chat';
                else if (topic === 'just_hi') topicLabel = '👋 Just Saying Hi!';

                const mailOptions = {
                    from: `"Portfolio Contact Form" <${emailUser}>`,
                    to: emailTo,
                    subject: `New Portfolio Message from ${name.trim()}`,
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px; background-color: #ffffff; color: #333333;">
                            <h2 style="color: #22c55e; border-bottom: 2px solid #22c55e; padding-bottom: 10px; margin-top: 0; font-family: sans-serif;">New Message Alert</h2>
                            <p style="margin: 15px 0;"><strong>Sender Name:</strong> ${name.trim()}</p>
                            <p style="margin: 15px 0;"><strong>Email Address:</strong> <a href="mailto:${email.trim()}" style="color: #22c55e; text-decoration: none;">${email.trim()}</a></p>
                            <p style="margin: 15px 0;"><strong>Company:</strong> ${company?.trim() || 'N/A'}</p>
                            <p style="margin: 15px 0;"><strong>Purpose:</strong> ${topicLabel}</p>
                            <h3 style="margin-top: 25px; margin-bottom: 10px; color: #444; font-family: sans-serif;">Message Content:</h3>
                            <div style="background-color: #f9f9f9; border: 1px solid #ddd; padding: 15px; border-radius: 6px; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #333333; font-family: sans-serif;">
                                ${message.trim()}
                            </div>
                            <p style="font-size: 11px; color: #888; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px; text-align: center; font-family: monospace;">
                                Sent from your Next.js Portfolio Connection Wizard.
                            </p>
                        </div>
                    `
                };

                await transporter.sendMail(mailOptions);
            }
        } catch (emailError) {
            console.error('Nodemailer error: Failed to send email alert:', emailError);
            // We catch but do not block, since database write succeeded.
        }

        return NextResponse.json({ 
            success: true, 
            messageId: result.insertedId.toString() 
        });
    } catch (error) {
        console.error('Submit message error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE - Delete message (protected)
export async function DELETE(req: NextRequest) {
    try {
        const isAuthorized = await verifyAdminAuth();
        if (!isAuthorized) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = await req.json();
        if (!id) {
            return NextResponse.json(
                { success: false, error: 'Missing message ID' },
                { status: 400 }
            );
        }

        const { db } = await connectToDatabase();
        const result = await db
            .collection('messages')
            .deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { success: false, error: 'Message not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete message error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
