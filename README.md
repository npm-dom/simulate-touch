## simulate-touch

Fire touch events when corresponding mouse events fire.

* mousedown -> touchstart
* mousemove -> touchmove
* mouseup -> touchend

## Install

```bash
$ npm install simulate-touch
```

## Usage

```js
var simulateTouch = require('simulate-touch')

simulateTouch(document.body)

document.body.addEventListener('touchstart', function () {
  console.log('touch start')
})

document.body.dispatchEvent([mousedown event])
// touch started
```

See `test.js` for more info.
