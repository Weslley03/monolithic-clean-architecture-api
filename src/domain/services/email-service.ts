import { ServerClient } from "postmark";

const CLIENT_POSTMARK_KEY = process.env.CLIENT_POSTMARK_KEY
if(!CLIENT_POSTMARK_KEY) throw new Error('could not acccess CLIENT_POSTMARK_KEY variable');

var client = new ServerClient(CLIENT_POSTMARK_KEY);

export async function sendPasswordResetEmail(to: string, token: string) {
  await client.sendEmail({
    From: 'contato@weslleydev.com',
    To: to,
    Subject: 'Password Reset',
    TextBody: `Use o link a seguir para redefinir sua senha: http://localhost/reset-password-update?token=${token}`,
    MessageStream: "api-testing",
  });
}