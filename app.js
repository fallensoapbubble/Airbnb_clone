require('dotenv').config()
console.log(process.env.SecretVar)


const express = require('express');
const app = express();

const mongoose = require('mongoose');

app.listen(9090,()=>{
    console.log('server listening on 9090. . .');
});






async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

main()
.then(()=>{
    console.log('connected to DB')
})
.catch((err)=>{
    console.log(err);
})







//cookie setup
app.get('/getcookiez',(rq,rs)=>{
  rs.cookie('greet','hi')
  rs.cookie('greet','hola')
  rs.send('welcome')

})



//cookie parsing from root 
const cookieParser =require('cookie-parser')
app.use(cookieParser());//wo this you get undefined o/p
//only possible using middleware
app.get('/',(rq,rs)=>{
  let {name='who me?'} = rq.cookies
  console.dir(rq.cookies);
  rs.send(`hi me is root ${name}`);

});

//signed cookies


app.get('/signed',(rq,rs)=>{
  rs.cookie('namestr','valuestr',{signed:true})
  rs.send('signed cookies sent')
  console.log(rq.signedCookies)

})








//sessions

const session= require('express-session')
app.use(session({
  secret:'secretivestring',//encryted form in a cookie tab
  resave:false,//Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized:true//Forces a session that is "uninitialized" to be saved to the store
}))



app.get('/cartz',(rq,res)=>{
  //create new var
  if(rq.session.count){//adding to request object new var
    rq.session.count++;
  }
  else{
    rq.session.count = 1;
  }
  res.send(`test done  ${rq.session.count} times!`)
  //rq.session.names
})












const Lstin=require('C:/Users/Annanya/airbnbproj/models/listing.js');
// app.get('/testlist',async (rq,rs)=>{
//     let sample = new Lstin({
//         title: 'my villa',
//         description: 'beach',
//         price: 1200,
//         location:'goa'
//     })

//     await sample.save()
//     console.log('ho gaya save')
//     rs.send('successful')
// });




const path = require('path');
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//linking css files
app.use(express.static(path.join(__dirname,'public')));
//Index Route
app.get("/listingz", async (req, res) => {
    const allListings = await Lstin.find({});
    res.render("listings/index.ejs", { allListings });
    // console.log(allListings);
  });





//New Route
//take input thru form
app.get("/listingz/new", (req, res) => {
    res.render("listings/new.ejs");
  });





//Show Route
//wrap async to handle error
const wrapAsync=require('./util/wrapAss.js')
app.get("/listingz/:id",wrapAsync( async (req, res) => {
    let { id } = req.params;
    const vari = await Lstin.findById(id);
    res.render("listings/show.ejs", { vari });
  }));










//we need below one to get requested body in obj format
app.use(express.urlencoded({ extended: true }));
//Create Route
app.post("/listingz",async (req, res ,next) => {
    //try catch
    try{
      // console.log(req.body);
      //creating new object instance

      //hoppscoth error
      if(!req.body.jvobj){
        next(new ExprEr(400,'400 is status code for wrong request'));
      }

      const newvar = new Lstin(req.body.jvobj);
      await newvar.save();
      res.redirect("/listingz");

    }catch(err){
      next(err)
    }
    
  });




// create middleware pt1
app.use((err,rq,rs,next)=>{
  console.log('this middleware executed pt1',err.name,err.status,err.message)
  rs.send('smth gone wrong pt1')
})




//this is get request in show.ejs
//Edit Route
// wrapAsync used
app.get("/listingz/:id/edit",wrapAsync( async (req, res) => {
  //id from link clicked
  let { id } = req.params;
  //reqd is required data
  const reqd = await Lstin.findById(id);
  res.render("listings/edit.ejs", { reqd });
}));




//this is put request in edit.ejs
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
//Update Route
app.put("/listingz/:id", async (req, res) => {
  let { id } = req.params;
  //pass id and deconstructed object of req.body from edit.ejs
  await Lstin.findByIdAndUpdate(id, { ...req.body.jvobj });
  // console.log(req.body)
  res.redirect(`/listingz/${id}`);
});









//create review route
const Rvz = require('./models/review.js')
app.post('/listingz/:id/reviews',async (rq,rs)=>{
    let li = await Lstin.findById(rq.params.id)
    let newrev= new Rvz(req.body.review)

    //push it in array and save in both databases
    li.reviews.push(newrev);
    await newrev.save();
    await li.save();

    res.send('saved ! check mongoose!')
})





//this is delete request in show.ejs
//Delete Route
//Express error class handling
//applying express error
const ExprEr=require('./util/ExpErrFile.js')
app.delete("/listingz/:id", wrapAsync( async (req, res) => { //with async handling
  let { id } = req.params;
  let deletedListing = await Lstin.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listingz");
  next(new ExprEr(495,'thiz is big'))

}));








//for any requests of out of bounds
app.all('*',(req,res,next)=>{
  next(new ExprEr(404,'Page unfound'))
})




//create middleware pt2
app.use((err,rq,rs,next)=>{
  let {status,message='page not found try again'}=err
  console.log('thiz ran pt2')
  rs.status(status).render('listings/error.ejs',{message})

})



//creating boilerplate
//https://www.npmjs.com/package/ejs-mate
const ejsMate=require('ejs-mate');
app.engine('ejs',ejsMate);










