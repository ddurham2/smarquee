import Smarquee from '../../src/smarquee';

test('element with id smarquee is selected in constructor', () => {
  document.body.innerHTML = `
  <div id="smarquee">Some title</div>
  `;

  const subject = new Smarquee();
  expect(subject.marqueeContainer.id).toBe('smarquee');
});

test('preselected element is set to marqueeContainer on init', () => {
  document.body.innerHTML = `
  <div id="smarquee2">a test title</div>
  `;

  const subject = new Smarquee({
    element: document.querySelector('#smarquee2')
  });

  expect(subject.marqueeContainer.id).toBe('smarquee2');
  expect(subject.marqueeContainer.innerHTML).toBe('a test title');
});

test('needsMarquee returns true when when scrollWidth is larger than displayed width', () => {
  document.body.innerHTML = `
  <h1 id="smarquee">This is a long test title that needs a marquee</h1>
  `;

  let subject = new Smarquee();
  jest.spyOn(subject.marqueeContainer, 'scrollWidth', 'get').mockReturnValue(100);
  jest.spyOn(subject.marqueeContainer, 'clientWidth', 'get').mockReturnValue(10);
  expect(subject.needsMarquee).toBe(true);
});

test('needsMarquee returns false when when scrollWidth is equal or less than displayed width', () => {
  document.body.innerHTML = `
  <h1 id="smarquee">This is a long test title that needs a marquee</h1>
  `;

  let subject = new Smarquee();
  jest.spyOn(subject.marqueeContainer, 'scrollWidth', 'get').mockReturnValue(10);
  jest.spyOn(subject.marqueeContainer, 'clientWidth', 'get').mockReturnValue(10);
  expect(subject.needsMarquee).toBe(false);
});

test('createScrollingContent adds duplicated content for scrolling', () => {
  document.body.innerHTML = `
  <h1 id="smarquee">This is a test title.</h1>
  `;

  let subject = new Smarquee();
  subject.createScrollTitle();
  expect(subject.marqueeContainer.innerHTML).toBe('This is a test title. <span data-smarquee-scroll-title="">This is a test title.</span>');
});

test('init adds scrolling content if needsMarquee is true', () => {
  document.body.innerHTML = `
  <h1 id="smarquee">This is a long test title that needs a marquee</h1>
  `;

  let subject = new Smarquee();
  jest.spyOn(subject.marqueeContainer, 'scrollWidth', 'get').mockReturnValue(100);
  jest.spyOn(subject.marqueeContainer, 'clientWidth', 'get').mockReturnValue(10);
  subject.init();
  expect(subject.marqueeContainer.innerHTML).toBe('This is a long test title that needs a marquee <span data-smarquee-scroll-title="">This is a long test title that needs a marquee</span>');
});