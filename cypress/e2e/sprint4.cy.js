/// <reference types='cypress' />

describe('search and sort', () => {
    before(() => {
        cy.intercept('/api/categories').as('categories');
        cy.intercept('/api/books').as('books');
        cy.visit('http://localhost:3000');
        cy.wait(['@categories', '@books']);
    });

    beforeEach(() => {
        cy.viewport(1440, 900);
    });

    describe('search', () => {
        it('caret color should be rgb(248, 54, 0)', () => {
            cy.get('[data-test-id=input-search]').focus().should('have.css', 'caret-color', 'rgb(248, 54, 0)');
        });

        it('placeholder value should be "Поиск книги или автора…"', () => {
            cy.get('[data-test-id=input-search]').invoke('attr', 'placeholder').should('contain', 'Поиск книги или автора…');
        });

        it('find book', () => {
            cy.get('[data-test-id=input-search]').type('грокаем аЛгОрИ').should('have.value', 'грокаем аЛгОрИ');
            cy.get('[data-test-id=card]').should('have.length', 1);
            cy.get('[data-test-id=highlight-matches]').should('have.text', 'Грокаем алгори');
            cy.get('[data-test-id=highlight-matches]').should('have.css', 'color', 'rgb(255, 82, 83)');
        });

        it('find books', () => {
            cy.get('[data-test-id=input-search]').clear().should('have.value', '');
            cy.get('[data-test-id=input-search]').type('сТрАтЕг').should('have.value', 'сТрАтЕг');
            cy.get('[data-test-id=card]').should('have.length', 2);
            cy.get('[data-test-id=highlight-matches]').each(item => {
                expect(item.text()).equal('стратег');
            });
            cy.get('[data-test-id=highlight-matches]').each(item => {
                expect(item).to.have.css('color', 'rgb(255, 82, 83)');
            });
            cy.get('[data-test-id=app]').screenshot('find-books');
        });

        it('search result not found', () => {
            cy.get('[data-test-id=input-search]').clear().should('have.value', '');
            cy.get('[data-test-id=input-search]').type('ggdsbsdbd').should('have.value', 'ggdsbsdbd');
            cy.get('[data-test-id=search-result-not-found]').should('have.text', 'По запросу ничего не найдено');
            cy.get('[data-test-id=app]').screenshot('search-result-not-found');
        });

        it('clearing search input', () => {
            cy.get('[data-test-id=input-search]').clear().should('have.value', '');
            cy.get('[data-test-id=card]').should('have.length', 138);
            cy.get('[data-test-id=app]').screenshot('clearing-search-input', { clip: { x: 0, y: 0, width: 1440, height: 900 }});
        });
    });

    describe('sort', () => {
        it('sort should be desc', () => {
            cy.get('[data-test-id=card]').first().should('include.text', 'Хочу и буду');
        });

        it('sort should be asc', () => {
            cy.get('[data-test-id=sort-rating-button]').should('include.text', 'По рейтингу').click();
            cy.get('[data-test-id=card]').last().should('include.text', 'Хочу и буду');
        });
    });

    describe('category change', () => {
        it('active category should be programming', () => {
            cy.get('[data-test-id=navigation-programming]').should('have.text', 'Программирование').click();
            cy.hash().should('match', /programming/);
            cy.get('[data-test-id=navigation-book-count-for-programming]').invoke('text').then(parseFloat).then(item => {
                cy.get('[data-test-id=card]').should('have.length', item);
            });
            cy.get('[data-test-id=app]').screenshot('active-category-programming');
        });

        it('active category should be design', () => {
            cy.get('[data-test-id=navigation-design]').should('have.text', 'Дизайн').click();
            cy.hash().should('match', /design/);
            cy.get('[data-test-id=navigation-book-count-for-design]').invoke('text').then(parseFloat).then(item => {
                cy.get('[data-test-id=card]').should('have.length', item);
            });
        });

        it('active category is empty', () => {
            cy.get('[data-test-id=navigation-other]').should('have.text', 'Другое').click();
            cy.get('[data-test-id=navigation-book-count-for-other]').invoke('text').then(parseFloat).should('eq', 0);
            cy.get('[data-test-id=empty-category]').should('be.visible').should('have.text', 'В этой категории книг ещё нет');
            cy.get('[data-test-id=app]').screenshot('empty-category');
        });
    });
});

