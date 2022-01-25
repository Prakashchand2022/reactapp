import * as nodeMailer from 'nodemailer';
import * as SendGrid from 'nodemailer-sendgrid-transport';


export class NodeMailer{

   private static initializeTransport(){
       return nodeMailer.createTransport(SendGrid({
        auth: {
            api_key: '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'
        }
    }))

   }
    static sendEmail(data:{to:[string], subject:string,html:string}): Promise<any> {
      return NodeMailer.initializeTransport().sendMail({
      from:'pc.saini2022@gmail.com',
      to:data.to,
      subject:data.subject,
      html:data.html
    });
   }
}