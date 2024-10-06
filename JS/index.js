// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById("menu-button");
  const menu = document.getElementById("menu");

  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      menu.classList.toggle('hidden'); // Toggle 'hidden' class to show/hide the menu
    });
  }

  // const navbar = document.querySelector(".navbar");
//   window.onscroll = () => {
//     const isScrolled = window.scrollY > 20;

//     // Toggle the 'sticky' class for the navbar
//     navbar.classList.toggle("sticky", isScrolled);
//     navbar.classList.toggle("dark", isScrolled);

    
// };



});