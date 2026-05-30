import { createSignal, type Component, type JSX } from 'solid-js';

const Card: Component<{
  title: string;
  children?: JSX.Element;
}> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <div
      class="retro-card group hover:border-[#7c3aed] transition-colors duration-200 cursor-pointer select-none"
      onClick={() => setIsOpen(!isOpen())}
    >
      <div class="flex items-center justify-between gap-4">
        <h3
          class="text-base font-semibold text-[#f0ece4] group-hover:text-[#7c3aed] transition-colors duration-200"
          style="font-family: var(--font-mono);"
        >
          {props.title}
        </h3>
        {props?.children && (
          <span
            class="text-[#7c3aed] text-xs shrink-0 transition-transform duration-300"
            classList={{ 'rotate-180': isOpen() }}
          >
            ▼
          </span>
        )}
      </div>
      {props?.children && (
        <div
          style={{
            'max-height': isOpen() ? '400px' : '0px',
            opacity: isOpen() ? '1' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.35s ease-in-out, opacity 0.25s ease-in-out',
          }}
        >
          <div
            class="mt-3 pt-3 border-t border-[#7c3aed]/30 text-[#f0ece4]/80 text-sm leading-relaxed"
            style="font-family: 'Outfit', sans-serif;"
          >
            {props.children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
