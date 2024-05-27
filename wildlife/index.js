const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aritrya.7.senapati@gmail.com",
    pass: "cqrlcondjmqgodgd",
  },
});

sgMail.setApiKey(
  ""
);

const accountSid = "";
const authToken = "";
const client = require("twilio")(accountSid, authToken);

const app = express();
app.use(express.json());
app.use(cors());

const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

//Step1 : creating the connection with MYSQL DB
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "wildlife",
});

con.connect();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // The destination folder where files will be stored
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Appending the timestamp to the file name to make it unique
  },
});
const upload = multer({ storage: storage });

// Step2 creation of the SQL query by extracting the data from the json in the req body

app.get("/", (req, res) => {
  res.send("Welcome to Human Wildlife Conflict Avoidance System");
});

//--------------------------------Send email------------------------------------------
// app.post('/api/sendemail', (req, res)=>{
//     if (req.get('apikey') !== 'aritryawildlife20230807') {
//         return res.status(404).send('Unauthorised');
//     }
//     var ret_val = {};
//     var toemail = req.body.email;
//     var subject = req.body.subject;
//     var text = req.body.text;

//     const msg = {
//         to: toemail,
//         from: 'aritryasenapati.0807@gmail.com',
//         subject: subject,
//         html: text,
//       }
//       sgMail
//         .send(msg)
//         .then(() => {
//           console.log('Email sent');
//           ret_val.code="1";
//           ret_val.message="Success. Email sent.";
//           return res.status(200).send(ret_val);
//         })
//         .catch((error) => {
//           console.error(error);
//           ret_val.code = "0";
//           ret_val.message = "ERROR. Email not sent." + error;
//           return res.status(500).send(ret_val);
//         })

// });
//--------------------------------Send email nodemailer------------------------------------------
app.post("/api/sendemail", (req, res) => {
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  var ret_val = {};
  var toemail = req.body.email;
  var subject = req.body.subject;
  var text = req.body.text;

  var mailOptions = {
    from: "aritrya.7.senapati@gmail.com",
    to: toemail,
    subject: subject,
    html: text,
  };
  try {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        ret_val.code = "0";
        ret_val.message = "Error email not send: " + error;
        return res.status(500).send(ret_val);
      } else {
        console.log("email sent: " + info.response);
        ret_val.code = "1";
        ret_val.message = "Success email send: " + info.response;
        return res.status(200).send(ret_val);
      }
    });
  } catch (error) {
    console.error(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. Email not sent.";
    return res.status(500).send(ret_val);
  }
});

//--------------------------------Send sms--------------------------------------------

app.post("/api/sendsms", (req, res) => {
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  var ret_val = {};
  var msg = req.body.msg;
  var phno = req.body.phno;

  try {
    client.messages
      .create({
        body: msg,
        from: "+12018627568",
        to: phno,
      })
      .then((message) => console.log(message.sid));
    // .done();
    ret_val.code = "1";
    ret_val.message = "Success. Message sent.";
    return res.status(200).send(ret_val);
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. Message not sent.";
    return res.status(500).send(ret_val);
  }
});

//--------------------------------upload image--------------------------------------------
app.post("/api/uploadimage", upload.single("picture"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const fileDetails = {
    filename: req.file.filename,
    originalname: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
  };

  return res.json(fileDetails);
});

/*---------------------------------Admin Section---------------------------------------------- */
//create admin
app.post("/api/createadmin", (req, res) => {
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  var ret_val = {};
  try {
    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;

    var sql = `INSERT INTO admin(email, password, role) VALUES ('${email}', '${password}', '${role}')`;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });

    ret_val.code = "1";
    ret_val.message = "Success. Admin created";
    return res.status(200).send(ret_val);
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. Admin not inserted";
    return res.status(500).send(ret_val);
  }
});

