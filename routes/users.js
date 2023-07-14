// Import the required libraries
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config()

// Import the Intern model
const User = require('../models/User');


var crypto = require('crypto');

const secretKey = process.env.INTERN_ACCESS_TOKEN_SECRET;


router.post('/email',(req,res)=>{

    const nodemailer = require('nodemailer');

// Create a transporter object
    const transporter = nodemailer.createTransport({
        host: 'smtp.titan.email',
        port: 587, // Hostinger SMTP port
        secure: false, // Set to true if using a secure connection (e.g., port 465)
        auth: {
            user: 'info@codeden.org', // Your Hostinger email address
            pass: 'bob@Cumulus#4717' // Your Hostinger email password
        }
    });

    // Construct the HTML content for the email
    const emailContent = `
  <html>
    <body>
      <h1>Invitation to ....!</h1>
      <p>Please click the button below to agree to my invitation</p>
      <a href="https://www.example.com/verify-email" target="_blank" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Verify Email</a>
    </body>
  </html>
`;

// Configure the email options
    const mailOptions = {
        from: 'info@codeden.org',
        to: 'robertdoe60@gmail.com',
        subject: 'Verification Email',
        html: emailContent,
    };





// Define the email options
    /*const mailOptions = {
        from: 'info@codeden.org',
        to: 'gracealiko08@gmail.com',
        subject: 'Mailer Alert',
        text: "Dear grace, the mailing portion of the API is working. "
    };
*/
// Send the email
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('Error occurred:', error.message);
            res.json({ msg: 'Error sending email' });
        } else {
            console.log('Email sent successfully!');
            console.log('Message ID:', info.messageId);
            res.json({ msg: 'Email sent successfully' });
        }
    });


    /*// Create a transporter object
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'robertdoe60@gmail.com',
                pass: 'jmkdatnisxhxktpx'
            }
        });

    // Define the email options
        const mailOptions = {
            from: 'robertdoe60@gmail.com',
            to: 'robertdoe60@gmail.com',
            subject: 'Hello from Nodemailer',
            text: 'This is a test email sent using Nodemailer.'
        };

    // Send the email
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log('Error occurred:', error.message);
                res.json({msg: "Error sending email"})
            } else {
                console.log('Email sent successfully!');
                console.log('Message ID:', info.messageId);
                res.json({msg: "Email sent successfully"})
            }
        });*/
})






// Get all interns
router.get('/', async (req, res) => {
    try {
        // Retrieve all interns from the database
        const users = await User.findAll();
        // Return the interns data as JSON
        res.json(users);
    } catch (error) {
        // Return an error message if an error occurs
        res.status(500).json({ message: error.message });
    }
});

// Get a single intern by ID
router.get('/:id', async (req, res) => {
    try {
        // Retrieve the intern with the specified id from the database
        const user = await User.findByPk(req.params.id);

        // Return the intern data as JSON
        res.json(user);
    } catch (error) {
        // Return an error message if an error occurs
        res.status(500).json({ message: error.message });
    }
});


// Create a new intern
router.post('/', async (req, res ) => {
    try {

        // Create a new intern using the request body data
        const user = await User.create(req.body);

        // Return the new intern data as JSON
        res.status(201).json(user);
    } catch (error) {
        // Return an error message if an error occurs
        res.status(500).json({ message: error.message });
    }
});

// Update an existing intern by ID
router.put('/:id', async (req, res) => {
    try {
        // Retrieve the intern with the specified id from the database
        const user = await User.findByPk(req.params.id);

        // Update the intern record with the request body data
        await user.update(req.body);

        // Return the updated intern data as JSON
        res.json(user);
    } catch (error) {
        // Return an error message if an error occurs
        res.status(500).json({ message: error.message });
    }
});

// Delete an existing intern by ID
router.delete('/:id', async (req, res) => {
    try {
        // Retrieve the intern with the specified id from the database
        const user = await User.findByPk(req.params.id);

        // Delete the intern record
        await user.destroy();

        // Return a success message as JSON
        res.json({ message: 'User record deleted successfully.' });
    } catch (error) {
        // Return an error message if an error occurs
        res.status(500).json({ message: error.message });
    }
});



