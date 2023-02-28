import {promises as fs} from 'fs';
import { nanoid } from 'nanoid';
import { setUncaughtExceptionCaptureCallback } from 'process';
import ProductManager from './ProductManager.js';


const productAll = new ProductManager

class CartManager {
    constructor(){
        this.path = "./src/models/carts.json"
    }

    readCarts = async ()=>{
        let carts = await fs.readFile(this.path, "utf-8" );
        return JSON.parse(carts);
    }

    writeCarts = async (cart) =>{
        await fs.writeFile(this.path, JSON.stringify(cart))
    }

    exist= async (id)=>{
        let carts= await this.readCarts();
        return carts.find(cart => cart.id === id)
    }

    addCart = async()=>{
        let cartsOld = await this.readCarts()
        let id = nanoid()
        let cardsConcat = [{id: id, products : [], ...cartsOld}]
        await this.writeCarts(cardsConcat)
        return "Carrito Agregado"
    }

    getCartById = async(id)=>{
        let cartById = await this.exist(id)
        if (!cartById) return "Carrito inexistente"
        return cartById
    };

    addProductInCart = async (cartId, productId)=>{
        let cartById = await this.exist(cartId)
        if (!cartById) return "Carrito inexistente"
        let productById = await productAll.exist(productId)
        if (!cartById) return "Producto inexistente"

        let cartAll= await this.readCarts();
        let cartFilter = cartAll.filter(cart => cart.id != cartId)

        if(cartById.products.some(prod.id === productId)){
            let moreProductInCart = cartById.products.find(prod.id === productId)
            moreProductInCart.cantidad ++;
            let cartsConcat = [cartById, ...cartFilter]
            await this.writeCarts(cartsConcat)
            return "Producto Sumado Al carrito"
        }

        cartById.products.push({id:productById.id, cantidad:1})

        let cartsConcat = [cartById, ...cartFilter]
        await this.writeCarts(cartsConcat)
        return "Producto Agregado Al carrito"
    }
}
export default CartManager;