//admin login
app.post("/api/adminlogin", (req, res) => {
  var ret_val = {};
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var email = req.body.email;
    var password = req.body.password;

    var sql = `Select * from admin where email='${email}' and password='${password}'`;
    con.query(sql, function (err, result, fields) {
      var l = result.length;

      var ret_val = {};
      if (err) throw err;
      if (l == 1) {
        var i = 0;
        ret_val.code = "1";
        ret_val.message = "login successful";

        ret_val.id = result[i].id;
        ret_val.email = result[i].email;
        ret_val.role = result[i].role;

        console.log(ret_val);

        return res.status(200).send(ret_val);
      } else {
        ret_val.code = "0";
        ret_val.message = "ERROR. Invalid Login";
        ret_val.email = email;
        ret_val.password = password;
        console.log(ret_val);
        return res.status(200).send(ret_val);
      }
    });
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. Login Procedure Failed";
    return res.status(500).send(ret_val);
  }
});

/*---------------------------------flat owners---------------------------------------------- */
app.get("/api/getflatowners", (req, res) => {
  var ret_val = {};

  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }

  try {
    var sql = `Select id, owner_name, phone from flat_owner`;

    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log("Records fetched");
      return res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. No records fetched";
    return res.status(500).send(ret_val);
  }
});

//display all the flat owner from database
app.get("/api/getflatownersv2", (req, res) => {
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var idno;
    var flat_number;
    var owner_name;
    var phone;
    var email;
    var no_of_members;
    var tower_id;

    var sql = `Select * from flat_owner`;

    con.query(sql, function (err, result, fields) {
      var aryresults = [];
      var ret_val = {};
      if (err) throw err;
      console.log("Records fetched");
      console.log(result.length);
      var l = result.length;
      var i = 0;
      while (i < l) {
        ret_val.idno = result[i].id;
        ret_val.flat_number = result[i].flat_no;
        ret_val.owner_name = result[i].owner_name;
        ret_val.phone = result[i].phone;
        ret_val.email = result[i].email;
        ret_val.no_of_members = result[i].no_of_members;
        ret_val.tower_id = result[i].tower_id;

        console.log(ret_val);
        aryresults[i] = ret_val;
        ret_val = {};

        i = i + 1;
      }
      return res.status(200).send(aryresults);
    });
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. No records fetched";
    return res.status(500).send(ret_val);
  }
});

//display 1 the flat owner from database
app.get("/api/getoneflatowner", (req, res) => {
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var id = req.query.id;

    var sql = `Select * from flat_owner where id='${id}'`;
    con.query(sql, function (err, result, fields) {
      var ret_val = {};
      if (err) throw err;
      console.log("Records fetched");

      var i = 0;

      ret_val.idno = result[i].id;
      ret_val.flat_number = result[i].flat_no;
      ret_val.owner_name = result[i].owner_name;
      ret_val.phone = result[i].phone;
      ret_val.email = result[i].email;
      ret_val.no_of_members = result[i].no_of_members;
      ret_val.tower_id = result[i].tower_id;

      console.log(ret_val);

      return res.status(200).send(ret_val);
    });
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. No record fetched";
    return res.status(500).send(ret_val);
  }
});

//delete flatowners
app.delete("/api/deleteflatowner", (req, res) => {
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  var ret_val = {};
  try {
    var id = req.query.id;

    var sql = `delete from flat_owner where id='${id}'`;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
      ret_val.code = "1";
      ret_val.message = "Success. Flat-owner Deleted";
      return res.status(200).send(ret_val);
    });
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. No records Deleted";
    return res.status(500).send(ret_val);
  }
});

//update flat-owner
app.patch("/api/updateflatowner", (req, res) => {
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  var ret_val = {};
  try {
    var id = req.body.id;
    var flat_no = req.body.flat_no;
    var owner_name = req.body.owner_name;
    var phone = req.body.phone;
    var email = req.body.email;
    var no_of_members = req.body.no_of_members;
    var tower_id = req.body.tower_id;

    var sql = `update flat_owner set flat_no='${flat_no}', owner_name='${owner_name}', phone='${phone}', email='${email}', no_of_members='${no_of_members}', tower_id='${tower_id}' where id='${id}' `;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records updated " + result.affectedRows);
    });

    ret_val.code = "1";
    ret_val.message = "Success. Flat owner Updated";
    return res.status(200).send(ret_val);
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. Flat owner not Updated";
    return res.status(500).send(ret_val);
  }
});

