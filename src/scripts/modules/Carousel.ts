import Vue from 'vue';
import {Input} from 'hammerjs';
import {TweenMax, Power0} from 'gsap';

interface Input {
  direction: Direction;
}

enum Direction {
  TOP = 1,
  RIGHT,
  BOTTOM,
  LEFT,
}

export default class Carousel {
  constructor(selector: string) {
    this.createVue(selector);
  }

  createVue(selector: string) {
    new Vue({
      el: selector,
      data: () => ({
        currentIndex: 0,
        translateX: 0,
        marginLeft: 0,
      }),
      computed: {
        innerEl(): HTMLElement {
          const el = this.$el.querySelector<HTMLElement>('[data-vue-carousel="wrapper"]');
          if (!el) throw new Error('[data-vue-carousel="wrapper"] is not found.');
          return el;
        },
        slides(): HTMLElement[] {
          const els = Array.from(this.innerEl.children) as HTMLElement[];
          if (els.length === 0) throw new Error('At least slide are required .');
          return els;
        },
        paddingLeftOfCarousel(): number {
          const {paddingLeft} = getComputedStyle(this.$el);
          if (!paddingLeft) return 0;
          return Number(paddingLeft.replace(/[^0-9]/g, ''));
        },
        leftEdgeOfCarousel(): number {
          return this.$el.getBoundingClientRect().left + this.paddingLeftOfCarousel;
        },
      },
      mounted() {
        this.setTranslateX(this.getLeftEdgeOfTranslater());
      },
      methods: {
        setTranslateX(x: number) {
          this.translateX = x;
        },
        getLeftEdgeOfTranslater(): number {
          return this.innerEl.getBoundingClientRect().left - this.leftEdgeOfCarousel;
        },
        getSlideWidth(slide: HTMLElement): number {
          const slideInner = slide.firstChild as HTMLElement;
          return slideInner ? slideInner.getBoundingClientRect().width : 0;
        },
        getSlideHeight(slide: HTMLElement): number {
          const slideInner = slide.firstChild as HTMLElement;
          return slideInner ? slideInner.getBoundingClientRect().height : 0;
        },
        getLeftEdgeOfElement(element: HTMLElement): number {
          return element.getBoundingClientRect().left;
        },
        getDistanceToClosestSlide(): number {
          const initial = this.getLeftEdgeOfElement(this.slides[0]);
          return this.slides.slice(1, this.slides.length).reduce((closestX, slide) => {
            const x = this.getLeftEdgeOfElement(slide);
            return Math.abs(x) < Math.abs(closestX) ? x : closestX;
          }, initial);
        },
        updateCurrentIndex(direction: Direction) {
          switch (direction) {
            case Direction.LEFT:
              return --this.currentIndex;
            case Direction.RIGHT:
              return ++this.currentIndex;
            default:
              return this.currentIndex;
          }
        },
        panMoveHandler(input: typeof Input) {
          const {deltaX} = input;
          TweenMax.set(this.innerEl, {x: this.translateX + deltaX});
        },
        panEndHandler(input: typeof Input) {
          const {deltaX} = input;
          const purpose = this.translateX + deltaX;
          const closestEdge = this.getDistanceToClosestSlide();
          const translateX = purpose - closestEdge;
          TweenMax.fromTo(this.innerEl, 0.2, {x: purpose}, {x: translateX, ease: Power0.ease});
          this.setTranslateX(translateX);
        },
      },
    });
  }
}
