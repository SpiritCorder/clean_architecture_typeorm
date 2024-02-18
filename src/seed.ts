import { Category } from "./domains/entity/Category";
import { Product } from "./domains/entity/Product";


type ProductOriginalType = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}


// fetch all categories & insert into Category table
export async function insertCategories(myDataSource: any) {
    try {
        const response = await fetch("https://dummyjson.com/products/categories");
        const data: string[] = await response.json();
        
        // insert data into table (Category)
        await myDataSource
            .createQueryBuilder()
            .insert()
            .into(Category)
            .values(data.map(cat => ({name: cat})))
            .execute()

    } catch (err) {
        console.log(err);
    }
}



export async function insertProducts(myDataSource: any) {
    try {
        const response = await fetch("https://dummyjson.com/products?limit=100");
        const data = await response.json();
        const products = data.products;

        const categories: Category[] = await myDataSource
                                    .createQueryBuilder()
                                    .select("category")
                                    .from(Category, "category")
                                    .getMany()
        
        const productsFormatted = products.map((p: ProductOriginalType) => ({
            name: p.title,
            description: p.description,
            image: p.images[0],
            price: p.price,
            category: categories.find(c => c.name === p.category)!.id
        }))

        console.log(productsFormatted);

        // insert formatted poducts data to Product table
        // await db.product.createMany({
        //     data: productsFormatted
        // })
        await myDataSource
                .createQueryBuilder()
                .insert()
                .into(Product)
                .values(productsFormatted)
                .execute()

    } catch (err) {
        console.log(err);
    }
}

// async function seed() {
//     try {
//         // remove all products & categories
//         await db.product.deleteMany();
//         await db.category.deleteMany();

//         // then insert category & products data
//         await insertCategories();
//         await insertProducts();
//     } catch (err) {
//         console.log(err);   
//     }
// }


// seed();

