const mongoose = require('mongoose');
const Schma = mongoose.Schema;




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

const reviewSchm = new Schma({
    comment: String,
    rating: {
        type:Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type:Date,
        default: Date.now()
    }
})



//creating one to many relationship
module.exports = mongoose.model('Reviewz',reviewSchm)
