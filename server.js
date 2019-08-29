const express = require('express');
const hbs = require('hbs');
const fs =  require('fs');


const port = process.env.PORT || 3000;
var app = express();

app.set('view engine' , 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getYear', () => {
  return new Date().getFullYear();
})

hbs.registerHelper('toUpper' , (text) => {
  return text.toUpperCase();
})

app.use((request , response , next) => {
  // response.render('maintenance.hbs');
  next();
});
// app.use(express.static(__dirname + '/public'));

app.use((request , response , next) => {
  var data = request.url;
  var method = request.method;
  var date = new Date();


  console.log(date);
  try {
    fs.appendFile('store.txt' , data + ' ' + method+ ' ' + date + '\n', (err) =>{
      if(err){
        console.log('unable to perform task');
      }
    });
  } catch (e) {

  }
  next();
});

app.get('/' , (request, response) => {
  response.send({
    title : 'Home Page',
    name : 'Sagar',
    age : 20,
    likes : ['Sport Programming ' , 'BackEnd Development']
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    title : 'about',
    welcomeMessage : 'welcome to about page',
  });
});

app.get('/backend', (request, response) => {
  response.render('backend.hbs',{
    welcomeMessage : 'Welcome to Backend page',
    title : 'Backend Yahooo',
    message : 'BackEnd Created successfully'
  })
});

app.listen(port, () => {
  console.log(`port used ${port}`);
});



// app.get('/help', (request, response) => {
//   response.send({
//     welcomeMessage : 'Welcome to Help page',
//     title : 'Help',
//     message : 'Help Done successfully'
//   })
// });







//
// app.get('/Sagar' , (request ,response) => {
//     response.render('Sagar.hbs' , {
//         title : 'Sagar Page',
//         message : 'welcome To my page',
//         text : 'I love sport Programming',
//         copyright  : new Date().getFullYear(),
//         text : 'I love sport Programming'
//
//       })
//     });
