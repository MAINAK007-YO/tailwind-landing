// const e = require("express");

const navDialog = document.querySelector("#nav-dialog");

function handleMenu() {
  navDialog.classList.toggle('hidden');
}

const initialTranslateLTR = -48*4;
const initialTranslateRTL = 36*4;

function setupIntersectionObserver(element, isLTR, speed) {
  const intersectionCallback = (entries) => {
    const isIntersecting = entries[0].isIntersecting;
    if(isIntersecting) {
        document.addEventListener('scroll', scrollHandler);
    } else {
        document.removeEventListener('scroll', scrollHandler);
    }
  }
  const intersectionObserver = new IntersectionObserver(intersectionCallback);

  intersectionObserver.observe(element);

  function scrollHandler() {
    const translateX = (window.innerHeight - element.getBoundingClientRect().top) * speed;

    let totalTranslate = 0;
    if(isLTR){
        totalTranslate = translateX + initialTranslateLTR;
    } else {
        totalTranslate = -(translateX + initialTranslateRTL);
    }

    element.style.transform = `translateX(${totalTranslate}px)`;
  }
}

const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');
const line4 = document.getElementById('line4');

setupIntersectionObserver(line1, true, 0.15);
setupIntersectionObserver(line2, false, 0.15);
setupIntersectionObserver(line3, true, 0.15);

setupIntersectionObserver(line4, true, 0.8);



const dtElements = document.querySelectorAll('dt');
dtElements.forEach(ele => {
  ele.addEventListener('click', () => {
    const ddId = ele.getAttribute('aria-controls');
    const ddEle = document.getElementById(ddId);
    const ddArrowIcon = ele.querySelectorAll("i")[0];

    ddEle.classList.toggle('hidden');
    ddArrowIcon.classList.toggle('-rotate-180');
  })
})


const links = document.querySelectorAll('a[href*="#"]');

// Add an event listener to each link
links.forEach(link => {
  link.addEventListener('click', (e) => {
    // Prevent the default link behavior
    e.preventDefault();

    // Get the target element
    const target = document.querySelector(link.getAttribute('href'));

    // Calculate the distance to the target element
    const distance = target.offsetTop;

    // Animate the scrolling
    window.scrollTo({
      top: distance,
      behavior: 'smooth'
    });
  });
});