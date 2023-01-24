const { Router } = require("express")
var cors = require('cors')
const router = Router()
const mailconfig  = require('../../config/mailer')
const mysqlConnection = require('../../config/mysql')
const _ = require('underscore')

router.post('/Qualification', cors(), async(req, res)=> {
    const {
        Stars,
        Name,
        Message,
        fechaRegistro
    }=req.body
    // console.log(ciudad);v
    const query = `INSERT INTO Calificacion(Stars, Name, Message) VALUE('${Stars}','${Name}','${Message}')`
    const resultadoSql = mysqlConnection.query(query)
    let bodyEmail =`
    <div style="pading-left:50px; pading-right:50px;">
        <table width="600px">
            <tr style="background-color: white;">
                <td style="padding: 10px;" colspan="2">
                    <img src="https://i.postimg.cc/Xvv1MKyD/Logo-Color.png" alt="" height="50px">
                </td>
            </tr>
            <tr style="background-color: #395730;">
                <td style="padding-top: 15px; text-align: center;" colspan="2">
                    <p style="color: white; font-family: Arial;">
                        <b>Calificacion experiencia del cliente</b>
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Calificacion</b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ Stars }
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Nombre: </b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ Name }
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Mensaje: </b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ Message }
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Fecha de registro: </b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ fechaRegistro }
                    </p>
                </td>
            </tr>
        </table>
    </div>
        `
    const response = await mailconfig.sendMail({
        from: '"Calificacion experiencia" <no-reply@gmail.com>',
        // to: "canaimahacienda@gmail.com, albalherrera@yahoo.com.mx",
        to: "desarrollo@agenciamanager.com",
        subject: "Calificacion experiencia",
        html: bodyEmail,
    }).catch(console.error)

    if(response && resultadoSql){
        res.status(200).json({
            mensaje: "Se envio correctamente el mensaje",
            error: false,
        })
    }
    else{
        throw err;
    }
})
 

module.exports = router