import type { Component, JSX } from 'solid-js';

const Grid: Component<{
  title: string;
  children?: JSX.Element;
}> = (props) => {
  return (
    <section class="mb-12">
      <div class="flex items-center gap-4 mb-6">
        <span class="text-[#7c3aed] text-2xl">*</span>
        <h2
          class="text-2xl font-bold text-[#7c3aed] uppercase tracking-widest"
          style="font-family: 'Syne', sans-serif;"
        >
          {props.title}
        </h2>
        <div class="flex-1 h-px bg-gradient-to-r from-[#7c3aed] to-transparent"></div>
      </div>

      <div class="grid gap-4 ml-8">{props.children}</div>
    </section>
  );
};

export default Grid;
