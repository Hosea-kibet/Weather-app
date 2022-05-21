const path = require("path");
const express = require("express");
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs');
;

const app = express();


//Define path to express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialPath = path.join(__dirname,'../templates/partials')



//setup handlebars engine and views location
app.set('view engine', 'hbs') 
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//setup below public directory to serve
app.use(express.static(publicDirectoryPath));

// app.get("", (req, res) => {
//   res.send("<h1>Hello Express</h1>");
// });
// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Hosea",
//       age: 24,
//     },
//     {
//       name: "Kiptum",
//       age: 24,
//     },
//   ]);
// });
// app.get("/about", (req, res) => {
//   res.send("<h1>About</h1>");
// });

app.get('',(req,res)=>{
  res.render('index',{
    title:'weather',
    name:'Hosea'
  })
})

app.get('/about', (req,res)=>{
  res.render('about',{
    title:'About me',
    name:'Hosea'
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    title:'About Me',
    helpText:'This is some helpful text',
    name:'Hosea'
  })
})


app.get('/products',(req,res)=>{

  if(!req.query.search){
     return res.send({
      error:'Please provide a search term'
    })
  }

  console.log(req.query.search)
  res.send({
    product:[]
  })
})

app.get("/weather", (req, res) => {

  if(!req.query.address){
    return res.send({
      error:'address not provided '
    })
  }

  
  // geocode(req.query.address,(error,{latitude,longitude,location }={})=>{
  //   if(error){
  //     return res.send({error:error})
  //   }

  //   forecast(latitude,longitude,(error,forecastData)=>{
  //     if(error){
  //      return  res.send({error:error})
  //     }
      
  //     res.send({
  //       location:location,
  //       forecast:forecastData,
  //       address:req.query.address
  //     })
     
  //   })
  // })
  geocode(req.query.address,(error,data)=>{
    if(error){
     return  res.send({error:error})
    }

    forecast(data.latitude,data.longitude,(error,forecastData)=>{
      if(error){
       return res.send({error:error})
      }
      
      return res.send({
        location:data.location,
        forecast:forecastData,
        address:req.query.address
      })
     
    })
  })
  // res.send({
  //   Location: "Eldoret",
  //   forecast: "Light showers and sunlight",
  //   address:req.query.address
  // })
    
 });
 app.get('/product',(req,res)=>{
    if(!req.query.search){
      return res.send({
        error:'Please provide a search item'
      })
    }
    res.send({
      products:['khat','jaba']
    })
 })

app.get('/help/*',(req,res)=>{
 res.render('404',{
  title:'404',
  name:'Hosea',
  errorMessage:'Help Article Not found'
 })
})

app.get('*',(req,res)=>{
  res.render('404',{
    title:'404',
    name:'Hosea',
    errorMessage:'page not found'
  })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
