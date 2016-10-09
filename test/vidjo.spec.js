import {expect} from 'chai';
import sinon from 'sinon';
import Vidjo from '../src/vidjo.js';

const jsdom = require('jsdom').jsdom;

describe('Vidjo', () => {
  /**
   * Reset the dom every test to make sure we dont mix results
   * of previous tests.
   */
  beforeEach(function(){
    global.document = jsdom('<body></body>');
    global.window = document.defaultView;
  })

  it('should create an video element within a .vidjo-wrapper element', () => {
    const lib = new Vidjo(document.body, 'videos/example.mp4');
    
    const wrapper = document.body.querySelector('.vidjo-wrapper');
    expect(wrapper.nodeName).to.be.equal("DIV");

    const video = wrapper.querySelector('video'); 
    expect(video.nodeName).to.be.equal("VIDEO");
  }); 

  it("should create the source element according to the given options", () => {
    const lib = new Vidjo(document.body, 'videos/example.mp4');

    const video = document.body.querySelector(".vidjo-wrapper video");
    const sources = video.querySelectorAll("source");

    expect(sources.length).to.be.equal(1); 
  }); 

  it("should create source of the mimetypes according to the given options", () => {
    const lib = new Vidjo(document.body, 'videos/example.mp4'); 

    const video = document.body.querySelector(".vidjo-wrapper video");
    const sources = video.querySelectorAll("source");

    for(let i = 0; i < sources.length; i++) {
      const source = sources[i]; 

      expect(source.getAttribute("type")).to.be.equal("video/mp4");
    }      
  });

  it("should create source of the video paths according to the given options", () => {
    const lib = new Vidjo(document.body, 'videos/example.mp4'); 

    const video = document.body.querySelector(".vidjo-wrapper video");
    const sources = video.querySelectorAll("source");

    for(let i = 0; i < sources.length; i++) {
      const source = sources[i]; 

      expect(source.getAttribute("src")).to.be.equal("videos/example.mp4");
    } 
  });

  it("should add `test/resources/poster.jpg` as the video poster", () => { 
    const lib = new Vidjo(document.body, 'videos/example.mp4', {poster: 'test/resources/poster.jpg'});

    const wrapper = document.body.querySelector(".vidjo-wrapper");
    const backgroundImage = wrapper.style.backgroundImage;

    expect(backgroundImage).to.be.equal('url(test/resources/poster.jpg)');
  }); 

  it("should respect the window.resize() event", () => { 
    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.height = '100%';
    document.body.appendChild(container);

    const lib = new Vidjo(container, 'videos/example.mp4');
    const wrapper = container.querySelector(".vidjo-wrapper");
    
    const videoWidth = lib._video.videoWidth;
    const videoHeight = lib._video.videoHeight;
    const wrapperWidth = wrapper.getBoundingClientRect().width;
    const wrapperHeight = wrapper.getBoundingClientRect().height;

    lib._video.style.width = '350px';
    lib._video.style.height = '350px';

    lib.resize();

    if (wrapperWidth / videoWidth > wrapperHeight / videoHeight) {
      expect(lib._video.style.width).to.be.equal(wrapperWidth + 2 + 'px');
      expect(lib._video.style.height).to.be.equal('auto');
    } else {
      expect(lib._video.style.width).to.be.equal('auto');
      expect(lib._video.style.height).to.be.equal(wrapperHeight + 2 + 'px');
    }
  });   
});