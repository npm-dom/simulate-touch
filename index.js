var on = require("dom-event");

module.exports = simulate;

function simulate (element) {
  on(element, 'mousedown', dispatch('touchstart'));
  on(element, 'mousemove', dispatch('touchmove'));
  on(element, 'mouseup', dispatch('touchend'));
}

function dispatch (touchEventType) {
  return function (event) {
    var touchEvent = document.createEvent('MouseEvents');

    touchEvent.initMouseEvent(
      touchEventType,
      true,             // bubbles
      true,             // cancelable
      window,           // view
      1,                // detail
      event.screenX,    // screenX
      event.screenY,    // screenY
      event.clientX,    // clientX
      event.clientY,    // clientY
      false,            // ctrlKey
      false,            // altKey
      false,            // shiftKey
      false,            // metaKey
      0,                // button
      null);

    touchEvent.changedTouches = touchEvent.touches = [{
      identifier: event.identifier,
      clientX: event.clientX,
      clientY: event.clientY,
      pageX: event.pageX,
      pageY: event.pageY,
      screenX: event.screenX,
      screenY: event.screenY
    }];

    event.target.dispatchEvent(touchEvent);
  };
}
