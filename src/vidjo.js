import objectAssign from 'object-assign';

/*
 * This file is part of the Vidjo.js package.
 *
 * (c) Patrick Kempff <patrickkempff@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export default class Vidjo {

  /**
   * @param element The element to display the video background in.
   * @param path    Path to the video eg /videos/ocean.mp4
   * @param options Options
   */
  constructor(element, path, options = {}) {
    this._element = element;
    this._path = path;

    // Merge the options with the default options.
    this._options = objectAssign({}, this.defaultOptions, options);

    /**
     * The reference to the video element,
     * will be created on demand.
     */
    this._video = null;

    /**
     * The reference to the wrapper div that will be
     * used to position the video element.
     */
    this._wrapper = null;

    /**
     * Build the needed dom structure. The video itself will only created
     * if needed.
     */
    this._build();

    // listen to important events, like resize and video can play.
    this._listen();
  }

    /**
     * Builds the video wrapper and adds the required styles.
     */
  _build() {

    // Create the wrapper which holds the video.
    this._wrapper = document.createElement('div');
    this._wrapper.className = this._options.className;

    // Set the needed styles.
    objectAssign(this._wrapper.style, {
      'width': '100%',
      'height': '100%',
      'position': 'relative',
      'overflow': 'hidden',
      'zIndex': -1,
      'backgroundColor': '#FF0000',
      'backgroundImage': 'url("' + this._options.poster + '")',
      'backgroundSize': 'cover',
      'backgroundPosition': 'center center'
    });

    this._buildVideoIfNeeded();
    this._element.appendChild(this._wrapper);
  }

  _buildVideoIfNeeded() {
    if (this._options.shouldEnableVideo() && this._video === null) {
      // Create the video element.
      this._video = document.createElement('video');

      // Set the needed styles.
      objectAssign(this._video.style, {
        'margin': 'auto',
        'position': 'absolute',
        'opacity': 0,
        'zIndex': -1,
        'backgroundColor': '#FF0000',
        'top': this._options.position.x,
        'left': this._options.position.y
      });

      const translate = 'translate(-' + this._options.position.x + ', -' + this._options.position.y + ')';

      this._video.style[this._transformProperty] = translate;
      this._video.loop = this._options.loop;
      this._video.muted = this._options.muted;
      this._video.autoplay = this._options.autoplay;

      // Add the different sources to the video.
      const source = document.createElement('source');

      source.type = 'video/mp4';
      source.src = this._path;

      // Append the created elements to the DOM
      // as child of the given element in options.
      this._video.appendChild(source);

      this._video.addEventListener('canplay', () => this._canplaythrough(), false);
      this._video.addEventListener('canplaythrough', () => this._canplaythrough(), false);

      this._wrapper.appendChild(this._video);
    }
  }

  _listen() {
    window.addEventListener('resize', () => this.resize(), false);
  }

  _canplaythrough() {
    this._video.style.opacity = 1;
    this.resize();
  }

  _playing() {
    this._video.style.opacity = 1;
    this.resize();
  }

  get defaultOptions() {
    return {
      'loop': true,
      'muted': true,
      'autoplay': true,
      'position': {x: '50%', y: '50%'},
      'poster': '',
      'className': 'vidjo-wrapper',
      'shouldEnableVideo': () => true
    };
  }

  get _transformProperty() {
    // Note that in some versions of IE9 it is critical that
    // msTransform appear in this list before MozTransform
    const properties = [
      'transform',
      'WebkitTransform',
      'msTransform',
      'MozTransform',
      'OTransform'
    ];
    let p;
    let element = document.createElement('div');

    while ((p = properties.shift())) {
      if (typeof element.style[p] !== 'undefined') {
        return p;
      }
    }
    return false;
  }

  resize() {
    this._buildVideoIfNeeded();

    if (!this._video) {
      return;
    }

    /**
     * Hide the video when it should not be enabled.
     * Eg when the browser resizes and reaches the breakpoint.
     *
     * depends on the setting set in options.shouldEnableVideo
     */
    this._video.style.display = this._options.shouldEnableVideo() ? '' : 'none';

    // Get a native video size
    const videoHeight = this._video.videoHeight;
    const videoWidth = this._video.videoWidth;

    // Get a wrapper size
    const bounds = this._wrapper.getBoundingClientRect();

    const wrapperHeight = bounds.height;
    const wrapperWidth = bounds.width;

    if (wrapperWidth / videoWidth > wrapperHeight / videoHeight) {
      this._video.style.width = (wrapperWidth + 2) + 'px';
      this._video.style.height = 'auto';
    } else {
      this._video.style.width = 'auto';
      this._video.style.height = (wrapperHeight + 2) + 'px';
    }
  }
}
