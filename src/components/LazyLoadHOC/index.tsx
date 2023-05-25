/**
 * img lazy load component
 */

import React, { FC, useEffect } from "react";

let timer: any = null;
let observer: MutationObserver;
let mutationConfig = { attributes: true, childList: true, subtree: true };
let targetNode: Node;

/**
 * determine whether element is visible
 * @param  {HTMLImageElement}  ele
 * @return {Boolean}
 */
function isView(ele: HTMLImageElement) {
  const { innerHeight, innerWidth } = window;
  const ract = ele.getBoundingClientRect();
  const { top, left } = ract;
  return left < innerWidth * 2 && top > 0 - 200 && top < innerHeight;
}
// lazy load handle
function lazyLoad(): void {
  if (timer) {
    clearTimeout(timer);
  }
  // throttle
  timer = setTimeout(() => {
    const imgs: NodeListOf<Element> = document.querySelectorAll("[data-lazy]");
    if (imgs.length === 0) {
      return;
    }
    Array.from(imgs as any, (item: HTMLImageElement) => {
      let lazyURL = item.dataset.lazy || "";
      let tagName = item.tagName.toLowerCase();
      let visible = isView(item);
      if (visible && tagName === "img" && lazyURL !== item.src && lazyURL) {
        item.src = lazyURL;
        item.removeAttribute("data-lazy");
      }
      return true;
    });
  }, 150);
}

interface OptionsProps {
  target?: string;
}

const LazyLoadHOC = (options: OptionsProps = {}) => {
  return (OriginComponent: FC): FC => {
    const WrappedComponent: FC = (): JSX.Element => {
      useEffect(() => {
        let { target } = options;
        if (!target) {
          targetNode = document.body;
        } else {
          targetNode = document.getElementById(target) as Node;
        }
        // page attribute changed invoke lazy load
        observer = new window.MutationObserver(lazyLoad);
        observer.observe(targetNode, mutationConfig);
        // page scroll invoke lazy load
        window.addEventListener("scroll", lazyLoad, false);
        // component unmount clear timer
        // remove listener
        return (): void => {
          if (timer) {
            clearTimeout(timer);
          }
          window.removeEventListener("scroll", lazyLoad);
        };
      }, []);
      return <OriginComponent />;
    };
    return WrappedComponent;
  };
};

export default LazyLoadHOC;
