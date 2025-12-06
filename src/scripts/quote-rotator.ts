interface IQuote {
  quote: string;
  author: string;
}

export function initQuoteRotator(quotes: IQuote[], initialIndex: number) {
  let currentIndex = initialIndex;

  function rotateQuote() {
    const contentEl = document.getElementById('quote-content');
    const textEl = document.getElementById('quote-text');
    const authorEl = document.getElementById('quote-author');

    if (!contentEl || !textEl || !authorEl) return;

    const startHeight = contentEl.offsetHeight;

    contentEl.style.opacity = '0';

    setTimeout(() => {
      let newIndex: number;
      do {
        newIndex = Math.floor(Math.random() * quotes.length);
      } while (newIndex === currentIndex && quotes.length > 1);

      currentIndex = newIndex;
      const newQuote = quotes[currentIndex];

      textEl.textContent = newQuote.quote;
      authorEl.textContent = '— ' + newQuote.author;

      const endHeight = contentEl.offsetHeight;

      contentEl.style.height = startHeight + 'px';
      contentEl.style.overflow = 'hidden';

      contentEl.offsetHeight;

      contentEl.style.height = endHeight + 'px';

      setTimeout(() => {
        contentEl.style.height = 'auto';
        contentEl.style.overflow = '';
        contentEl.style.opacity = '1';
      }, 400);
    }, 500);
  }

  setInterval(rotateQuote, 7000);
}