/*

//Validating Activation

router.post('/account-activation', async (req, res) => {
    try {
        /!* console.log(req)*!/
        let {studentId,dob}=req.body;
        // Retrieve the intern with the specified id from the database
        const intern = await Intern.findByPk(studentId);
        console.log(intern.dob)
        console.log(dob)
        if(dob===intern.dob){
            res.status(200).json({"msg":"Activated Successfully"})
        }else{
            res.status(404).json({"msg":"Activation Unsuccessful"});
        }

    } catch (error) {
        // Return an error message if an error occurs
        res.status(500).json({ message: error.message });
    }
});

router.post('/token-verification',(req,res)=> {

    const {token} = req.body;

// Verify the JWT token signature
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error('Invalid token:', err);
            return res.status(404).json({msg: "Verification Failed"})
            // Handle error
        } else {
            // Token is valid
            console.log('Token is valid:', decoded);
            return  res.status(200).json({msg: "Verification Successful"})
            // Handle success
        }

    })

})
//Intern Auth SignUp
router.post('/auth/signup', async (req, res ) => {
    try {

        const {studentId,email,passKey}=req.body

        const keyHash=await hashPassword(passKey)
        // Create a new intern using the request body data
        const internAuth = await InternAuth.create({keyHash,email,studentId});

        const intern =await Intern.findByPk(studentId);
        const token = generateToken({studentId,email});

        res.status(201).json({msg:"Account Created Successfully", token, intern });


    } catch (error) {
        // Return an error message if an error occurs
        res.status(500).json({ message: error.message });
    }
});
const md5=(dataValue)=>{
    let hash = crypto.createHash('md5');
    let data = hash.update(dataValue, 'utf-8');
    let gen_hash= data.digest('hex');
    return gen_hash
}
async function hashPassword(password) {
    const saltRounds = 10;

    try {
        const hash = (await bcrypt.hash(password, saltRounds)).toString();
        console.log(hash)
        return hash;
    } catch (error) {
        console.error(error);
        return null;
    }
}
// Generate a JWT token for a given user
function generateToken(intern) {
    const payload = { id: intern.studentId, email: intern.email };
    const options = { expiresIn: '300d' };
    return jwt.sign(payload, secretKey, options);
}
async function authenticateIntern(studentId, password) {
    const internAuth = await InternAuth.findByPk(studentId);

    console.log(internAuth)

    if (!internAuth) {
        // The user doesn't exist in the database
        return null;
    }

    const isPasswordValid = bcrypt.compareSync(password, internAuth.keyHash);

    if (!isPasswordValid) {
        // The password is incorrect
        return null;
    }

    console.log("Is Password Valid : "+ isPasswordValid )

    // The user exists and the password is correct, so we can return the user object
    const intern =await Intern.findByPk(studentId);
    console.log(intern)
    return intern
}
// Middleware function for authenticating requests based on a bearer token
function authenticateRequest(req, res, next) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        // The request doesn't have a valid Authorization header
        return res.status(401).json({ message: 'Invalid or missing Authorization header' });
    }

    const token = authorizationHeader.substring('Bearer '.length);

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            // The token is invalid or has expired
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        // The token is valid, so we can attach the user object to the request object
        const intern = Intern.findByPk(decoded.studentId)

        if (!intern) {
            // The user associated with the token doesn't exist in the database
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        req.intern = intern;
        next();
    });
}
router.post('/verify-activation',(req,res)=>{
    const {studentId} = req.body
    const internAuth= InternAuth.findByPk(studentId)
    if(internAuth){
        res.json({isActivated:true})
    }else{
        res.json({isActivated:false})
    }
})

router.post('/login', async (req, res) => {
    const {studentId, passKey} = req.body;

    const intern = await authenticateIntern(studentId, passKey);

    if (!intern) {
        return res.status(401).json({message: 'Invalid email or password'});
    }
    const token = generateToken(intern);
    res.json({token, intern});
});

*/

// Export the router for use in other modules
module.exports = router;