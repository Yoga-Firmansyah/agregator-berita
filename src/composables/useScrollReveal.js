import { onMounted } from 'vue';
import ScrollReveal from 'scrollreveal';

export function useScrollReveal() {

    // Lifecycle hooks
    onMounted(() => {
        // Initialize ScrollReveal
        const srTop = ScrollReveal({
            origin: "top",
            duration: 1000,
            distance: "50px",
            easing: "ease-in-out",
            reset: false,
        });
        srTop.reveal('.sr-header', {});
        
        const srBottom = ScrollReveal({
            origin: 'bottom',
            distance: '50px',
            duration: 1000,
            easing: 'ease-in-out',
            reset: false,
        });
        srBottom.reveal('.sr-bottom', { delay: 200 });

        // Scroll reveal for left-right animations
        const srLeft = ScrollReveal({
            origin: 'left',
            distance: '30px',
            duration: 1000,
            easing: 'ease-in-out',
            reset: false,
        });

        srLeft.reveal('.sr-left', { delay: 200 });

        const srRight = ScrollReveal({
            origin: 'right',
            distance: '30px',
            duration: 1000,
            easing: 'ease-in-out',
            reset: false,
        });

        srRight.reveal('.sr-right', { delay: 200 });
    });
}