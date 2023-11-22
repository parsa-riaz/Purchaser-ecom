import nodemailer from "nodemailer";
export const sendEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: "Sale bazar-rest your password",
      html: `<p>We are sorry to hear that you lost your password</p>
      <p> But dont worry try this otp to reset it.</p>
      <h2> Your otp is: ${otp}</h2>`,
    });
    return "email sent successfully";
  } catch (error) {
    console.log(error);
    return "email not sent!";
  }
};
