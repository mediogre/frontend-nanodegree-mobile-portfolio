* index.html optimization
- style.css was inlined (most of styles seem to apply to above-the-fold content (which is most of this page))
- print.css was made non-render-blocking by add media query
- both google/analytics.js and js/perfmatters.js were marked as async in order to not block DOM construction and moved to the bottom of the document
- webfonts references were moved similarly to the bottom of the document to not render-block abofe-the-fold content (need to experiment with async webfont loader too).
- grunt-based building "pipeline" was created to cement everything:
  - huge pizzeria.jpg reference was replaced with reference for "thumbnail" version of it (100x75)
  - grunt-contrib-imagemin is used to resize the image
  - grunt-contrib-imagemin then optimizes the images by compressing them
  - html (with inlined css) is then minified with htmlmin
  - js is similarly minified with uglify
- the final result appears in a separate build directory (which is then ready to be served)
- the final result is pushed to mediogre.github.io (github pages for my account) and shows 95 mobile and 97 desktop PageSpeed score.

* pizza.html optimization
- resize pizzas improvements:
  On the first attempt querySelectorAll was removed from the loop and reading and writing DOM was separated (commit 9a420b68575c9c2b37cc7400c45dadcc0a0ed12f).
  However, after studing determineDx some more it turned out that there's no real need to read from DOM at all,
  and new width of each pizza container can be calculated just once and applied to all elements.
  This both simplifies the code and makes it faster, since the only thing that we do (in loop) is changing widths.
  More general (and hence slower) querySelector invocations have been replaced with more explicit getElementById and getElementsByClassName.
  Those are not strictly necessary since they are not called from inside the loop any longer, but since we are in optimizing mode...

- scrolling improvements:
  - instead of querying DOM for all .movers - we store them directly in an array (since we build them anyway)
  - instead of creating 200 or arbitry amount of them we attempt to create only those that will be visible on on user's screen,
    this cuts down the amount of Layout recalculation (if keeping the original .left updates) or Compositing/Layering (if using CSS3 transforms).
    That actually was the main barrier to consistent 60 fps apparently - just the sheer amount of things that change each frame.
  - updatePositions was "debounced" from onScroll based on this article http://www.html5rocks.com/en/tutorials/speed/animations/ and is actually
  called as animation callback which should make the animation smoother
  - "formula" for moving each pizza has been simplified and requires less calculations, all multiplications, sines and divisions are mostly precalculated,
  so the update loop is quite "tight".
  - changing .left position of each element was finally replaced with CSS3 transform - this minimizes Layouts Calculation and moves all the calculations
  to "GPU-side", which hopefully provides better fps for most recent devices.
  - on my 2 machines the average time to generate last 10 frames is ~0.15-0.2ms and timeline shows steady above 60 fps (dominated by Composite Layers in translate version or by Style updates in original .left = version).
  - I've also applied the same content minification, image resizing, css inlining (non-render blocking) as with index.html and integrated that into a separate grunt task.
  The Desktop version of pizza.html shows 98 score in PageSpeed.

Grunt pipeline itself is not really finished, it has lots of boilerplate code, however both index.html and pizza.html can be quite conveniently "built" 
by 'grunt index.html' and 'grunt pizza', which is what I used during development (building final pages into "build" directory served with local nginx).
The finaly pages have also been pushed to GitHub Pages (and used for PageSpeed Insights scoring that way):
- http://mediogre.github.io/index.html
- http://mediogre.github.io/views/pizza.html

