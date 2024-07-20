// Class Active Menu
const navbarNav = document.querySelector('.navbar-nav');

// Saat menekan icon menu
document.querySelector('#menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

// Search
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

// Saat menekan icon search
document.querySelector('#search-btn').onclick = (e) => {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
};

// Shopping cart
const shoppingCart = document.querySelector('.shopping-cart');

// Saat menekan icon Shopping cart
document.querySelector('#shopping-cart-btn').onclick = () => {
    shoppingCart.classList.toggle('active');
}; 

// Menghilangkan nav selain klik icon
const Menu = document.querySelector('#menu');
const searchButton = document.querySelector('#search-btn');
const shoppingButton = document.querySelector('#shopping-cart-btn');

document.addEventListener('click', function(e){
    if(!Menu.contains(e.target) && !navbarNav.contains(e.target)){
        navbarNav.classList.remove('active');
    }
    if(!searchButton.contains(e.target) && !searchForm.contains(e.target)){
        searchForm.classList.remove('active');
    }
    if(!shoppingButton.contains(e.target) && !shoppingCart.contains(e.target)){
        shoppingCart.classList.remove('active');
    }
});


// Modal Box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailBtns = document.querySelectorAll('.item-detail-btn');

itemDetailBtns.forEach((btn) => {
    btn.onclick = (e) => {
        itemDetailModal.style.display = 'flex';
        e.preventDefault();
    }  
})


// Close tampilan Modal Box
document.querySelector('.modal .close-btn').onclick = (e) => {
    itemDetailModal.style.display = 'none';
    e.preventDefault();
}

window.onclick = (e) => {
    if (e.target === itemDetailModal) {
        itemDetailModal.style.display = 'none';
    }
};

