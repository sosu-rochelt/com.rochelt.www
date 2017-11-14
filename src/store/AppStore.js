import AppDispatcher from '../dispatcher/Dispatcher';
import { EventEmitter } from 'events';

EventEmitter.prototype._maxListeners = 100;

class AppStore extends EventEmitter {
  constructor() {
    super();

    this.config = {
      displayTab: 0,
      navigation: {
        isActive: false,
        isDark: false,
        currentPage: '/',
        showSubnav: false,
        scrollPosition: 0,
        currentSubnav: null
      }
    };
  }

  showNav() {
    this.config.navigation = Object.assign(this.config.navigation, {
      isActive: true
    });

    console.log('shownav');
    this.emit('change');
  }

  hideNav() {
    this.config.navigation = Object.assign(this.config.navigation, {
      isActive: false,
      showSubnav: false
    });
    this.emit('change');
  }

  toggleSubnav(value) {
    this.config.navigation.showSubnav = value;
    this.emit('change');
  }

  updateScrollPosition(value) {
    this.config.navigation.scrollPosition = value;
    this.emit('change');
  }

  updateCurrentPage(pathname) {
    this.config.navigation.currentPage = pathname;

    this.emit('change');
  }
  updateCurrentSubnav(name) {
    this.config.navigation.currentSubnav = name;

    this.emit('change');
  }

  displayTab(index) {
    this.config.displayTab = index;

    this.emit('change');
  }

  getConfig() {
    return this.config;
  }

  handleActions(action) {
    switch (action.type) {
      case 'SHOW_NAV': {
        this.showNav();
        break;
      }
      case 'HIDE_NAV': {
        this.hideNav();
        break;
      }
      case 'TOGGLE_SUBNAV': {
        this.toggleSubnav(action.value);
        break;
      }

      case 'UPDATE_SCROLL_POSITION': {
        this.updateScrollPosition(action.value);
        break;
      }

      case 'UPDATE_CURRENT_PAGE': {
        this.updateCurrentPage(action.pathname);
        break;
      }
      case 'UPDATE_CURRENT_SUBNAV': {
        this.updateCurrentSubnav(action.name);
        break;
      }
      case 'DISPLAY_TAB': {
        this.displayTab(action.index);
        break;
      }
    }
  }
}

const appStore = new AppStore();

AppDispatcher.register(appStore.handleActions.bind(appStore));

if (typeof window !== 'undefined') {
  window.appStore = appStore;
}
export default appStore;
