import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'
import dotenv from 'dotenv'
dotenv.config()

export const signup = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount()
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    })
    let message = {
        from: 'ceo@coderhouse.com',
        // to: req.body.useremail,
        to: 'alexmarinmendez@gmail.com',
        subject: 'Felicitaciones! Eres el mejor 😇',
        html: 'Te vamos a aumentar el sueldo...'
    }

    transporter.sendMail(message)
        .then(info => res.status(201).json({ info: nodemailer.getTestMessageUrl(info)}))
        .catch(err => res.status(500).json({ err }))
}

export const getbill = (req, res) => {
    let config = {
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
    }
    let transporter = nodemailer.createTransport(config)
    let Mailgenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Super Coder Ecommerce',
            link: 'http://coderecomerce.com'
        }
    })

    let content = {
        body: {
            intro: 'Your bill has arrived!',
            table: {
                data: [
                    {
                        item: 'Super bicicleta de ruedas cuadradas',
                        description: 'Diviertete usando esta super bicicleta',
                        price: 'ARS$ 1000.00'
                    }
                ]
            },
            outro: 'Sincerily yours, El profe'
        }
    }
    let mail = Mailgenerator.generate(content)

    let message = {
        from: process.env.NODEMAILER_USER,
        to: req.body.useremail,
        subject: 'Gracias por tu compra',
        html: mail
    }
    transporter.sendMail(message)
        .then(() => res.status(201).json({ status: 'success'}))
        .catch(err => res.status(500).json({ err }))
}