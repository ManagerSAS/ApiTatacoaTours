const { Router } = require("express")
var cors = require('cors')
const router = Router()
const mailconfig  = require('../../config/mailer')
const mysqlConnection = require('../../config/mysql')

router.post('/SendForm', cors(), async(req, res)=> {
    const {
        NombreCompleto,
        Correo,
        NCelular,
        Ciudad,
        Departamento,
        Servicio,
        Mensaje,
        fechaRegistro,
    }=req.body
    // console.log(ciudad);v
    const query = `INSERT INTO FormContact(NombreCompleto, Correo, NCelular, Ciudad, Departamento, Servicio,Mensaje,fecha_registro) VALUE('${NombreCompleto}','${Correo}','${NCelular}','${Ciudad}','${Departamento}','${Servicio}','${Mensaje}','${fechaRegistro}')`
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
                    <b>Datos del cliente</b>
                </p>
            </td>
        </tr>
        <tr style="background-color: white;">
            <td style="padding: 5px;">
                <p style="font-family: Arial;">
                    <b>Nombre Empresa / persona</b>
                </p>
            </td>
            <td style="padding: 5px;">
                <p style="font-family: Arial;">
                    ${NombreCompleto} 
                </p>
            </td>
        </tr>
        <tr style="background-color: white;">
            <td style="padding: 5px;">
                <p style="font-family: Arial;">
                    <b>Numero de Identificacion</b>
                </p>
            </td>
        <td style="padding: 5px;">
            <p style="font-family: Arial;">
                ${Correo} 
            </p>
        </td>
        </tr>
        <tr>
        <td style="padding: 5px;">
            <p style="font-family: Arial;">
                <b>Numero de telefono</b>
            </p>
        </td>
        <td style="padding: 5px;">
            <p style="font-family: Arial;">
                ${ NCelular }
            </p>
        </td>
        </tr>
        <tr style="background-color: white;">
        <td style="padding: 5px;">
            <p style="font-family: Arial;">
                <b>Correo Electronico</b>
            </p>
        </td>
        <td style="padding: 5px;">
            <p style="font-family: Arial;">
                ${ Ciudad }
            </p>
        </td>
        </tr>
        <tr>
        <td style="padding: 5px;">
            <p style="font-family: Arial;">
                <b>Ciudad</b>
            </p>
        </td>
        <td style="padding: 5px;">
            <p style="font-family: Arial;">
                ${ Departamento }
            </p>
        </td>
        </tr> 
        <tr>
        <td style="padding: 5px;">
            <p style="font-family: Arial;">
                <b>Direccion</b>
            </p>
        </td>
        <td style="padding: 5px;">
            <p style="font-family: Arial;">
                ${ Servicio }
            </p>
        </td>
        </tr>
        <tr>
        <td style="padding: 5px;">
            <p style="font-family: Arial;">
                <b>Direccion</b>
            </p>
        </td>
        <td style="padding: 5px;">
            <p style="font-family: Arial;">
                ${ Mensaje }
            </p>
        </td>
        </tr>
        </table>
        </div> `
    const response = await mailconfig.sendMail({
        from: '"Datos de contacto" <no-reply@gmail.com>',
        // to: "canaimahacienda@gmail.com, albalherrera@yahoo.com.mx",
        to: "desarrollo@agenciamanager.com",
        subject: "Datos de contacto",
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