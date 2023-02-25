const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://fooddel:fooddel123@cluster0.0l0bvxi.mongodb.net/fooddel?retryWrites=true&w=majority'

const mongDB = async()=>{

   await mongoose.connect(mongoURI,async(err,result)=>{
    if(err) console.log('error')
    else{
        console.log('connected');

        const fetchData = await mongoose.connection.db.collection("food_items");
        fetchData.find({}).toArray( async function(err,data){
            const category = await mongoose.connection.db.collection("food_category");

            category.find({}).toArray(async (err, catdata)=>{
                if(err) console.log("error",err);
                else{
                    global.food_items = data;
                    global.food_category = catdata;
                    // console.log(global.food_items)
                }

            })
           

        })
        

}});
}


module.exports = mongDB;