//Create Flat Owners
app.post("/api/createflatowners", (req, res) => {
  var ret_val = {};
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var flat_no = req.body.flat_no;
    var owner_name = req.body.owner_name;
    var phone = req.body.phone;
    var email = req.body.email;
    var no_of_members = req.body.no_of_members;
    var tower_id = req.body.tower_id;

    var sql = `INSERT INTO flat_owner(flat_no, owner_name, phone, email, no_of_members, tower_id) VALUES ('${flat_no}', '${owner_name}', '${phone}', '${email}', '${no_of_members}', '${tower_id}')`;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });

    ret_val.code = "1";
    ret_val.message = "Success. Flat owner created";
    return res.status(200).send(ret_val);
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. Flat owner not inserted";
    return res.status(500).send(ret_val);
  }
});
/*---------------------------------security guards---------------------------------------------- */
//security-guard login
app.post("/api/securityguardlogin", (req, res) => {
  var ret_val = {};
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var email = req.body.email;
    var password = req.body.password;

    var sql = `Select * from security_guard where email='${email}' and password='${password}'`;
    con.query(sql, function (err, result, fields) {
      var l = result.length;

      var ret_val = {};
      if (err) throw err;
      if (l == 1) {
        var i = 0;
        ret_val.code = "1";
        ret_val.message = "login successful";

        ret_val.idno = result[i].id;
        ret_val.name = result[i].name;
        ret_val.email = result[i].email;

        console.log(ret_val);

        return res.status(200).send(ret_val);
      } else {
        ret_val.code = "0";
        ret_val.message = "ERROR. Invalid Login";
        ret_val.email = email;
        ret_val.password = password;
        console.log(ret_val);
        return res.status(200).send(ret_val);
      }
    });
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. Login Procedure Failed";
    return res.status(500).send(ret_val);
  }
});

//display security guard
app.get("/api/getsecurityguard", (req, res) => {
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var sql = `Select * from security_guard`;
    con.query(sql, function (err, result, fields) {
      var aryresults = [];
      var ret_val = {};
      if (err) throw err;
      console.log("Records fetched");
      console.log(result.length);
      var l = result.length;
      var i = 0;
      while (i < l) {
        ret_val.idno = result[i].id;
        ret_val.name = result[i].name;
        ret_val.town = result[i].town;
        ret_val.po = result[i].PO;
        ret_val.dist = result[i].Dist;
        ret_val.state = result[i].State;
        ret_val.pin = result[i].PIN;
        ret_val.email = result[i].email;
        ret_val.password = result[i].password;
        ret_val.phone = result[i].phone;
        ret_val.aadhar = result[i].aadhar_no;
        ret_val.picture = result[i].picture;

        console.log(ret_val);
        aryresults[i] = ret_val;
        ret_val = {};

        i = i + 1;
      }
      return res.status(200).send(aryresults);
    });
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. No records fetched";
    return res.status(500).send(ret_val);
  }
});

//display 1 security guard from database
app.get("/api/getonesecurityguard", (req, res) => {
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var id = req.query.id;

    var sql = `select * from security_guard where id='${id}'`;
    con.query(sql, function (err, result, fields) {
      var ret_val = {};
      if (err) throw err;
      console.log("Records fetched");

      var i = 0;

      ret_val.idno = result[i].id;
      ret_val.name = result[i].name;
      ret_val.town = result[i].town;
      ret_val.po = result[i].PO;
      ret_val.dist = result[i].Dist;
      ret_val.state = result[i].State;
      ret_val.pin = result[i].PIN;
      ret_val.email = result[i].email;
      ret_val.password = result[i].password;
      ret_val.phone = result[i].phone;
      ret_val.aadhar = result[i].aadhar_no;

      console.log(ret_val);

      return res.status(200).send(ret_val);
    });
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. No record fetched";
    return res.status(500).send(ret_val);
  }
});

