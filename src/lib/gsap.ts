import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

/** Default GSAP tween variables for slide animations. */
export const SLIDE_VARS: gsap.TweenVars = { duration: 0.6, ease: 'power2.out' };
/** Default GSAP tween variables for initial scroll-reveal animations. */
export const SCROLL_IN_FROM_VARS: gsap.TweenVars = { y: '5vh', opacity: 0 };
/** Default GSAP tween variables for final scroll-reveal animations. */
export const SCROLL_IN_TO_VARS: gsap.TweenVars = { y: 0, opacity: 1 };

/**
 * Stores GSAP timelines by name.
 * @type {Map<string, gsap.core.Timeline>}
 */
const timelines = new Map<string, gsap.core.Timeline>();

/**
 * Registers a GSAP timeline with a given name.
 * @param {string} name - The name to register the timeline with.
 * @param {gsap.core.Timeline} timeline - The GSAP timeline instance.
 * @returns {void}
 */
export const registerTimeline = (name: string, timeline: gsap.core.Timeline): void => {
  timelines.set(name, timeline);
};

/**
 * Retrieves a GSAP timeline by its registered name.
 * @param {string} name - The name of the timeline to retrieve.
 * @returns {gsap.core.Timeline | undefined} The GSAP timeline instance, or undefined if not found.
 */
export const getTimeline = (name: string): gsap.core.Timeline | undefined => {
  return timelines.get(name);
};

/**
 * Animates a given HTML element to fade in when it enters the viewport.
 *
 * @param {HTMLElement | null | undefined} $el - The HTML element to animate.
 * @returns {void}
 */
export const toScrollIn = ($el: HTMLElement | null | undefined): void => {
  if (!$el) return;
  gsap.fromTo($el, SCROLL_IN_FROM_VARS, {
    ...SCROLL_IN_TO_VARS,
    scrollTrigger: {
      trigger: $el,
      start: 'top bottom-=10%',
      toggleActions: 'play none none reverse',
    },
  });
};

/**
 * Animates the children of a given HTML element to fade in as they enter the viewport.
 *
 * @param {HTMLElement | null | undefined} $el - The parent HTML element whose children
 * are to be animated. If null or undefined, the function exits early.
 * @param {string} [childrenSelector] - An optional CSS selector to filter the children to animate.
 * @returns {void}
 */
export const toChildrenScrollIn = (
  $el: HTMLElement | null | undefined,
  childrenSelector?: string,
): void => {
  if (!$el) return;

  const $children = childrenSelector ? $el.querySelectorAll(childrenSelector) : $el.children;

  gsap.fromTo($children, SCROLL_IN_FROM_VARS, {
    ...SCROLL_IN_TO_VARS,
    scrollTrigger: {
      trigger: $el,
      start: 'top bottom-=10%',
      toggleActions: 'play none none reverse',
    },
    stagger: 0.1,
  });
};

/**
 * Animates a given HTML element to fade in grayscale as it enters the viewport, and to fade out grayscale as it exits.
 *
 * @param {HTMLElement | null | undefined} $el - The HTML element to animate.
 * @returns {void}
 */
export const toScrollGrayscale = ($el: HTMLElement | null | undefined): void => {
  if (!$el) return;
  gsap
    .timeline({
      scrollTrigger: {
        trigger: $el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
    .fromTo(
      $el,
      { filter: 'grayscale(100%) brightness(75%)' },
      { filter: 'grayscale(0%) brightness(100%)', duration: 30 },
    )
    .to($el, { filter: 'grayscale(100%) brightness(75%)', duration: 30 }, '+=40');
};

/**
 * Registers GSAP plugins when the window object is available (client-side).
 * This ensures ScrollTrigger is only initialized in a browser environment.
 * @returns {void}
 */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
