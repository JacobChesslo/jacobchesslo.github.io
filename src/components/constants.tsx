
export interface IQuote {
  quote: string;
  author: string;
}

export const QUOTES: IQuote[] = [
  {
    quote: "Physics is like sex: sure, it may give some practical results, but that's not why we do it.",
    author: "Richard P. Feynman",
  },
  {
    quote: "I was born not knowing and have had only a little time to change that here and there.",
    author: "Richard Feynman",
  },
  {
    quote: "If I have seen further it is by standing on the shoulders of Giants",
    author: "Isaac Newton",
  },
  {
    quote: "If I have seen further than others, it is because I am surrounded by dwarfs.",
    author: "Murray Gell-Mann",
  },
  {
    quote: "Remember to look up at the stars and not down at your feet.",
    author: "Stephen Hawking",
  },
  {
    quote: "Quiet people have the loudest minds.",
    author: "Stephen Hawking",
  },
  {
    quote: "Anyone who has never made a mistake has never tried anything new.",
    author: "Albert Einstein",
  },
  {
    quote: "To be is to be perceived.",
    author: "George Berkeley",
  },
  {
    quote: "I think, therefore I am.",
    author: "Rene Descartes",
  },
  {
    quote: "In science there is only physics; all the rest is stamp collecting.",
    author: "Ernest Rutherford",
  },
  {
    quote: "We are a way for the cosmos to know itself.",
    author: "Carl Sagan",
  },
  {
    quote: "Somewhere, something incredible is waiting to be known.",
    author: "Carl Sagan",
  },
  {
    quote: "The most exciting phrase to hear in science, the one that heralds new discoveries, is not 'Eureka!' but 'That's funny…'",
    author: "Issac Asimov",
  },
];

interface IHref {
  label: string;
  href: string;
}

export const NAVIGATIONS: IHref[] = [
  {label: "Home", href: "/"},
  {label: "Work", href: "/"},
  {label: "About", href: "/about"},
  {label: "Projects", href: "/projects"},
  {label: "Contact", href: "/contact"},
];

export const SOCIALS: IHref[] = [
  {label: "Github", href: "https://github.com/jacobchesslo"},
  {label: "LinkedIn", href: "https://linkedin.com/in/jacobchesslo"},
];

export const RESOURCES: IHref[] = [
  {label: "Curriculum Vitae", href: "/cv"},
  {label: "Source Code", href: "https://github.com/jacobchesslo/jacobchesslo.github.io"},
];
