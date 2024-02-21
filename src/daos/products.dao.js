import ProductModel from "../models/products.model.js";

class ProductsDAO {
    static pid = 0;
    static async getProducts(funcion,seteo) {
        return ProductModel.paginate(funcion,seteo)
    }

    static async getProductByLimit(limit) {
        return ProductModel.find().limit(limit).lean();
    }

    static async getProductById(id) {
        return ProductModel.findOne({ id: id }).lean();
    }

    static async addProduct(title, description, thumbnail, price, stock,code) {
        ProductsDAO.pid++;
        console.log("addProduct")
        console.log('datos:' + title +'*'+ description +'*'+ thumbnail +'*'+ price +'*'+ stock +'*'+code  +'*'+ProductsDAO.pid +'*')
        return new Products({title, description, thumbnail, price, stock,code,id: ProductsDAO.pid}).save();
    }

     static async updateProduct(data, newData) {
        return ProductModel.findByIdAndUpdate({_id:data._id},{$set: newData})
                                .then(success => console.log('Actualizacion OK'))
                                .catch(error =>{
                                        if(error){
                                            console.log('Error al actualizar ' + error);
                                            process.exit();
                                        }
                        });
    }

     static async deleteProduct(id) {
        return ProductModel.findByIdAndDelete(id);
    }

}

export default ProductsDAO;
