import type { Component, JSX } from 'solid-js';

const ExternalLink: Component<{
  href: string;
  class?: string;
  children: JSX.Element;
}> = (props) => {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      class={props.class}
      aria-label={
        typeof props.children === 'string' ? `${props.children} (opens in new tab)` : undefined
      }
    >
      {props.children}
    </a>
  );
};

export default ExternalLink;
