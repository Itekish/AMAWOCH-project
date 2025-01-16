document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu');
    const menuList = document.getElementById('menu-list');

    menuButton.addEventListener('click', () => {
        menuList.style.display = menuList.style.display === 'block' ? 'none' : 'block';
    });


    const signUpButton = document.getElementById('signup');
    signUpButton.addEventListener('click', () => {
        window.location.href = './otherHtmlFiles/signUp&logIn.html';
    });

    const getStartedButton = document.getElementById('getStarted');
    getStartedButton.addEventListener('click', () => {
    });

    const faqLink = document.querySelectorAll('#FAQ');
    faqLink.forEach(link => {
        link.addEventListener('click', () => {
            
        });
    });

    // Top Movies Scroll Interaction
    const marquee = document.querySelector('marquee');
    marquee.addEventListener('mouseover', () => {
        marquee.stop();
    });

    marquee.addEventListener('mouseout', () => {
        marquee.start();
    });
});
