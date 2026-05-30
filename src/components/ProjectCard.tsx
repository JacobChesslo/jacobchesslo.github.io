import type { Component, JSX } from 'solid-js';
import Link from './Link';

const ProjectCard: Component<{
  name: string;
  href: string;
  children: JSX.Element;
}> = (props) => {
  return (
    <div class="retro-card group hover:border-[#8b5cf6] transition-all duration-300 hover:-translate-y-1">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-[#8b5cf6] text-xl">*</span>
        <h3
          class="text-lg font-bold text-[#8b5cf6] uppercase tracking-wider"
          style="font-family: 'Syne', sans-serif;"
        >
          <Link href={props.href}>{props.name}</Link>
        </h3>
      </div>
      <p class="text-[#f0ece4]/80 text-sm" style="font-family: 'Outfit', sans-serif;">
        {props.children}
      </p>
    </div>
  );
};

export default ProjectCard;
