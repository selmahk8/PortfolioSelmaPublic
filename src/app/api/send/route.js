// import { EmailTemplate } from '../../../components/EmailTemplate';
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend('your_resend_code_here');
const fromEmail = process.env.FROM_EMAIL;

export async function POST(req, res) {
  const { email, subject, message } = await req.json();
  console.log(email, subject, message);
  try {
    const data = await resend.emails.send({
      from: "your_name_here@resend.dev",
      to: ["your_email_here", email],
      subject: subject,
      react: (
        <>
          <h1>Thank you for contacting Me !</h1>
          <p>{subject}</p>
          <h1>New message submitted:</h1>
          <p>{message}</p>
          <h1>Your email:</h1>
          <p>{email}</p>
        </>
      ),
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

