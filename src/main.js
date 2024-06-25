import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './styles/base.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount('#app');

// document.addEventListener('DOMContentLoaded', function () {
//     var lastTouchEnd = 0;

//     document.addEventListener('touchend', function (event) {
//         var now = (new Date()).getTime();
//         if (now - lastTouchEnd <= 300) {
//             event.preventDefault();
//         }
//         lastTouchEnd = now;
//     }, false);

//     document.addEventListener('gesturestart', function (e) {
//         e.preventDefault();
//     });

//     document.addEventListener('gesturechange', function (e) {
//         e.preventDefault();
//     });

//     document.addEventListener('gestureend', function (e) {
//         e.preventDefault();
//     });
// });

setTimeout(() => {
    let vh = window.innerHeight * 0.01 - 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    // window.addEventListener('resize', () => {
    //     let vh = window.innerHeight * 0.01 - 0.01;
    //     document.documentElement.style.setProperty('--vh', `${vh}px`);
    // });
}, 100);