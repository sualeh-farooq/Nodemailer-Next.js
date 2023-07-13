import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    const mailOptions = {
      from: `"${name}" <${process.env.yourEmail}>`,
      // replyTo: email, // Customer's email address
      to: email, // Your email address set in the environment variable  -  process.env.yourEmail
      subject: 'New Message from Nodemailer Testing',
      text: message,
    };

    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.smtpuser,
          pass: process.env.smtppass,
        },
      });

      await transporter.sendMail(mailOptions);
      console.log('Email sent');
      res.status(200).json({ message: 'Email sent' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
