import { ServerClient } from "postmark";

var client = new ServerClient("3e53ea17-b99b-4666-8482-0e88dac35a45");

export async function sendPasswordResetEmail(to: string, token: string) {
  await client.sendEmail({
    From: 'contato@weslleydev.com',
    To: to,
    Subject: 'Password Reset',
    TextBody: `Use o link a seguir para redefinir sua senha: http://localhost/reset-password-update?token=${token}`,
    MessageStream: "api-testing",
  });
}