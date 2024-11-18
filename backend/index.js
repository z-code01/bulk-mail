const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
app.use(express.json())
app.use(cors())

const nodemailer = require("nodemailer")
mongoose.connect("mongodb+srv://shafin:shafinshafin01@cluster0.vcgcg.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0").then(
  function () {
    console.log("connected to db")
  }
).catch(function () {
  console.log("connection failed")
})

const credit = mongoose.model("credit", {}, "bulkmailll")





app.post("/Message", function (req, res) {
  var msg = req.body.msg
  var email = req.body.email
  credit.find().then(function (data) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: data[0].toJSON().user,
        pass: data[0].toJSON().pass,
      }
    });
    new Promise(async function (resolve, reject) {
      try {

        for (var i = 0; i < email.length; i++) {
          await transporter.sendMail({
            from: "d51236802@gmail.com",
            to: email[i],
            subject: "A meesage from bulkmail",
            text: msg
          },),
            console.log("email sent to" + email[i])
        }
        resolve("success")
      }
      catch (error) {
        reject("failed")
      }

    }).then(function () {
      res.send(true)
    }).catch(function () {
      res.send(false)
    })
  }).catch(function (error) {
    console.log(error)
  })

}
)





app.listen(5000, function () {
  console.log("server started")
})