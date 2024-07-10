// import { Resend } from 'resend';
const { Resend } = require('resend');
const resend = new Resend('re_ewES351i_Fw8gn2AzaD4WKMW4VeRrH7N4');

async function main() {
  const { data, error } = await resend.emails.send({
    from: 'Linguify <mail@linguify.id.vn>',
    to: ['hoangnguyenanhtuyen@gmail.com'],
    subject: 'Verify your email address!',
    text: 'it works!',
    headers: {
      'X-Entity-Ref-ID': '123456789',
    },
    tags: [
      {
        name: 'category',
        value: 'confirm_email',
      },
    ],
  });
  if (error) {
    console.error(error);
  }
}

main();
