import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';

export class MailHelper {
  private sesClient: SESv2Client;

  constructor() {
    this.sesClient = new SESv2Client({
      region: process.env.AWS_DEFAULT_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  async sendEmail(toEmail: string, subject: string, body: string) {
    const params = {
      Destination: {
        ToAddresses: [toEmail],
      },
      Content: {
        Simple: {
          Body: {
            Html: {
              Data: body,
              Charset: 'utf-8',
            },
          },
          Subject: {
            Data: subject,
            Charset: 'utf-8',
          },
        },
      },
      FromEmailAddress: 'no-reply@liszthoven.id',
    };

    try {
      const command = new SendEmailCommand(params);
      const response = await this.sesClient.send(command);
      console.log('✅ Email sent successfully:', response);
      return response;
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      throw error;
    }
  }
}
