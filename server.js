import express  from "express";
import fetch  from "node-fetch";
import request from "request";
import https  from "https";
import bodyParser  from "body-parser";
import ejs  from "ejs";
const app = express();
import mongoose from "mongoose";
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin-pk:pktk001@cluster0.w3dfu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const url = 'https://api.wazirx.com/api/v2/tickers';

const appSchema = {
    Name: String,
    Last: Number,
    Buy: Number,
    Sell: Number,
    Volume: Number,
    Base_unit: String,

}


const AppData = mongoose.model('AppData', appSchema);


app.get("/",async(req,res)=>{
  
    const response = await fetch(url);
    const data = await response.json();

    for(var i=0; i<10; i++){

        var NewData= new AppData({
           Name: data[Object.keys(data)[i]].name,
           Last:data[Object.keys(data)[i]].last,
           Buy:data[Object.keys(data)[i]].buy ,
           Sell:data[Object.keys(data)[i]].sell ,
           Volume:data[Object.keys(data)[i]].volume ,
           Base_unit :data[Object.keys(data)[i]].base_unit,
        });
        NewData.save();
    }
    //rendering to page
    AppData.find({}, (err, items) => {
		if (err) {
			console.log(err);
			res.status(500).send('An error occurred', err);
		}
		else {
			res.render('home', { items: items });
		}
	});
     
   
})



app.listen(3000, function (req, res) {
    console.log("server is listening on port 3000")
})