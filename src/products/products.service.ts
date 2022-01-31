import { Injectable, NotFoundException } from '@nestjs/common'; 
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];



  create(title: string, description: string, price: number) {
    const id = new Date().toISOString();
    const product = new Product(id, title, description, price);
    this.products.push(product);
    return product;
  }

  findAll() {
    return [...this.products];
  }

  findOne(id: string) {
    const [ product, _] = this.findProductById(id);
    return { ...product };
  }

  update(id: string, title: string, description: string, price: number) {
    let [product, index] = this.findProductById(id);
    let update = { ...product }
    
    if(title) update.title = title;
    if(description) update.description = description;
    if(price) update.price = price;
    this.products[index] = update;


    return { product: this.products[index] };
  }

  remove(id: string) {
    let [_, index] = this.findProductById(id);
    this.products.splice(index,1);
    return `Product ${id} deleted successfully.`
  }

  private findProductById(id: string) : [Product, number] {
    const productIndex = this.products.findIndex(p => p.id === id);
    const product = this.products[productIndex];

    if(!product) {
      throw new NotFoundException("Could not find the product");
    }
    return [product, productIndex] ;
  }
}
