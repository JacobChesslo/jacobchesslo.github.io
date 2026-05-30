import type { Component, JSX } from 'solid-js';

const Link: Component<{
  href: string;
  class?: string;
  children: JSX.Element;
}> = (props) => {
  const isExternal = /^https?:\/\//.test(props.href);

  return (
    <a
      href={props.href}
      class={props.class}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      aria-label={
        isExternal && typeof props.children === 'string'
          ? `${props.children} (opens in new tab)`
          : undefined
      }
    >
      {props.children}
    </a>
  );
};

export default Link;
