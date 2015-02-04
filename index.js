var on = require("dom-event");

module.exports = simulate;

function simulate (element) {
  on(element, 'mousedown', dispatch('touchstart'));
  on(element, 'mousemove', dispatch('touchmove'));
  on(element, 'mouseup', dispatch('touchend'));
}

function dispatch (touchEventType) {
  return function (event) {
    var touchEvent;

    try {
      touchEvent = newTouchEvent({
        type: touchEventType,
        event: event
      });
    } catch (err) {
      // failed to create a mouse event just ignore
      return;
    }

    touchEvent.changedTouches = touchEvent.touches = [{
      identifier: Date.now() + Math.random(),
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

function newTouchEvent (options) {
  var touchEvent = document.createEvent('MouseEvents');

  touchEvent.initMouseEvent(
    options.type,
    true,             // bubbles
    true,             // cancelable
    window,           // view
    1,                // detail
    options.event.screenX,    // screenX
    options.event.screenY,    // screenY
    options.event.clientX,    // clientX
    options.event.clientY,    // clientY
    options.event.pageX,    // pageX
    options.event.pageY,    // pageY
    false,            // ctrlKey
    false,            // altKey
    false,            // shiftKey
    false,            // metaKey
    0,                // button
    null);

  return touchEvent;
}
