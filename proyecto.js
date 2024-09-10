
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// Gestiona el carrito de compras
class Cart {
    constructor() {
        this.items = []; 
    }

    addProduct(product, quantity = 1) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity; // Si ya existe el producto en el carrito, aumenta la cantidad
        } else {
            this.items.push({ product, quantity }); // Si no existe, lo agrega al carrito
        }
        alert(`${quantity} unidad(es) de ${product.name} añadida(s) al carrito.`);
    }

    viewCart() {
        if (this.items.length === 0) {
            alert("El carrito está vacío.");
        } else {
            let cartSummary = "Carrito de compras:\n";
            this.items.forEach(item => {
                cartSummary += `${item.quantity}x ${item.product.name} - $${item.product.price * item.quantity}\n`;
            });
            cartSummary += `Total: $${this.getTotal()}`;
            alert(cartSummary);
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0); // Calcula el total
    }

    checkout() {
        if (this.items.length === 0) {
            alert("No podes realizar una compra, el carrito está vacío.");
        } else {
            const total = this.getTotal();
            alert(`El total de tu compra es $${total}. Gracias por elegirnos!`);
            this.items = []; // Vacia el carrito después de la compra
        }
    }
}

// Gestiona los productos disponibles
class Store {
    constructor() {
        this.products = [
            new Product(1, 'Paleta de Sombras NOVO', 4000),
            new Product(2, 'Tinta de labios Miss Lara', 2500),
            new Product(3, 'Polvo suelto calm white NOVO', 6500),
            new Product(4, 'Pack de Brochas x4', 4500)
        ]; 
    }

    viewProducts() {
        let productList = "Productos disponibles:\n";
        this.products.forEach(product => {
            productList += `${product.id}: ${product.name} - $${product.price}\n`;
        });
        return productList;
    }

    findProductById(id) {
        return this.products.find(product => product.id === id); // Busca un producto por su numero
    }
}


const store = new Store();
const cart = new Cart();

// Función principal que maneja la interacción con el usuario
function startShopping() {
    alert("Bienvenido a KOKOA MAKEUP");
    let shopping = true;

    // Permite al usuario interactuar con la tienda
    while (shopping) {
        const option = prompt(
            "Opciones\n" +
            "1: Ver productos\n" +
            "2: Agregar producto al carrito\n" +
            "3: Ver carrito\n" +
            "4: Realizar compra\n" +
            "5: Salir"
        );

        switch (option) {
            case "1":
                alert(store.viewProducts()); // Muestra los productos disponibles
                break;
            case "2":
                const productId = parseInt(prompt(store.viewProducts() + "Ingresa el numero del producto que deseas agregar:"));
                const selectedProduct = store.findProductById(productId);
                if (selectedProduct) {
                    const quantity = parseInt(prompt("¿Cuántas unidades?"));
                    cart.addProduct(selectedProduct, quantity); // Agrega productos al carrito
                } else {
                    alert("Producto no encontrado.");
                }
                break;
            case "3":
                cart.viewCart(); // Muestra el contenido del carrito
                break;
            case "4":
                cart.checkout(); // Realiza la compra
                break;
            case "5":
                shopping = false;
                alert("Gracias por elegirnos!");
                break;
            default:
                alert("Opción no válida.");
        }
    }
}


startShopping();

