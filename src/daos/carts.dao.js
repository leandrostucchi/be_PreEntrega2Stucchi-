import CartModel from "../models/carts.model.js";
import ProductModel from "../models/products.model.js";

class CartsDAO {
    static cid = 0;
    static async getCarts() {
        console.log("antes getCarts")
        return CartModel.find().lean();
    }
    static async getCartById(id) {
        return CartModel.findOne({ cid: id }).lean();
    }

    static async getCartByCIdAndPid(cid,pid) {
        return CartModel.findOne({ cid: cid,product:[{pid:pid}] }).lean();
    }


    static async InitCarts() {
        console.log("InitCarts")
        CartsDAO.cid++;
        return new CartModel({cid:CartsDAO.cid}).save();
    }


    static async AddCarts(cid,pid,quantity) {
        CartsDAO.cid++;
        console.log("addCart")
        return new CartModel({cid:CartsDAO.cid,product:[]}).save();
    }



     static async updateCart(data, newData) {
        console.log("updatcart")
        //console.log(data)
        //console.log(newData)
        console.log({product:newData})
        return CartModel.findByIdAndUpdate({_id:data._id},{$set:{product:newData}})
                                .then(success =>console.log('Actualizacion OK')
                                )
                                .catch(error =>{
                                        if(error){
                                            console.log('Error al actualizar ' + error);
                                            process.exit();
                                        }
                        });
    }

    static async delCartsOnlyProduct(cid,pid) {
        console.log("delCartsOnlyProduct")
        return await CartModel.updateOne ({ _id: cid},{ $pull:{ product:{_id:pid}} })
                            .then(success => console.log('Se borro el registro'))
                            .catch(error =>{
                                    if(error){
                                        console.log('Error al actualizar ' + error);
                                        process.exit();
                                    }
                                });
    }

    static async delCarts(cid) {
        console.log("delCarts")
        return CartModel.findByIdAndDelete({ _id: cid }) 
                    .then(success => console.log('Se borro el registro'))
                    .catch(error =>{
                            if(error){
                                console.log('Error al actualizar ' + error);
                                process.exit();
                            }
                        });
    }


}


export default CartsDAO;