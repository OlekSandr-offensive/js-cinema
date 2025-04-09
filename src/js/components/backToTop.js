import { getRefs } from '../utils';

const { scrollToTop, header, gallery } = getRefs();

const getScroll = () => {
  if (document.documentElement.scrollTop) {
    scrollToTop.classList.add('scroll-show');
  } else {
    scrollToTop.classList.remove('scroll-show');
  }
};
const onScrollTop = () => {
  header.scrollIntoView({ behavior: 'smooth' });
};

export const onScrollGalleryTop = () => {
  gallery.scrollIntoView({ behavior: 'smooth' });
};

window.onscroll = getScroll;

scrollToTop.addEventListener('click', onScrollTop);
