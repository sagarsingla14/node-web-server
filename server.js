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

hbs.registerHelper('getDate', () => {
  return new Date();
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
  response.render('home.hbs', {
    title : 'Home Page',
    message : 'Welcome to My website'
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    title : 'about',
    message : 'welcome to about page',
  });
});

app.get('/backend', (request, response) => {
  response.render('backend.hbs',{
    message : 'Welcome to Backend page',
    title : 'Backend Yahooo'
  })
});

app.get('/projects', (request , response) => {
  response.render('projects.hbs', {
    title : 'Projects Page',
    message : 'Projects to be Displayed here'
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






// likes : ['Sport Programming ' , 'BackEnd Development']

//
// app.get('/Sagar' , (request ,response) => {
//     response.render('Sagar.hbs' , {
//         title : 'Sagar Page',
//         message : 'welcome To my page',
// name : 'Sagar',
// age : 20,
//         text : 'I love sport Programming',
//         copyright  : new Date().getFullYear(),
//         text : 'I love sport Programming'
//
//       })
//     });
