const express = require('express');
const app = express();
const ExpressError = require('./ExpressError');

app.use( (req,res,next) => {    
    console.log('Hi, I am middleware');   //This is the middleware chaining here so when ever you execute this and run the server only this line of code will be executed and middleware will not let the other two roots which are below this to execute.
    next();                               //next is used so that if i get any error in this code then the next code will be executed.
});


//This is the exact way of using middlewares
app.use('/api', (req,res, next) => {        //we are creating a middleware here if the query is passed correctly in the search URL then the /api(route) msg will be displayed.
    let {query} = req.query;
    if (query === 'letmein') {
      next();
    }                                                    //401 is the status and ACCESS DENIED BUDDY is the message we passed in the constructor.
    throw new ExpressError(401,'ACCESS DENIED BUDDY!');  //We also have a js builtin method to throw errors called (throw new error) if we want to throw error we can use this.
});

//Activity to throw a error when
app.get('/admin', (req,res) => {
    throw new ExpressError(403, 'Activity throw error');
});

app.get('/api', (req,res) => {
    res.send('DATA IS BEING ACCESSED!');
});

app.get('/', (req,res) => {             //Created a route 
    res.send('This is root')
    console.log(req.method);            //By using middlewares we can also print the type of req present. Also remember that this is a route not a middleware.
});

app.get('/random', (req,res) => {       //Created a route
    res.send('This is a random page');
});

app.use( (req,res) => {                 //We can also use middlwares to handle our error.
    res.send('Heyy buddy check your URL there is some error in it :)') 
});                                                                    


app.use( (err,req,res,next) => {         //err is used to handle error handling or to generate a error explicitly.
    console.log('----------ERROR----------');
    res.send(err);
});

app.listen(8080, () => { 
    console.log('Server is listening to port 8080');
});