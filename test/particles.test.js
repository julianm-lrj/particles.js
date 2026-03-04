import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Stub HTMLCanvasElement.getContext so jsdom doesn't block canvas operations.
const canvasCtxMock = {
  fillRect: vi.fn(),
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  closePath: vi.fn(),
  arc: vi.fn(),
  rect: vi.fn(),
  fill: vi.fn(),
  stroke: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  strokeStyle: '',
  fillStyle: '',
  lineWidth: 1,
};

HTMLCanvasElement.prototype.getContext = vi.fn(() => canvasCtxMock);

// We import the source once; module state (pJSDom array) persists across tests.
import { particlesJS, pJSDom } from '../src/index.js';

beforeEach(() => {
  vi.clearAllMocks();
  // Clear the shared pJSDom array.
  pJSDom.length = 0;
  // Reset the DOM.
  document.body.innerHTML = '';
});

afterEach(() => {
  document.body.innerHTML = '';
  pJSDom.length = 0;
});

// Helper: create a named div and append to body.
function makeDiv(id) {
  const div = document.createElement('div');
  div.id = id;
  document.body.appendChild(div);
  return div;
}

describe('particlesJS', () => {
  it('creates a canvas element inside the target div', () => {
    makeDiv('particles-test');

    particlesJS('particles-test', {
      particles: { number: { value: 5 }, move: { enable: false } },
    });

    const canvas = document.querySelector('#particles-test > canvas.particles-js-canvas-el');
    expect(canvas).not.toBeNull();
    expect(canvas.tagName).toBe('CANVAS');
  });

  it('populates pJSDom when called', () => {
    makeDiv('particles-test2');

    particlesJS('particles-test2', {
      particles: { number: { value: 2 }, move: { enable: false } },
    });

    expect(pJSDom.length).toBe(1);
  });

  it('uses default id "particles-js" when no id is provided', () => {
    makeDiv('particles-js');

    // Call with config object only (no id string).
    particlesJS({ particles: { number: { value: 2 }, move: { enable: false } } });

    const canvas = document.querySelector('#particles-js > canvas.particles-js-canvas-el');
    expect(canvas).not.toBeNull();
  });

  it('replaces an existing canvas when called again on the same element', () => {
    makeDiv('particles-replace');

    particlesJS('particles-replace', {
      particles: { number: { value: 2 }, move: { enable: false } },
    });
    particlesJS('particles-replace', {
      particles: { number: { value: 2 }, move: { enable: false } },
    });

    const canvases = document.querySelectorAll(
      '#particles-replace > canvas.particles-js-canvas-el'
    );
    expect(canvases.length).toBe(1);
  });
});

describe('particlesJS.load', () => {
  it('calls particlesJS with parsed config and invokes callback', () => {
    makeDiv('particles-load');

    const config = {
      particles: { number: { value: 3 }, move: { enable: false } },
    };

    let storedHandler;
    const xhrMock = {
      open: vi.fn(),
      send: vi.fn(),
      set onreadystatechange(fn) { storedHandler = fn; },
      get onreadystatechange() { return storedHandler; },
      readyState: 4,
      status: 200,
    };

    const OrigXHR = globalThis.XMLHttpRequest;
    globalThis.XMLHttpRequest = function () { return xhrMock; };

    const callback = vi.fn();
    particlesJS.load('particles-load', '/particles.json', callback);

    // Simulate the server responding with JSON config.
    storedHandler({ currentTarget: { response: JSON.stringify(config) } });

    expect(callback).toHaveBeenCalledOnce();
    const canvas = document.querySelector('#particles-load > canvas.particles-js-canvas-el');
    expect(canvas).not.toBeNull();

    globalThis.XMLHttpRequest = OrigXHR;
  });

  it('does not crash when callback is omitted', () => {
    makeDiv('particles-load-nocb');

    const config = {
      particles: { number: { value: 2 }, move: { enable: false } },
    };

    let storedHandler;
    const xhrMock = {
      open: vi.fn(),
      send: vi.fn(),
      set onreadystatechange(fn) { storedHandler = fn; },
      get onreadystatechange() { return storedHandler; },
      readyState: 4,
      status: 200,
    };

    const OrigXHR = globalThis.XMLHttpRequest;
    globalThis.XMLHttpRequest = function () { return xhrMock; };

    expect(() => {
      particlesJS.load('particles-load-nocb', '/particles.json');
      storedHandler({ currentTarget: { response: JSON.stringify(config) } });
    }).not.toThrow();

    globalThis.XMLHttpRequest = OrigXHR;
  });
});

describe('module exports', () => {
  it('exports particlesJS as a function', () => {
    expect(typeof particlesJS).toBe('function');
  });

  it('exports pJSDom as an array', () => {
    expect(Array.isArray(pJSDom)).toBe(true);
  });

  it('attaches globals to window in browser environment', () => {
    expect(window.particlesJS).toBe(particlesJS);
    expect(window.pJSDom).toBe(pJSDom);
  });
});