//delete security guard
app.delete("/api/deletesecurityguard", (req, res) => {
  var ret_val = {};
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var id = req.query.id;

    var sql = `delete from security_guard where id='${id}'`;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
      ret_val.code = "1";
      ret_val.message = "Success. Security-Guard Deleted";
      return res.status(200).send(ret_val);
    });
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. No records Deleted";
    return res.status(500).send(ret_val);
  }
});

//update security-guard
app.patch("/api/updatesecurityguard", (req, res) => {
  var ret_val = {};
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var id = req.body.id;
    var name = req.body.name;
    var town = req.body.town;
    var PO = req.body.PO;
    var Dist = req.body.Dist;
    var State = req.body.State;
    var PIN = req.body.PIN;
    var email = req.body.email;
    var password = req.body.password;
    var phone = req.body.phone;
    var aadhar_no = req.body.aadhar_no;

    var sql = `update security_guard set name='${name}', town='${town}', PO='${PO}', Dist='${Dist}', State='${State}', PIN='${PIN}', email='${email}', password='${password}', phone='${phone}', aadhar_no='${aadhar_no}' where id='${id}' `;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records updated " + result.affectedRows);
    });

    ret_val.code = "1";
    ret_val.message = "Success. Security-guard Updated";
    return res.status(200).send(ret_val);
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. Security-guard not Updated";
    return res.status(500).send(ret_val);
  }
});

//Create Security Guard
app.post("/api/createsecurityguard", (req, res) => {
  var ret_val = {};
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var name = req.body.name;
    var town = req.body.town;
    var PO = req.body.PO;
    var Dist = req.body.Dist;
    var State = req.body.State;
    var PIN = req.body.PIN;
    var email = req.body.email;
    var password = req.body.password;
    var phone = req.body.phone;
    var aadhar_no = req.body.aadhar_no;
    var picture = req.body.picture;

    var sql = `INSERT INTO security_guard(name, town, PO, Dist, State, PIN, email, password, phone, aadhar_no, picture) VALUES ('${name}', '${town}', '${PO}', '${Dist}', '${State}', '${PIN}', '${email}', '${password}', '${phone}', '${aadhar_no}', '${picture}')`;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });

    ret_val.code = "1";
    ret_val.message = "Success. Security Guard created";
    return res.status(200).send(ret_val);
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. Security Guard not inserted";
    return res.status(500).send(ret_val);
  }
});
/*---------------------------------towers---------------------------------------------- */
//display tower
app.get("/api/gettower", (req, res) => {
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var sql = `Select * from tower`;
    con.query(sql, function (err, result, fields) {
      var aryresults = [];
      var ret_val = {};
      if (err) throw err;
      console.log("Records fetched");
      console.log(result.length);
      var l = result.length;
      var i = 0;
      while (i < l) {
        ret_val.tower_id = result[i].id;
        ret_val.name = result[i].tower_name;
        ret_val.tower_description = result[i].description;
        ret_val.no_of_flats = result[i].no_of_flats;

        console.log(ret_val);
        aryresults[i] = ret_val;
        ret_val = {};

        i = i + 1;
      }
      return res.status(200).send(aryresults);
    });
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. No records fetched";
    return res.status(500).send(ret_val);
  }
});

//display 1 tower from database
app.get("/api/getonetower", (req, res) => {
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var id = req.query.id;

    var sql = `select * from tower where id='${id}'`;
    con.query(sql, function (err, result, fields) {
      var ret_val = {};
      if (err) throw err;
      console.log("Records fetched");

      var i = 0;

      ret_val.tower_id = result[i].id;
      ret_val.name = result[i].tower_name;
      ret_val.tower_description = result[i].description;
      ret_val.no_of_flats = result[i].no_of_flats;

      console.log(ret_val);

      return res.status(200).send(ret_val);
    });
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. No record fetched";
    return res.status(500).send(ret_val);
  }
});