describe('search on mobile', () => {
    before(() => {
        cy.intercept('/api/categories').as('categories');
        cy.intercept('/api/books').as('books');
        cy.visit('http://localhost:3000');
        cy.viewport(320, 600);
        cy.wait(['@categories', '@books']);
    });

    it('open/close input', () => {
        cy.get('[data-test-id=button-search-open]').click();
        cy.get('[data-test-id=input-search]').type('грокаем аЛгОрИт').should('have.value', 'грокаем аЛгОрИт');
        cy.get('[data-test-id=button-search-close]').click();
        cy.get('[data-test-id=input-search]').should('have.value', 'грокаем аЛгОрИт');
        cy.get('[data-test-id=card]').should('have.length', 1);
        cy.get('[data-test-id=highlight-matches]').should('have.text', 'Грокаем алгорит');
        cy.get('[data-test-id=highlight-matches]').should('have.css', 'color', 'rgb(255, 82, 83)');
        cy.get('[data-test-id=button-search-open]').click();
        cy.get('[data-test-id=input-search]').clear().should('have.value', '');
        cy.get('[data-test-id=card]').should('have.length', 138);
        cy.get('[data-test-id=input-search]').type('ggdsbsdbd').should('have.value', 'ggdsbsdbd');
        cy.get('[data-test-id=search-result-not-found]').should('have.text', 'По запросу ничего не найдено');
    });
});

describe('bread crumbs', () => {
    beforeEach(() => {
        cy.intercept('/api/categories').as('categories');
        cy.intercept('/api/books').as('books');
        cy.intercept('/api/books/127').as('bookId127');
        cy.intercept('/api/books/69').as('bookId69');
        cy.visit('http://localhost:3000');
        cy.wait(['@categories', '@books']);
    });

    describe('desktop', () => {
        beforeEach(() => {
            cy.viewport(1440, 900);
        });

        it('transfer from programming category to book page', () => {
            cy.get('[data-test-id=navigation-programming]').should('have.text', 'Программирование').click();
            cy.get('[data-test-id=card]').first().click();
            cy.wait('@bookId127');
            cy.hash().should('match', /programming\/127/);
            cy.get('[data-test-id=breadcrumbs-link]').should('have.text', 'Программирование');
            cy.get('[data-test-id=book-name]').invoke('text').then(bookName => {
                cy.get('[data-test-id=book-title]').should('have.text', bookName);
            });
            cy.get('[data-test-id=breadcrumbs-link]').click();
            cy.wait('@books');
            cy.hash().should('match', /programming/);
            cy.get('[data-test-id=navigation-book-count-for-programming]').invoke('text').then(parseFloat).then(item => {
                cy.get('[data-test-id=card]').should('have.length', item);
            });
        });

        it('transfer from all books category to book page', () => {
            cy.get('[data-test-id=navigation-books]').should('have.text', 'Все книги').click();
            cy.get('[data-test-id=card]').first().click();
            cy.wait('@bookId69');
            cy.hash().should('match', /all\/69/);
            cy.get('[data-test-id=breadcrumbs-link]').should('have.text', 'Все книги');
            cy.get('[data-test-id=book-name]').invoke('text').then(bookName => {
                cy.get('[data-test-id=book-title]').should('have.text', bookName);
            });
            cy.get('[data-test-id=breadcrumbs-link]').click();
            cy.wait('@books');
            cy.hash().should('match', /all/);
            cy.get('[data-test-id=card]').should('have.length', 138);
        });
    });

    describe('tablet', () => {
        beforeEach(() => {
            cy.viewport(768, 800);
        });

        it('transfer from programming category to book page', () => {
            cy.get('[data-test-id=button-burger]').should('be.exist').click();
            cy.get('[data-test-id=burger-programming]').should('have.text', 'Программирование').click();
            cy.get('[data-test-id=card]').first().click();
            cy.wait('@bookId127');
            cy.get('[data-test-id=breadcrumbs-link]').should('have.text', 'Программирование');
            cy.get('[data-test-id=book-name]').invoke('text').then(bookName => {
                cy.get('[data-test-id=book-title]').should('have.text', bookName);
            });
            cy.get('[data-test-id=breadcrumbs-link]').click();
            cy.wait('@books');
            cy.get('[data-test-id=button-burger]').should('be.exist').click().should('be.visible');
            cy.get('[data-test-id=burger-book-count-for-programming]').invoke('text').then(parseFloat).then(item => {
                cy.get('[data-test-id=card]').should('have.length', item);
            });
        });

        it('transfer from all books category to book page', () => {
            cy.get('[data-test-id=button-burger]').should('be.exist').click();
            cy.get('[data-test-id=burger-books]').should('have.text', 'Все книги').click();
            cy.get('[data-test-id=card]').first().click();
            cy.wait('@bookId69');
            cy.get('[data-test-id=breadcrumbs-link]').should('have.text', 'Все книги');
            cy.get('[data-test-id=book-name]').invoke('text').then(bookName => {
                cy.get('[data-test-id=book-title]').should('have.text', bookName);
            });
            cy.get('[data-test-id=breadcrumbs-link]').click();
            cy.wait('@books');
            cy.get('[data-test-id=button-burger]').should('be.exist').click().should('be.visible');
            cy.get('[data-test-id=card]').should('have.length', 138);
        });
    });
});
