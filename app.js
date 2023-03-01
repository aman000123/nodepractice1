const express = require('express');
const app = express();
const middleWareWrapper = require('./middleware/logger-middleware');
const myLogger = require('./middleware/myLogger');
const authMiddleware = require('./middleware/authMiddleware');


const PORT =  3001
app.listen(3001,()=>console.log(`server is running on port no :${PORT}`));


const employeeRoutes = require('./routes/employee')
const productRoutes = require('./routes/product');
const authRouters = require('./routes/auth');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));



//localhost:3000/employees/employees
app.use('/auth', authRouters)
app.use('/employees', authMiddleware, employeeRoutes)
app.use('/products', authMiddleware, productRoutes)

const errorHandler = (error, req, resp, next)=> {
    console.log("Error occured ", error.message);
    resp.status(error.statuCode).send({statusCode: error.statuCode,  error: error.message});
}

app.use(errorHandler)


module.exports = app;