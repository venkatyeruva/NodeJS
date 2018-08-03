var express = require('express');
var hbs = require('hbs')
var app = express();
var axios = require('axios');

hbs.registerPartials(__dirname+ "/views/partials");
hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
})
hbs.registerHelper("toUpper", (text) => {
    return text.toUpperCase();
}) 
app.use(express.static(__dirname + "/public"))
app.set("view engine", "hbs");
app.use(function(req, resp, next){
    console.log("testing middleware")
    next()
})

app.get("/", (req, res) => {
    // res.writeHead(200, {'Content-type': 'text/html'})
    // res.write("<h2>Web App using express server...</h2>")
    // res.end()
    res.render('home', {
        message: "Welcome to home"
    })
})

app.get("/about", (req, res) => {
    setTimeout(function(){
        res.render('About', {
            message: "Using hbs as the default view engine requires just one line of code in your app setup. This will render .hbs files when res.render is called. "    
        })
    }, 1000)    
})

app.get("/blogs", async (req, res) => {
    var blogsData = []
    var url = "https://jsonplaceholder.typicode.com/posts"
    try {
      var response = await axios.get(url)
      blogsData = response.data
    } catch(error) {
        console.log(error)
    }
    res.render('blogs', {
        blogs: blogsData
    })
})


app.listen(8080, () => {
    console.log("Express server started..")
})
