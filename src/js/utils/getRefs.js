export function getRefs() {
  return {
    // theme switcher
    body: document.querySelector('body'),
    checkbox: document.querySelector('[data-switch-theme-toggle]'),
    // path template filmListCard
    // filmGallery: document.querySelector('.gallery'),
    gallery: document.querySelector('[data-gallery]'),
    //path template pagination
    pagination: document.querySelector('[data-pagination]'),
    //path template searchForm
    searchForm: document.querySelector('[data-search-form]'),
    searchInput: document.querySelector('[data-search-input]'),
    //path template modal
    modal: document.querySelector('[data-modal]'),
    movieDetails: document.querySelector('[data-movie-details]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    //path scrolling
    header: document.querySelector('.page-header'),
    scrollToTop: document.querySelector('#scrollTop'),
    // navigation
    homeBgcContainer: document.querySelector('.js-bg-home'),
    homeContainer: document.querySelector('.home-container'),
    parentNav: document.querySelector('[data-header-nav]'),
    itemHome: document.querySelector('.item-home'),
    itemLibrary: document.querySelector('.item-library'),
    itemLogin: document.querySelector('.item-login'),
    //login modal btn
    loginModalBtn: document.querySelector('[data-action-btn]'),
    googleBtnSignIn: document.querySelector('[data-action-google]'),
    //toggle password
    togglePassword: document.querySelector('[data-action="toggle-password"]'),
    passwordInput: document.querySelector('#password'),
    // authentication buttons
    logInBtn: document.querySelector('[data-action="log-in"]'),
    signUpBtn: document.querySelector('[data-action="sign-up"]'),
    signInWithGoogleBtn: document.querySelector(
      '[data-action="sign-in-with-google"]'
    ),
    goToSignInBtn: document.querySelector('[data-action="go-to-sign-in"]'),
    goToLogInBtn: document.querySelector('[data-action="go-to-log-in"]'),
    // updateUI
    itemLogout: document.querySelector('.item-logout'),
    itemSignIn: document.querySelector('.js-sign-in'),
    UiWatchedBtn: document.querySelector('.js-add-to-watched'),
    UiQueueBtn: document.querySelector('.js-add-to-queue'),
  };
}
