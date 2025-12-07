import type { Component, JSX } from 'solid-js';
import ExternalLink from './ExternalLink';

const ProjectCard: Component<{
  name: string;
  href: string;
  children: JSX.Element;
}> = (props) => {
  return (
    <div class="retro-card group hover:border-[#e94560] transition-all duration-300 hover:-translate-y-1">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-[#e94560] text-xl">*</span>
        <h3
          class="text-lg font-bold text-[#e94560] uppercase tracking-wider"
          style="font-family: 'Space Grotesk', sans-serif;"
        >
          <ExternalLink href={props.href} children={props.name} />
        </h3>
      </div>
      <p class="text-[#fef5e7]/80 text-sm" style="font-family: 'Outfit', sans-serif;">
        {props.children}
      </p>
    </div>
  );
};

export default ProjectCard;
