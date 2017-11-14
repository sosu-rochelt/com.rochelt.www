import AppDispatcher from '../dispatcher/Dispatcher';

export function showNav() {
  AppDispatcher.dispatch({
    type: 'SHOW_NAV'
  });
}
export function hideNav() {
  AppDispatcher.dispatch({
    type: 'HIDE_NAV'
  });
}
export function toggleSubnav(value) {
  AppDispatcher.dispatch({
    type: 'TOGGLE_SUBNAV',
    value
  });
}
export function updateScrollPosition(value) {
  AppDispatcher.dispatch({
    type: 'UPDATE_SCROLL_POSITION',
    value
  });
}

export function updateCurrentPage(pathname) {
  AppDispatcher.dispatch({
    type: 'UPDATE_CURRENT_PAGE',
    pathname
  });
}

export function updateCurrentSubnav(name) {
  AppDispatcher.dispatch({
    type: 'UPDATE_CURRENT_SUBNAV',
    name
  });
}

export function displayTab(index) {
  AppDispatcher.dispatch({
    type: 'DISPLAY_TAB',
    index
  });
}