//delete Tower
app.delete("/api/deletetower", (req, res) => {
  var ret_val = {};
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var id = req.query.id;

    var sql = `delete from tower where id='${id}'`;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
      ret_val.code = "1";
      ret_val.message = "Success. Tower Deleted";
      return res.status(200).send(ret_val);
    });
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. No records Deleted";
    return res.status(500).send(ret_val);
  }
});

//update towers
app.patch("/api/updatetowers", (req, res) => {
  var ret_val = {};
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var tower_id = req.body.id;
    var name = req.body.tower_name;
    var tower_description = req.body.description;
    var no_of_flats = req.body.no_of_flats;

    var sql = `update tower set tower_name='${name}', description='${tower_description}', no_of_flats='${no_of_flats}' where id='${tower_id}'`;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records updated " + result.affectedRows);
    });

    ret_val.code = "1";
    ret_val.message = "Success. Tower Updated";
    return res.status(200).send(ret_val);
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. Tower not Updated";
    return res.status(500).send(ret_val);
  }
});

//Create Tower
app.post("/api/createtower", (req, res) => {
  var ret_val = {};
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var tower_name = req.body.tower_name;
    var description = req.body.description;
    var no_of_flats = req.body.no_of_flats;

    var sql = `INSERT INTO tower(tower_name, description, no_of_flats) VALUES ('${tower_name}', '${description}', '${no_of_flats}')`;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted...");
    });

    ret_val.code = "1";
    ret_val.message = "Successfully data inserted...";
    return res.status(200).send(ret_val);
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "Error while insering data...";
    return res.status(500).send(ret_val);
  }
});
/*---------------------------------alerts---------------------------------------------- */
//display alert
app.get("/api/getalerts", (req, res) => {
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var sql = `Select * from alerts`;
    con.query(sql, function (err, result, fields) {
      var aryresults = [];
      var ret_val = {};
      if (err) throw err;
      console.log("Records fetched");
      console.log(result.length);
      var l = result.length;
      var i = 0;
      while (i < l) {
        ret_val.idno = result[i].id;
        ret_val.title = result[i].title;
        ret_val.description = result[i].description;
        ret_val.alert_type = result[i].alert_type;
        ret_val.security_id = result[i].security_guard_id;
        ret_val.flat_owner_id = result[i].flat_owner_id;
        ret_val.incident_id = result[i].incident_id;
        ret_val.date = result[i].alert_date;
        ret_val.time = result[i].alert_time;

        console.log(ret_val);
        aryresults[i] = ret_val;
        ret_val = {};

        i = i + 1;
      }
      return res.status(200).send(aryresults);
    });
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. No records fetched";
    return res.status(500).send(ret_val);
  }
});

//display 1 alert from database
app.get("/api/getonealerts", (req, res) => {
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var id = req.query.id;

    var sql = `select * from alerts where id='${id}'`;
    con.query(sql, function (err, result, fields) {
      var ret_val = {};
      if (err) throw err;
      console.log("Records fetched");

      var i = 0;

      ret_val.id = result[i].id;
      ret_val.title = result[i].title;
      ret_val.description = result[i].description;
      ret_val.alert_type = result[i].alert_type;
      ret_val.security_guard_id = result[i].security_guard_id;
      ret_val.flat_owner_id = result[i].flat_owner_id;
      ret_val.incident_id = result[i].incident_id;
      ret_val.alert_date = result[i].alert_date;
      ret_val.alert_time = result[i].alert_time;

      console.log(ret_val);

      return res.status(200).send(ret_val);
    });
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. No record fetched";
    return res.status(500).send(ret_val);
  }
});

//delete alerts
app.delete("/api/deletealert", (req, res) => {
  var ret_val = {};
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var id = req.query.id;

    var sql = `delete from alerts where id='${id}'`;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
      ret_val.code = "1";
      ret_val.message = "Success. Alert Deleted";
      return res.status(200).send(ret_val);
    });
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. No records Deleted";
    return res.status(500).send(ret_val);
  }
});

