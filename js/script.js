const navbarNav = document.querySelector('.navbar-nav');

// Saat menekan icon menu
document.querySelector('#menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

// Menghilangkan nav selain klik icon
const Menu = document.querySelector('#menu');

document.addEventListener('click', function(e){
    if(!Menu.contains(e.target) && !navbarNav.contains(e.target)){
        navbarNav.classList.remove('active');
    }
});