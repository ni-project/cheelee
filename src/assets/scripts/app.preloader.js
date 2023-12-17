
export default class AppPreloader {
    constructor() {
        this.bindEvents();
    }

    //-----------------------------------------------------
    // Variables
    //-----------------------------------------------------

    $body = document.querySelector('body');
    $container = document.querySelector('.preloader-page');
    $progress = this.$container.querySelector('.preloader-page_progress');
    $message = this.$container.querySelector('.preloader-page_message');

    images = document.querySelectorAll('img');
    imagesCount = this.images.length;
    listElements = [];
    interval = 0;
    counter;

    //-----------------------------------------------------
    // Bind events
    //-----------------------------------------------------

    bindEvents = () => {
        this.preloaderInit();
    };

    //-----------------------------------------------------
    // Methods
    //-----------------------------------------------------

    preloaderInit = () => {
        this.$body.style.overflowY = 'hidden';

        this.counter = setInterval(() => {
            this.interval++;

            if ( this.interval === 30 ) {
                this.$message.innerText = 'Медленное соединение, подождите ...';
                this.$message.classList.add('active');
            }
        }, 1000);

        for (let index = 0; index < this.images.length; index++) {
            const image = this.images[index];

            let src = image.src;

            this.listElements.push(false);

            src += '?' + Math.random();
            image.src = src;

            image.onload = () => {
                this.imageLoadComplete(index);
            }
        }
    };

    imageLoadComplete = (index) => {
        let progress = 0;

        this.listElements[index] = true;

        for (let index = 0; index < this.listElements.length; index++) {
            if (this.listElements[index]) progress++;
        }

        progress = Math.round((progress * 100) / this.imagesCount);

        this.$progress.style.width = progress + '%';

        if (progress === 100 || progress > 100) {
            clearInterval(this.counter);

            // Жду 1сек из-за завершения анимации в css и удаляю прелоадер через 1сек
            new Promise((resolve) => {
                setTimeout(() => {
                    window.scrollTo(0, 0);
                    this.$body.style.overflowY = 'auto';
                    this.$container.classList.add('complete');
                    this.$body.classList.add('complete');
                    resolve('complete');
                }, 1000);
            }).then(() => {
                setTimeout(() => {
                    this.$container.remove();
                }, 1000);
            });
        }
    };
}