//update alerts
app.patch("/api/updatealert", (req, res) => {
  var ret_val = {};
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var idno = req.body.id;
    var title = req.body.title;
    var description = req.body.description;
    var alert_type = req.body.alert_type;
    var security_guard_id = req.body.security_id;
    var flat_owner_id = req.body.flat_owner_id;
    var incident_id = req.body.incident_id;
    var alert_date = req.body.date;
    var alert_time = req.body.time;

    var sql = `update alerts set title='${title}', description='${description}', alert_type='${alert_type}', security_guard_id='${security_guard_id}', flat_owner_id='${flat_owner_id}', incident_id='${incident_id}', alert_date='${alert_date}', alert_time='${alert_time}' where id='${idno}' `;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records updated " + result.affectedRows);
    });

    ret_val.code = "1";
    ret_val.message = "Success. Alert Updated";
    return res.status(200).send(ret_val);
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. Alert not Updated";
    return res.status(500).send(ret_val);
  }
});

//create alert
app.post("/api/createalert", (req, res) => {
  var ret_val = {};
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var title = req.body.title;
    var description = req.body.description;
    var alert_type = req.body.alert_type;
    var security_guard_id = req.body.security_guard_id;
    var flat_owner_id = req.body.flat_owner_id;
    var incident_id = req.body.incident_id;
    var alert_date = req.body.alert_date;
    var alert_time = req.body.alert_time;

    var sql = `INSERT INTO alerts (title, description, alert_type, security_guard_id, flat_owner_id, incident_id, alert_date, alert_time) VALUES ('${title}', '${description}', '${alert_type}', '${security_guard_id}', '${flat_owner_id}', '${incident_id}', '${alert_date}', '${alert_time}')`;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted...");
    });

    ret_val.code = "1";
    ret_val.message = "Data inserted successfully...";
    return res.status(200).send(ret_val);
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "Error while inserting data...";
    return res.status(500).send(ret_val);
  }
});
/*---------------------------------incidents---------------------------------------------- */
//display incidents
app.get("/api/getincidents", (req, res) => {
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var sql = `Select * from incidents`;
    con.query(sql, function (err, result, fields) {
      var aryresults = [];
      var ret_val = {};
      if (err) throw err;
      console.log("Records fetched");
      console.log(result.length);
      var l = result.length;
      var i = 0;
      while (i < l) {
        ret_val.idno = result[i].id;
        ret_val.name = result[i].title;
        ret_val.description = result[i].description;
        ret_val.date = result[i].date;
        ret_val.time = result[i].time;
        ret_val.sevierity = result[i].sevierity_level;
        ret_val.source = result[i].source_of_info;
        ret_val.type = result[i].type;

        console.log(ret_val);
        aryresults[i] = ret_val;
        ret_val = {};

        i = i + 1;
      }
      return res.status(200).send(aryresults);
    });
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. No records fetched";
    return res.status(500).send(ret_val);
  }
});

//display 1 incident from database
app.get("/api/getoneincidents", (req, res) => {
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var id = req.query.id;

    var sql = `select * from incidents where id='${id}'`;
    con.query(sql, function (err, result, fields) {
      var ret_val = {};
      if (err) throw err;
      console.log("Records fetched");

      var i = 0;

      ret_val.idno = result[i].id;
      ret_val.title = result[i].title;
      ret_val.description = result[i].description;
      ret_val.date = result[i].date;
      ret_val.time = result[i].time;
      ret_val.sevierity = result[i].sevierity_level;
      ret_val.source = result[i].source_of_info;
      ret_val.type = result[i].type;

      console.log(ret_val);

      return res.status(200).send(ret_val);
    });
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. No record fetched";
    return res.status(500).send(ret_val);
  }
});

