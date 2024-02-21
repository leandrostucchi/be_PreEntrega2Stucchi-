import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
const cartCollection = 'carts';


const cartSchema = new mongoose.Schema({
    cid: Number,
    product:[{pid:Number,quantity:Number},{type:mongoose.Schema.Types.ObjectId, ref:'products'}]
    // product:[{type:mongoose.Schema.Types.ObjectId, ref: ProductModel,refPath:'datos'}],
    // datos:{pid:Number,quantity:Number}
});

cartSchema.plugin(mongoosePaginate);
const CartModel =  mongoose.model(cartCollection, cartSchema);
export default  CartModel;


