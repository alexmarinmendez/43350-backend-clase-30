import nodemailer from 'nodemailer'

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
    
}