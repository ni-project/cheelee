
export default class AppMobileMenu {
    constructor() {
        this.bindEvents();
    }

    //-----------------------------------------------------
    // Variables
    //-----------------------------------------------------

    $body = document.querySelector('body');
    $container = document.querySelector('.header__wrapper');
    $button = this.$container.querySelector('.header__menu-button');
    $buttonClose = this.$container.querySelector('.header__menu-button-close');
    $menu = this.$container.querySelector('.header__menu');

    //-----------------------------------------------------
    // Bind events
    //-----------------------------------------------------

    bindEvents = () => {
        this.$button.addEventListener('click', this.handleClickButton);
        this.$buttonClose.addEventListener('click', this.handleClickButtonClose);

        window.addEventListener('resize', this.windowResize);
    };

    //-----------------------------------------------------
    // Methods
    //-----------------------------------------------------

    windowResize = () => {
        const windowWidth = window.innerWidth;
        const buttonIsActive = this.$button.classList.contains('header__menu-button--active');

        if ( windowWidth > 1250 && buttonIsActive ) {
            this.menu('hide');
        }
    };

    menu = (action) => {
        switch (action) {
            case 'show':
                this.$button.classList.add('header__menu-button--active');
                this.$buttonClose.classList.add('header__menu-button-close--active');
                this.$menu.classList.add('header__menu--active');
                this.$body.style.overflowY = 'hidden';
                break;

            case 'hide':
                this.$button.classList.remove('header__menu-button--active');
                this.$buttonClose.classList.remove('header__menu-button-close--active');
                this.$menu.classList.remove('header__menu--active');
                this.$body.style.overflowY = 'auto';
                break;

            default:
                break;
        }
    };

    handleClickButton = () => {
        const buttonIsActive = this.$button.classList.contains('header__menu-button--active');

        if ( buttonIsActive ) {
            this.menu('hide');
        } else {
            this.menu('show');
        }
    };

    handleClickButtonClose = () => {
        this.menu('hide');
    };
}
