import { Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
require('dotenv/config')

@Injectable()
export class SendgridService {
    constructor() {

        SendGrid.setApiKey(process.env.SEND_GRID_ACCESS_KEY)
    }

    async send(mail: SendGrid.MailDataRequired) {
        try {
            const transport = await SendGrid.send(mail);
            console.log(`Email enviado para ${mail.to}`)
            return transport;
        } catch (error) {
            console.log(error)
        }
    }
}