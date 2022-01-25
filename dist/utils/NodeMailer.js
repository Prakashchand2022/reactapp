"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMailer = void 0;
const nodeMailer = require("nodemailer");
const SendGrid = require("nodemailer-sendgrid-transport");
class NodeMailer {
    static initializeTransport() {
        return nodeMailer.createTransport(SendGrid({
            auth: {
                api_key: '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'
            }
        }));
    }
    static sendEmail(data) {
        return NodeMailer.initializeTransport().sendMail({
            from: 'pc.saini2022@gmail.com',
            to: data.to,
            subject: data.subject,
            html: data.html
        });
    }
}
exports.NodeMailer = NodeMailer;
