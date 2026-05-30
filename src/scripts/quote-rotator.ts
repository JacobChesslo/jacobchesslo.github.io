interface IQuote {
  quote: string;
  author: string;
}

export function initQuoteRotator(quotes: IQuote[], initialIndex: number) {
  let currentIndex = initialIndex;

  function rotateQuote() {
    const contentEl = document.getElementById('quote-content');
    const textEl    = document.getElementById('quote-text');
    const authorEl  = document.getElementById('quote-author');
    if (!contentEl || !textEl || !authorEl) return;

    contentEl.style.opacity = '0';

    setTimeout(() => {
      let newIndex: number;
      do {
        newIndex = Math.floor(Math.random() * quotes.length);
      } while (newIndex === currentIndex && quotes.length > 1);

      currentIndex = newIndex;
      textEl.textContent  = quotes[currentIndex].quote;
      authorEl.textContent = '- ' + quotes[currentIndex].author;
      contentEl.style.opacity = '1';
    }, 500);
  }

  setInterval(rotateQuote, 7000);
}

// Measure every quote at actual render width, then lock the container
// to the tallest result so rotation never causes a layout shift.
export function lockQuoteHeight(quotes: IQuote[]) {
  const contentEl = document.getElementById('quote-content');
  const textEl    = document.getElementById('quote-text');
  const authorEl  = document.getElementById('quote-author');
  if (!contentEl || !textEl || !authorEl) return;

  const savedText   = textEl.textContent ?? '';
  const savedAuthor = authorEl.textContent ?? '';

  contentEl.style.visibility = 'hidden';
  let maxHeight = 0;

  for (const q of quotes) {
    textEl.textContent   = q.quote;
    authorEl.textContent = '- ' + q.author;
    maxHeight = Math.max(maxHeight, contentEl.offsetHeight);
  }

  textEl.textContent   = savedText;
  authorEl.textContent = savedAuthor;
  contentEl.style.visibility  = '';
  contentEl.style.minHeight   = maxHeight + 'px';
}
