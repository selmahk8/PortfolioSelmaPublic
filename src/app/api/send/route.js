// import { EmailTemplate } from '../../../components/EmailTemplate';
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend('re_B8JzGQgx_JgeLjR2ttW9jw1kgnZPKVLzR');
const fromEmail = process.env.FROM_EMAIL;

export async function POST(req, res) {
  const { email, subject, message } = await req.json();
  console.log(email, subject, message);
  try {
    const data = await resend.emails.send({
      from: "selmahk@resend.dev",
      to: ["selmahadjkhelifa@yahoo.fr", email],
      subject: subject,
      react: (
        <>
          <h1>Thank you for contacting Selma!</h1>
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

