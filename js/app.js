document.addEventListener('alpine:init', () => {
    Alpine.data('product', () => ({
        items: [
            {id: 1, name: 'Robusta Brazil', img: 'produk1.jpg', price: 25000},
            {id: 2, name: 'Robusta Indonesia', img: 'produk1.jpg', price: 15000},
            {id: 3, name: 'Robusta Malaysia', img: 'produk2.jpg', price: 35000},
            {id: 4, name: 'Robusta Mexico', img: 'produk2.jpg', price: 45000},
            {id: 5, name: 'Robusta Canada', img: 'produk2.jpg', price: 55000},
        ],
    }));

    Alpine.store('shop', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem){
            // cek barang duplikasi
            const cartItem = this.items.find((item) => item.id === newItem.id);

            if(!cartItem){
                this.items.push({...newItem, quantity: 1, total: newItem.price});
                this.quantity++;
                this.total += newItem.price;
            } else{
                this.items = this.items.map((item) => {
                    if(item.id !== newItem.id){
                        return item
                    } else {
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }
        },
        remove(id){
            const cartItem = this.items.find((item) => item.id === id);

            // item > 1
            if(cartItem.quantity > 1){
                this.items = this.items.map((item) => {
                    if(item.id !== id){
                        return item
                    } else{
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                });
            } else if(cartItem.quantity === 1){
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price
            }
        }
    });
});

// Rupiah
const kurs = (number) => {
    return new Intl.NumberFormat('id-ID',{
        style: 'currency',
        currency: 'IDR',
        // minimumFractionDigits: 0
    }).format(number);
};

// form validation
const checkoutBtn = document.querySelector('.checkout-btn');
checkoutBtn.disabled = true;

const form = document.querySelector('#checkout-form');
form.addEventListener('keyup', function(){
    for(let i = 0; i < form.elements.length; i++){
        if(form.elements[i].value.length !== 0){
            checkoutBtn.classList.remove('disable');
            checkoutBtn.classList.add('disable');
        }else{
            return false;
        }
    }
    checkoutBtn.disabled = false;
    checkoutBtn.classList.remove('disable');
})

//  Kirim Data
checkoutBtn.addEventListener('click', function(e){
    e.preventDefault();
    const dataForm = new FormData(form);
    const data = new URLSearchParams(dataForm);
    const obj = Object.fromEntries(data);
    const Message = sendWhatsApp(obj);
    // console.log(obj)
})


// Send WhatsApp
const sendWhatsApp = (obj) => {
    let number = '6281357756389';
    let name = obj.name;
    let email = obj.email;
    let phone = obj.phone;
    // const url = "https://api.whatsapp.com/send?phone=6281357756389&text=%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A*---%20NAMA%20CUSTOMER%20---*%0AName%20%3A%20*Nama*%0AEmail%20%3A%20*Email*%0APhone%20%3A%20*Nomor%20Wa*%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A*---%20RINCIAN%20ORDER%20PESANAN%20---*%0Aitem%0ATOTAL%20HARGA%20%3A%20*TOTAL*%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D"
    let url = 'https://web.whatsapp.com/send?phone=' +number+
    '&text=*---%20NAMA%20CUSTOMER%20---*%0AName%20%3A%20*'+name+
    '*%0AEmail%20%3A%20*'+email+
    '*%0APhone%20%3A%20*'+phone+
    '*%0A%0A*---%20RINCIAN%20ORDER%20PESANAN%20---*%0A*'
    +`${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${kurs(item.total)})\n`)}`+
    '*%0ATOTAL%20HARGA%20%3A%20*'+kurs(obj.total)+
    '*%0A%0A*---%20Terimakasih%20Telah%20Berbelanja%20---*%0A'
    window.open(url);
};