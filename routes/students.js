// routes/student.js
const secretKey = process.env.STUDENT_ACCESS_TOKEN_SECRET;

const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const StudentAuth = require('../models/StudentAuth')
const {v4: uuidv4} = require('uuid');
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const {
    hashPasswordCrypto,
    verifyPasswordCrypto,
    hashPasswordArgon,
    verifyPasswordArgon
} = require("../library/hashing");
dotenv.config()


// Generate a JWT token for a given user
function generateToken(student) {
    const payload = {email: student.email, role: 'student'};
    const options = {expiresIn: '300d'};
    return jwt.sign(payload, secretKey, options);
}

async function authenticateStudent(email, password) {
    console.log(email, password)
    //console.log((await StudentAuth.findAll()))
    const studentAuth = await StudentAuth.findOne({where: {email: email}});
    console.log(studentAuth)
    //console.log(studentAuth)

    if (!studentAuth) {
        // The user doesn't exist in the database
        return null;
    }

    const isPasswordValid = await verifyPasswordArgon(studentAuth.keyHash, password);
    console.log("Password Validity: " + isPasswordValid)

    if (!isPasswordValid) {
        // The password is incorrect
        return null;
    }

    console.log("Is Password Valid : " + isPasswordValid)

    // The user exists and the password is correct, so we can return the user object
    // const student = await Student.findByPk(email);
    //console.log(student)
    return {email: email, role: "student"}
}

router.post('/login', async (req, res) => {
    const {email, passKey} = req.body;
    console.log(req.body)

    const student = await authenticateStudent(email, passKey);
    console.log(student)
    console.log("Entered Here")

    if (!student) {
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const token = generateToken(student);
    const studentAuth = await StudentAuth.findByPk(email)
    const studentData = await Student.findOne({where: {email}});

    res.json({token, isVerified: studentAuth.isEmailVerified, student: studentData});
});


// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.findAll();
        res.json(students);
    } catch (error) {
        res.status(500).json({message: 'Error retrieving students'});
    }
});

// Get a single student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({message: 'Student not found'});
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({message: 'Error retrieving student'});
    }
});

// Create a new student
router.post('/', async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({message: 'Error creating student'});
    }
});

// Update a student
router.put('/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({message: 'Student not found'});
        }
        await student.update(req.body);
        res.json(student);
    } catch (error) {
        res.status(500).json({message: 'Error updating student'});
    }
});

// Delete a student
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({message: 'Student not found'});
        }
        await student.destroy();
        res.json({message: 'Student deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error deleting student'});
    }
});

/*
router.post('/account-registration', async (req, res) => {
    const verificationToken = uuidv4()
    console.log(req.body)
    await StudentAuth.create({verificationToken: verificationToken, keyHash: "20840", email: "info@codeden.org"})

    // Create a transporter object
    const transporter = nodemailer.createTransport({
        host: 'smtp.titan.email',
        port: 587,
        secure: false,
        auth: {
            user: 'info@codeden.org',
            pass: 'bob@Cumulus#4717'
        }
    });

    // Define the email options
    const mailOptions = {
        from: 'info@codeden.org',
        to: 'gracealiko08@gmail.com',
        subject: 'Email Verification',
        html: `
      <html>
        <body>
          <h1>Email Verification</h1>
          <p>Thank you for signing up. Please click the link below to verify your email:</p>
          <a href="https://codeden.org/verify/${verificationToken}">Verify Email</a>
        </body>
      </html>
    `
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error occurred:', error.message);
            res.json({msg: 'Error sending email'});
        } else {
            console.log('Email sent successfully!');
            console.log('Message ID:', info.messageId);
            res.json({msg: 'Email sent successfully'});
        }
    });

})
*/

router.post('/account-registration', async (req, res) => {
    const {email, passKey} = req.body;

    // Check if the email already exists in the database
    const existingUser = await StudentAuth.findByPk(email);
    if (existingUser) {
        return res.json({error: 'Email already exists'});
    }

    const verificationToken = uuidv4();
    console.log(req.body);
    const hashedPassword = await hashPasswordArgon(passKey)
    await StudentAuth.create({verificationToken, keyHash: hashedPassword, email, isEmailVerified: false});

    // Create a transporter object
    const transporter = nodemailer.createTransport({
        host: 'smtp.titan.email',
        port: 587,
        secure: false,
        auth: {
            user: 'knustexpresso@codeden.org',
            pass: 'bob@Cumulus#4717'
        }
    });

    // Define the email options
    const mailOptions = {
        from: 'KNUST Xpresso <knustexpresso@codeden.org>',
        to: email,
        subject: 'Email Verification',
        html: `
      <html>
        <head>
          <style>
            .verify-button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #4CAF50;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <h1>Email Verification</h1>
          <p>Thank you for signing up. Please click the button below to verify your email:</p>
          <a class="verify-button" href="https://knustexpresso.codeden.org/verification/${verificationToken}">Verify Email</a>
        </body>
      </html>
    `
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error occurred:', error.message);
            res.json({msg: 'Error sending email'});
        } else {
            console.log('Email sent successfully!');
            console.log('Message ID:', info.messageId);
            res.json({msg: 'Email sent successfully'});
        }
    });
});


// 5. Handling verification route
router.get('/verify/:id', async (req, res) => {
    const {id} = req.params;

    // 6. Find the user with the matching verification token in the database
    const studentAuth = await StudentAuth.findOne({verificationToken: id});

    if (!studentAuth) {
        // Handle invalid or expired verification tokens
        res.status(401).send('Invalid or expired verification token.');
    }

    // 7. Update user account status to indicate email verification
    studentAuth.isEmailVerified = true;
    studentAuth.verificationToken = undefined; // Optional: Clear the verification token after successful verification
    await studentAuth.save();

    res.status(200).json({success: "Account verified Successfully"})
    /*  // 9. Redirect user to a success page
      res.redirect('https://google.com');*/
});


module.exports = router;





