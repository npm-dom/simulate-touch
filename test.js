var test = require("tape");

require("./")(document.body);

test('listening touchstart event for mousedown', function (assert) {
  assert.plan(8);

  once(document.body, 'touchstart', function (event) {
    assert.equal(event.touches.length, 1);
    assert.equal(event.touches[0].clientX, event.clientX);
    assert.equal(event.touches[0].clientY, event.clientY);
    assert.equal(event.touches[0].pageX, event.pageX);
    assert.equal(event.touches[0].pageY, event.pageY);
    assert.equal(event.touches[0].screenX, event.screenX);
    assert.equal(event.touches[0].screenY, event.screenY);
    assert.ok(event);
  });

  fire(document.body, 'mousedown');
});

test('listening touchmove event for mousemove', function (assert) {
  assert.plan(1);

  once(document.body, 'touchmove', function (event) {
    assert.ok(event);
  });

  fire(document.body, 'mousemove');
});

test('listening touchend event for mouseup', function (assert) {
  assert.plan(1);

  once(document.body, 'touchend', function (event) {
    assert.ok(event);
  });

  fire(document.body, 'mouseup');
});

function once (element, event, callback) {
  element.addEventListener(event, function self (event) {
    element.removeEventListener(self);
    callback(event);
  }, false);
}

function fire (element, event) {
  var mousedownEvent = document.createEvent("MouseEvent");
  mousedownEvent.initMouseEvent(event, true, true, window, 0,
                                 0, 0, 0, 0,
                                 false, false, false, false,
                                 0, null);

  element.dispatchEvent(mousedownEvent);
}