//delete incidents
app.delete("/api/deleteincidents", (req, res) => {
  var ret_val = {};
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var id = req.query.id;

    var sql = `delete from incidents where id='${id}'`;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
      ret_val.code = "1";
      ret_val.message = "Success. Incident Deleted";
      return res.status(200).send(ret_val);
    });
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. No records Deleted";
    return res.status(500).send(ret_val);
  }
});

//update incidents
app.patch("/api/updateincidents", (req, res) => {
  var ret_val = {};
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var idno = req.body.id;
    var name = req.body.title;
    var description = req.body.description;
    var date = req.body.date;
    var time = req.body.time;
    var sevierity = req.body.sevierity_level;
    var source = req.body.source_of_info;
    var type = req.body.type;

    var sql = `update incidents set title='${name}', description='${description}', date='${date}', time='${time}', sevierity_level='${sevierity}', source_of_info='${source}', type='${type}' where id='${idno}' `;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records updated " + result.affectedRows);
    });

    ret_val.code = "1";
    ret_val.message = "Success. Incident Updated";
    return res.status(200).send(ret_val);
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. Incident not Updated";
    return res.status(500).send(ret_val);
  }
});

//create incident
app.post("/api/createincidents", (req, res) => {
  var ret_val = {};
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var title = req.body.title;
    var description = req.body.description;
    var date = req.body.date;
    var time = req.body.time;
    var sevierity_level = req.body.sevierity_level;
    var source_of_info = req.body.source_of_info;
    var type = req.body.type;

    var sql = `INSERT INTO incidents (title, description, date, time, sevierity_level, source_of_info, type) VALUES ('${title}', '${description}', '${date}', '${time}', '${sevierity_level}', '${source_of_info}', '${type}')`;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted...");
    });

    ret_val.code = "1";
    ret_val.message = "Data inserted successfully...";
    return res.status(200).send(ret_val);
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "Error while inserting data...";
    return res.status(500).send(ret_val);
  }
});

// monthly report
app.get("/api/monthlyreport", (req, res) => {
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var month = req.query.month;
    var year = req.query.year;

    var sql = `select * from incidents where year(date) = ${year} and month(date) = ${month}`;
    con.query(sql, function (err, result, fields) {
      var aryresults = [];
      var ret_val = {};
      if (err) throw err;
      console.log("Records fetched");
      console.log(result.length);

      var l = result.length;
      var i = 0;

      while (i < l) {
        ret_val.id = result[i].id;
        ret_val.title = result[i].title;
        ret_val.description = result[i].description;
        ret_val.date = result[i].date;
        ret_val.time = result[i].time;
        ret_val.sevierity = result[i].sevierity_level;
        ret_val.source = result[i].source_of_info;
        ret_val.type = result[i].type;

        console.log(ret_val);

        aryresults[i] = ret_val;
        ret_val = {};
        i = i + 1;
      }

      return res.status(200).send(aryresults);
    });
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. No record fetched";
    return res.status(500).send(ret_val);
  }
});

// detailed incident report
app.get("/api/detailedreport", (req, res) => {
  if (req.get("apikey") !== "aritryawildlife20230807") {
    return res.status(404).send("Unauthorised");
  }
  try {
    var id = req.query.id;

    var sql = `select * from alerts where incident_id='${id}'`;
    con.query(sql, function (err, result, fields) {
      var ret_val = {};
      if (err) throw err;
      console.log("Records fetched");

      var i = 0;

      ret_val.id = result[i].id;
      ret_val.title = result[i].title;
      ret_val.description = result[i].description;
      ret_val.alert_type = result[i].alert_type;
      ret_val.security_guard_id = result[i].security_guard_id;
      ret_val.flat_owner_id = result[i].flat_owner_id;
      ret_val.incident_id = result[i].incident_id;
      ret_val.alert_date = result[i].alert_date;
      ret_val.alert_time = result[i].alert_time;

      console.log(ret_val);

      return res.status(200).send(ret_val);
    });
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. No record fetched";
    return res.status(500).send(ret_val);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}..`));
