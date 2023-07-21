//const {Sequelize} = require('sequelize');
const express = require('express')
const db=require('./config/db')
const app = express()
const path = require('path');
const PORT=process.env.PORT || 65124;
const userRouter=require('./routes/users')
const lecturerRouter=require('./routes/lecturers')
const studentRouter=require('./routes/students')
const tellerRouter=require('./routes/teller')
const departmentRouter=require('./routes/departments')
const proficiencyRequestRouter=require('./routes/proficiencyRequests')
const internshipRequestRouter=require('./routes/internshipRequest')
const referenceRequestRouter=require('./routes/referenceRequest')
const proficiencyRouter=require('./routes/proficiency')


/*const internshipRequestRouter=require('./routes/internshipRequest')
const departmentAdminRouter=require('./routes/departmentAdministrators')
const proficiencyAdminRouter=require('./routes/proficiencyOfficeAdministrators')
const remittanceRouter=require('./routes/remittance')
const requestRouter=require('./routes/request')*/









// ADD THIS
var cors = require('cors');
app.use(cors());
app.use(express.json())

// Serve static files from the "upload" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/users',userRouter);
app.use('/api/lecturers',lecturerRouter);
app.use('/api/students',studentRouter);
app.use('/api/teller',tellerRouter);
app.use('/api/departments',departmentRouter);
app.use('/api/proficiency',proficiencyRouter)
app.use('/api/reference-requests',referenceRequestRouter);
app.use('/api/proficiency-requests',proficiencyRequestRouter);
app.use('/api/internship-requests',internshipRequestRouter)



/*app.get('/',(req,res)=>{
    res.send("Over Here Nothing dey /")
})*/



// Handle all other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


async function tryConnection() {

    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

tryConnection().then(r =>{
    db.sync()
        .then(() => {
            console.log('Tables created successfully');
        })
        .catch((err) => {
            console.error('Error creating tables: ', err);
        });

    app.listen(PORT,()=>console.log(`Listening to PORT :${PORT}`))
});