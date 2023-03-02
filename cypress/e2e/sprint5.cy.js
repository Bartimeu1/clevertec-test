/// <reference types='cypress' />

describe('authorization and registartion', () => {
    beforeEach(() => {
        cy.viewport(1024, 768);
    });

    describe('authorization', () => {
        beforeEach(() => {
            cy.intercept('/api/categories').as('categories');
            cy.intercept('/api/books').as('books');
            cy.intercept('/api/auth/local').as('authorize');
            cy.visit('http://localhost:3000');
        });
        it('check first loaded page', () => {
            cy.url().should('contain', '/auth');
            cy.contains('Забыли логин или пароль?', { matchCase: false }).click();
            cy.url().should('contain', '/forgot-pass');
            cy.go('back');
            cy.url().should('contain', '/auth');
            cy.visit('http://localhost:3000/#/books/all');
            cy.url().should('contain', '/auth');
            cy.get('[data-test-id=auth]').screenshot('first enter');
        });
        it('success authorization', () => {
            cy.viewport(360, 600);
            let token;
            cy.get('[data-test-id=auth-form] input[name=identifier]').type('TestUser1');
            cy.get('[data-test-id=eye-closed]').should('not.be.exist');
            cy.get('[data-test-id=auth-form] input[name=password]').type('Qwerty123');
            cy.get('[data-test-id=auth]').screenshot('password hidden');
            cy.get('[data-test-id=eye-closed]').should('be.exist').click();
            cy.get('[data-test-id=auth]').screenshot('password shown');
            cy.get('[data-test-id=eye-closed]').should('not.be.exist');
            cy.get('[data-test-id=eye-opened]').should('be.exist');
            cy.get('[data-test-id=auth-form]')
                .contains('вход', { matchCase: false })
                .should('be.enabled')
                .click();
            cy.get('[data-test-id=auth]').screenshot('loader authorization');
            cy.get('[data-test-id=loader]').should('be.exist');
            cy.wait('@authorize').should(({ request, response }) => {
                token = response.body.jwt;
                assert.deepEqual(request.body, { identifier: 'TestUser1', password: 'Qwerty123' });
            });
            cy.url().should('contain', '/books');
            cy.get('[data-test-id=loader]').should('be.exist');
            cy.wait('@categories').should(({ request }) => {
                expect(request.headers, 'request headers').to.include({
                    authorization: `Bearer ${token}`,
                });
            });
            cy.wait('@books').should(({ request }) => {
                expect(request.headers, 'request headers').to.include({
                    authorization: `Bearer ${token}`,
                });
            });
            cy.get('[data-test-id=button-burger]').click();
            cy.get('[data-test-id=exit-button]').scrollIntoView().click();
            cy.url().should('contain', '/auth');
        });
        it('redirect authorization', () => {
            cy.get('[data-test-id=auth-form] input[name=identifier]').type('TestUser1');
            cy.get('[data-test-id=auth-form] input[name=password]').type('Qwerty123');
            cy.get('button').contains('вход', { matchCase: false }).should('be.enabled').click();
            cy.wait('@authorize');  
            cy.visit('http://localhost:3000/#/auth');
            cy.url().should('contain', '/books/all');
            cy.visit('http://localhost:3000/#/registration');
            cy.url().should('contain', '/books/all');
            cy.visit('http://localhost:3000/#/forgot-pass');
            cy.url().should('contain', '/books/all');
        });
        it('server error authorization', () => {
            cy.intercept('/api/auth/local', {
                delay: 1000,
                statusCode: 500,
            }).as('authorizeError');
            cy.get('[data-test-id=auth-form] input[name=identifier]').type('TestUser1');
            cy.get('[data-test-id=auth-form] input[name=password]').type('Qwerty123');
            cy.get('button').contains('вход', { matchCase: false }).should('be.enabled').click();
            cy.get('[data-test-id=loader]').should('be.exist');
            cy.wait('@authorizeError');
            cy.get('[data-test-id=status-block]:contains("Вход не выполнен")').should('be.visible');
            cy.get('[data-test-id=auth]').screenshot('server error authorization');
        });
        it('incorrect login or password error', () => {
            cy.intercept('/api/auth/local', {
                delay: 1000,
                statusCode: 400,
            }).as('incorrectLoginOrPasswordError');
            cy.get('[data-test-id=auth-form] input[name=identifier]').type('TestUser1');
            cy.get('[data-test-id=auth-form] input[name=password]').type('Qwerty123');
            cy.get('button').contains('вход', { matchCase: false }).should('be.enabled').click();
            cy.get('[data-test-id=loader]').should('be.exist');
            cy.wait('@incorrectLoginOrPasswordError');
            cy.get('[data-test-id=hint]:contains("Неверный логин или пароль!")')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=auth]').screenshot('incorrect logit or password error');
        });
        it('validation', () => {
            cy.get('[data-test-id=auth-form] input[name=identifier]').focus();
            cy.get('[data-test-id=auth-form] input[name=identifier]').blur();
            cy.get('[data-test-id=hint]:contains("Поле не может быть пустым")')
                .should('be.visible')
                .should('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=auth-form] input[name=password]').focus();
            cy.get('[data-test-id=auth-form] input[name=password]').blur();
            cy.get('[data-test-id=hint]:contains("Поле не может быть пустым")').should(
                'have.length',
                2,
            );
            cy.get('[data-test-id=auth-form] input[name=identifier]').type('TestUser1');
            cy.get('[data-test-id=hint]:contains("Поле не может быть пустым")').should(
                'have.length',
                1,
            );
            cy.get('[data-test-id=auth-form] input[name=password]').type('Qwerty123');
            cy.get('[data-test-id=hint]:contains("Поле не может быть пустым")').should('not.exist');
        });
    });
    describe('registration', () => {
        beforeEach(() => {
            cy.visit('http://localhost:3000');
        });
        it('enter to registartion page', () => {
            cy.url().should('contain', '/auth');
            cy.contains('регистрация', { matchCase: false }).click();
            cy.url().should('contain', '/registration');
            cy.get('[data-test-id=auth]').screenshot('registration page');
        });
        it('success registartion', () => {
            cy.intercept('/api/auth/local/register', {
                delay: 1000,
                statusCode: 200,
            }).as('successRegistration');
            cy.url().should('contain', '/auth');
            cy.contains('регистрация', { matchCase: false }).click();
            cy.url().should('contain', '/registration');
            cy.get('[data-test-id=register-form] input[name=username]').type('Test1');
            cy.get('[data-test-id=register-form] input[name=password]').type('Qwerty12');
            cy.get('[data-test-id=auth]').screenshot('registration-first-step');
            cy.contains('следующий шаг', { matchCase: false }).should('be.enabled').click();
            cy.get('[data-test-id=register-form] input[name=firstName]').type('firstName');
            cy.get('[data-test-id=register-form] input[name=lastName]').type('lastName');
            cy.get('[data-test-id=auth]').screenshot('registration-second-step');
            cy.contains('последний шаг', { matchCase: false }).should('be.enabled').click();
            cy.get('[data-test-id=register-form] input[name=phone]').type('441234567');
            cy.get('[data-test-id=register-form] input[name=email]').type('test@gmail.com');
            cy.get('[data-test-id=auth]').screenshot('registration-third-step');
            cy.contains('зарегистрироваться', { matchCase: false }).should('be.enabled').click();
            cy.get('[data-test-id=loader]').should('be.exist');
            cy.wait('@successRegistration');
            cy.get('[data-test-id=status-block]:contains("Регистрация успешна")').should(
                'be.visible',
            );
            cy.get('[data-test-id=auth]').screenshot('registration-success');
            cy.get('button').contains('вход', { matchCase: false }).click();
            cy.url().should('contain', '/auth');
        });
        it('already used error registartion', () => {
            cy.intercept('/api/auth/local/register', {
                delay: 1000,
                statusCode: 400,
            }).as('failedRegistration');
            cy.url().should('contain', '/auth');
            cy.contains('регистрация', { matchCase: false }).click();
            cy.url().should('contain', '/registration');
            cy.get('[data-test-id=register-form] input[name=username]').type('Test1');
            cy.get('[data-test-id=register-form] input[name=password]').type('Qwerty12');
            cy.contains('следующий шаг', { matchCase: false }).should('be.enabled').click();
            cy.get('[data-test-id=register-form] input[name=firstName]').type('firstName');
            cy.get('[data-test-id=register-form] input[name=lastName]').type('lastName');
            cy.contains('последний шаг', { matchCase: false }).should('be.enabled').click();
            cy.get('[data-test-id=register-form] input[name=phone]').type('441234567');
            cy.get('[data-test-id=register-form] input[name=email]').type('test@gmail.com');
            cy.contains('зарегистрироваться', { matchCase: false }).should('be.enabled').click();
            cy.get('[data-test-id=loader]').should('be.exist');
            cy.wait('@failedRegistration');
            cy.get(
                '[data-test-id=status-block]:contains("Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail")',
            ).should('be.visible');
            cy.get('[data-test-id=auth]').screenshot('registration already used error');
            cy.contains('назад к регистрации', { matchCase: false }).click();
            cy.url().should('contain', '/registration');
        });
        it('error registartion', () => {
            cy.intercept('/api/auth/local/register', {
                delay: 1000,
                statusCode: 500,
                body: {
                    data: null,
                    error: {
                        status: 500,
                        name: 'ApplicationError',
                        message: 'error',
                        details: {},
                    },
                },
            }).as('failedRegistration');
            cy.url().should('contain', '/auth');
            cy.contains('регистрация', { matchCase: false }).click();
            cy.url().should('contain', '/registration');
            cy.get('[data-test-id=register-form] input[name=username]').type('Test1');
            cy.get('[data-test-id=register-form] input[name=password]').type('Qwerty12');
            cy.contains('следующий шаг', { matchCase: false }).should('be.enabled').click();
            cy.get('[data-test-id=register-form] input[name=firstName]').type('firstName');
            cy.get('[data-test-id=register-form] input[name=lastName]').type('lastName');
            cy.contains('последний шаг', { matchCase: false }).should('be.enabled').click();
            cy.get('[data-test-id=register-form] input[name=phone]').type('441234567');
            cy.get('[data-test-id=register-form] input[name=email]').type('test@gmail.com');
            cy.contains('зарегистрироваться', { matchCase: false }).should('be.enabled').click();
            cy.get('[data-test-id=loader]').should('be.exist');
            cy.wait('@failedRegistration');
            cy.get(
                '[data-test-id=status-block]:contains("Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз")',
            ).should('be.visible');
            cy.get('[data-test-id=auth]').screenshot('registration error');
            cy.contains('повторить', { matchCase: false }).click();
            cy.url().should('contain', '/registration');
        });
        it('validation first step', () => {
            //login
            cy.url().should('contain', '/auth');
            cy.contains('регистрация', { matchCase: false }).click();
            cy.url().should('contain', '/registration');
            cy.get('[data-test-id=checkmark]').should('not.be.exist');
            cy.get('[data-test-id=register-form] input[name=username]').focus();
            cy.get('[data-test-id=register-form] input[name=username]').blur();
            cy.get('[data-test-id=hint]:contains("Поле не может быть пустым")')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=register-form] input[name=username]').type('й');
            cy.get('[data-test-id=hint] span:contains("латинский алфавит")')
                .get('[data-test-id=hint] span:contains("цифры")')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=register-form] input[name=username]').type('1');
            cy.get('[data-test-id=hint] span:contains("цифры")')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(167, 167, 167)');
            cy.get('[data-test-id=register-form] input[name=username]').blur();
            cy.contains('следующий шаг', { matchCase: false }).should('be.disabled');
            cy.get(
                '[data-test-id=hint]:contains("Используйте для логина латинский алфавит и цифры")',
            )
                .should('be.visible')
                .and('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=register-form] input[name=username]').type('{backspace}');
            cy.get('[data-test-id=hint] span:contains("латинский алфавит")')
                .get('[data-test-id=hint] span:contains("цифры")')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=register-form] input[name=username]').type('{backspace}');
            cy.get(
                '[data-test-id=hint]:contains("Используйте для логина латинский алфавит и цифры")',
            )
                .should('be.visible')
                .and('have.css', 'color', 'rgb(167, 167, 167)');
            cy.get('[data-test-id=register-form] input[name=username]').type('TestUser1');
            cy.get(
                '[data-test-id=hint]:contains("Используйте для логина латинский алфавит и цифры")',
            )
                .should('be.visible')
                .and('have.css', 'color', 'rgb(167, 167, 167)');
            //password
            cy.get('[data-test-id=register-form] input[name=password]').focus();
            cy.get('[data-test-id=register-form] input[name=password]').blur();
            cy.contains('следующий шаг', { matchCase: false }).should('be.disabled');
            cy.get('[data-test-id=hint]:contains("Поле не может быть пустым")')
                .should('be.visible')
                .should('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=register-form] input[name=password]').type('q');
            cy.get('[data-test-id=hint] span:contains("не менее 8 символов")')
                .get('[data-test-id=hint] span:contains("заглавной буквой")')
                .get('[data-test-id=hint] span:contains("цифрой")')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=register-form] input[name=password]').type('{backspace}');
            cy.get(
                '[data-test-id=hint]:contains("Используйте для логина латинский алфавит и цифры")',
            )
                .should('be.visible')
                .and('have.css', 'color', 'rgb(167, 167, 167)');
            cy.get('[data-test-id=register-form] input[name=password]').type('Q');
            cy.get('[data-test-id=hint] span:contains("не менее 8 символов")')
                .get('[data-test-id=hint] span:contains("цифрой")')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=hint] span:contains("заглавной буквой")')
                .should('be.visible')
                .should('have.css', 'color', 'rgb(167, 167, 167)');
            cy.get('[data-test-id=register-form] input[name=password]').type('werty1');
            cy.get('[data-test-id=hint] span:contains("не менее 8 символов")')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=hint] span:contains("заглавной буквой")')
                .get('[data-test-id=hint] span:contains("цифрой")')
                .should('be.visible')
                .should('have.css', 'color', 'rgb(167, 167, 167)');
            cy.get('[data-test-id=register-form] input[name=password]').type('2');
            cy.get(
                '[data-test-id=hint]:contains("Пароль не менее 8 символов, с заглавной буквой и цифрой")',
            )
                .should('be.visible')
                .and('have.css', 'color', 'rgb(167, 167, 167)');
            cy.get('[data-test-id=checkmark]').should('be.exist');
            cy.get('[data-test-id=register-form] input[name=password]').blur();
            cy.contains('следующий шаг', { matchCase: false }).should('be.enabled').click();
        });
        it('validation second step', () => {
            cy.url().should('contain', '/auth');
            cy.contains('регистрация', { matchCase: false }).click();
            cy.url().should('contain', '/registration');
            cy.get('[data-test-id=register-form] input[name=username]').type('Test1');
            cy.get('[data-test-id=register-form] input[name=password]').type('Qwerty12');
            cy.contains('следующий шаг', { matchCase: false }).should('be.enabled').click();
            cy.get('[data-test-id=register-form] input[name=firstName]').focus();
            cy.get('[data-test-id=register-form] input[name=firstName]').blur();
            cy.get('[data-test-id=hint]:contains("Поле не может быть пустым")')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(244, 44, 79)');
            cy.contains('последний шаг', { matchCase: false }).should('be.disabled');
            cy.get('[data-test-id=register-form] input[name=firstName]').type('firstName');
            cy.get('[data-test-id=hint]:contains("Поле не может быть пустым")').should(
                'not.be.exist',
            );
            cy.get('[data-test-id=register-form] input[name=lastName]').focus();
            cy.get('[data-test-id=register-form] input[name=lastName]').blur();
            cy.get('[data-test-id=hint]:contains("Поле не может быть пустым")')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=register-form] input[name=lastName]').type('lastName');
            cy.get('[data-test-id=hint]:contains("Поле не может быть пустым")').should(
                'not.be.exist',
            );
            cy.contains('последний шаг', { matchCase: false }).should('be.enabled').click();
        });
        it('validation third step', () => {
            cy.url().should('contain', '/auth');
            cy.contains('регистрация', { matchCase: false }).click();
            cy.url().should('contain', '/registration');
            cy.get('[data-test-id=register-form] input[name=username]').type('Test1');
            cy.get('[data-test-id=register-form] input[name=password]').type('Qwerty12');
            cy.contains('следующий шаг', { matchCase: false }).should('be.enabled').click();
            cy.get('[data-test-id=register-form] input[name=firstName]').type('firstName');
            cy.get('[data-test-id=register-form] input[name=lastName]').type('lastName');
            cy.contains('последний шаг', { matchCase: false }).should('be.enabled').click();
            cy.get('[data-test-id=register-form] input[name=phone]').focus();
            cy.get('[data-test-id=register-form] input[name=phone]').blur();
            cy.get('[data-test-id=hint]:contains("Поле не может быть пустым")')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(244, 44, 79)');
            cy.contains('зарегистрироваться', { matchCase: false }).should('be.disabled');
            cy.get('[data-test-id=register-form] input[name=phone]').type('44');
            cy.get('[data-test-id=register-form] input[name=phone]').should(
                'have.value',
                '+375 (44) xxx-xx-xx',
            );
            cy.get('[data-test-id=register-form] input[name=phone]').blur();
            cy.get('[data-test-id=hint]:contains("В формате +375 (xx) xxx-xx-xx")')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=register-form] input[name=phone]').type('ма Ю><.!kjm|-+*jhQ');
            cy.get('[data-test-id=register-form] input[name=phone]').should(
                'have.value',
                '+375 (44) xxx-xx-xx',
            );
            cy.get('[data-test-id=register-form] input[name=phone]').blur();
            cy.get('[data-test-id=hint]:contains("В формате +375 (xx) xxx-xx-xx")')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=register-form] input[name=phone]').clear().type('440000000');
            cy.get('[data-test-id=register-form] input[name=phone]').should(
                'have.value',
                '+375 (44) 000-00-00',
            );
            cy.get('[data-test-id=hint]:contains("В формате +375 (xx) xxx-xx-xx")').should(
                'have.css',
                'color',
                'rgb(167, 167, 167)',
            );
            cy.get('[data-test-id=register-form] input[name=phone]').type('0000000');
            cy.get('[data-test-id=register-form] input[name=phone]').should(
                'have.value',
                '+375 (44) 000-00-00',
            );
            cy.get('[data-test-id=hint]:contains("В формате +375 (xx) xxx-xx-xx")').should(
                'have.css',
                'color',
                'rgb(167, 167, 167)',
            );
            cy.get('[data-test-id=register-form] input[name=email]').focus();
            cy.get('[data-test-id=register-form] input[name=email]').blur();
            cy.get('[data-test-id=hint]:contains("Поле не может быть пустым")')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(244, 44, 79)');
            cy.contains('зарегистрироваться', { matchCase: false }).should('be.disabled');
            cy.get('[data-test-id=register-form] input[name=email]').type('йцс');
            cy.get('[data-test-id=register-form] input[name=email]').blur();
            cy.get('[data-test-id=hint]:contains("Введите корректный e-mail")')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=register-form] input[name=email]').type('testgmail.co,');
            cy.get('[data-test-id=register-form] input[name=email]').blur();
            cy.get('[data-test-id=hint]:contains("Введите корректный e-mail")')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=register-form] input[name=email]').clear().type('test@gmail.com');
            cy.get('[data-test-id=register-form] input[name=email]').blur();
            cy.contains('зарегистрироваться', { matchCase: false }).should('be.enabled');
        });
    });
    describe('password recovery', () => {
        beforeEach(() => {
            cy.visit('http://localhost:3000');
        });
        it('go to recovery page', () => {
            cy.url().should('contain', '/auth');
            cy.contains('забыли логин или пароль', { matchCase: false }).click();
            cy.url().should('contain', '/forgot-pass');
            cy.get('[data-test-id=auth]').screenshot('recovery page');
        });
        it('success forgot password', () => {
            cy.visit('http://localhost:3000/#/forgot-pass');
            cy.intercept('/api/auth/forgot-password', {
                delay: 1000,
                statusCode: 200,
            }).as('successSendEmail');
            cy.get('[data-test-id=send-email-form] input[name=email]').type('test@gmail.com');
            cy.contains('восстановить', { matchCase: false }).should('be.enabled').click();
            cy.get('[data-test-id=loader]').should('be.exist');
            cy.wait('@successSendEmail');
            cy.get('[data-test-id=status-block]:contains("Письмо выслано")').should('be.visible');
            cy.get('[data-test-id=auth]').screenshot('send email success');
        });
        it('error forgot password', () => {
            cy.visit('http://localhost:3000/#/forgot-pass');
            cy.intercept('/api/auth/forgot-password', {
                delay: 1000,
                statusCode: 500,
                body: {
                    data: null,
                    error: {
                        status: 500,
                        name: 'ApplicationError',
                        message: 'error',
                        details: {},
                    },
                },
            }).as('errorSendEmail');
            cy.get('[data-test-id=send-email-form] input[name=email]').type('test@gmail.com');
            cy.contains('восстановить', { matchCase: false }).should('be.enabled').click();
            cy.get('[data-test-id=loader]').should('be.exist');
            cy.wait('@errorSendEmail');
            cy.get('[data-test-id=hint]:contains("error")')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=auth]').screenshot('send email error');
        });
        it('forgot password validation', () => {
            cy.visit('http://localhost:3000/#/forgot-pass');
            cy.get('[data-test-id=send-email-form] input[name=email]').focus();
            cy.get('[data-test-id=send-email-form] input[name=email]').blur();
            cy.get('[data-test-id=hint]:contains("Поле не может быть пустым")')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=send-email-form] input[name=email]').type('йцс');
            cy.get('[data-test-id=send-email-form] input[name=email]').blur();
            cy.get('[data-test-id=hint]:contains("Введите корректный e-mail")')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=send-email-form] input[name=email]').type('testgmail.co,');
            cy.get('[data-test-id=send-email-form] input[name=email]').blur();
            cy.get('[data-test-id=hint]:contains("Введите корректный e-mail")')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=send-email-form] input[name=email]')
                .clear()
                .type('test@gmail.com');
            cy.get('[data-test-id=send-email-form] input[name=email]').blur();
        });
        it('success reset password', () => {
            cy.intercept('/api/auth/reset-password', {
                delay: 1000,
                statusCode: 200,
            }).as('successReset');
            cy.visit('http://localhost:3000/#/forgot-pass?code=somecode');
            cy.get('[data-test-id=reset-password-form] input[name=password]').type('Qwerty123');
            cy.get('[data-test-id=reset-password-form] input[name=passwordConfirmation]').type(
                'Qwerty123',
            );
            cy.contains('сохранить изменения', { matchCase: false }).click();
            cy.get('[data-test-id=loader]').should('be.exist');
            cy.wait('@successReset');
            cy.get('[data-test-id=auth]').screenshot('success reset password');
            cy.get('[data-test-id=status-block]:contains("Новые данные сохранены")').should(
                'be.visible',
            );
            cy.get('button').contains('вход', { matchCase: false }).click();
            cy.url().should('contain', '/auth');
        });
        it('error reset password', () => {
            cy.intercept('/api/auth/reset-password', {
                delay: 1000,
                statusCode: 500,
                body: {
                    data: null,
                    error: {
                        status: 500,
                        name: 'ApplicationError',
                        message: 'error',
                        details: {},
                    },
                },
            }).as('errorReset');
            cy.visit('http://localhost:3000/#/forgot-pass?code=somecode');
            cy.get('[data-test-id=reset-password-form] input[name=password]').type('Qwerty123');
            cy.get('[data-test-id=reset-password-form] input[name=passwordConfirmation]').type(
                'Qwerty123',
            );
            cy.contains('сохранить изменения', { matchCase: false }).click();
            cy.get('[data-test-id=loader]').should('be.exist');
            cy.wait('@errorReset');
            cy.get('[data-test-id=status-block]:contains("Данные не сохранились")').should(
                'be.visible',
            );
            cy.get('[data-test-id=auth]').screenshot('error reset password');
        });
        it('reset password validation', () => {
            cy.visit('http://localhost:3000/#/forgot-pass?code=somecode');
            cy.get('[data-test-id=checkmark]').should('not.be.exist');
            cy.get('[data-test-id=reset-password-form] input[name=password]').focus();
            cy.get('[data-test-id=reset-password-form] input[name=password]').blur();
            cy.get('[data-test-id=hint]:contains("Поле не может быть пустым")')
                .should('be.visible')
                .should('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=reset-password-form] input[name=password]').type('q');
            cy.get('[data-test-id=hint] span:contains("не менее 8 символов")')
                .get('[data-test-id=hint] span:contains("заглавной буквой")')
                .get('[data-test-id=hint] span:contains("цифрой")')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=reset-password-form] input[name=password]').type('{backspace}');
            cy.get(
                '[data-test-id=hint]:contains("Пароль не менее 8 символов, с заглавной буквой и цифрой")',
            )
                .should('be.visible')
                .and('have.css', 'color', 'rgb(167, 167, 167)');
            cy.get('[data-test-id=reset-password-form] input[name=password]').type('Q');
            cy.get('[data-test-id=hint] span:contains("не менее 8 символов")')
                .get('[data-test-id=hint] span:contains("цифрой")')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=hint] span:contains("заглавной буквой")')
                .should('be.visible')
                .should('have.css', 'color', 'rgb(167, 167, 167)');
            cy.get('[data-test-id=reset-password-form] input[name=password]').type('werty1');
            cy.get('[data-test-id=hint] span:contains("не менее 8 символов")')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=hint] span:contains("заглавной буквой")')
                .get('[data-test-id=hint] span:contains("цифрой")')
                .should('be.visible')
                .should('have.css', 'color', 'rgb(167, 167, 167)');
            cy.get('[data-test-id=reset-password-form] input[name=password]').type('2');
            cy.get(
                '[data-test-id=hint]:contains("Пароль не менее 8 символов, с заглавной буквой и цифрой")',
            )
                .should('be.visible')
                .and('have.css', 'color', 'rgb(167, 167, 167)');
            cy.get('[data-test-id=checkmark]').should('be.exist');
            cy.get('[data-test-id=reset-password-form] input[name=password]').blur();
            cy.get(
                '[data-test-id=hint]:contains("Пароль не менее 8 символов, с заглавной буквой и цифрой")',
            )
                .should('be.visible')
                .and('have.css', 'color', 'rgb(167, 167, 167)');
            cy.get('[data-test-id=reset-password-form] input[name=passwordConfirmation]').focus();
            cy.get('[data-test-id=reset-password-form] input[name=passwordConfirmation]').blur();
            cy.get('[data-test-id=hint]:contains("Поле не может быть пустым")')
                .should('be.visible')
                .should('have.css', 'color', 'rgb(244, 44, 79)');
            cy.get('[data-test-id=reset-password-form] input[name=passwordConfirmation]').type(
                'Qwerty',
            );
            cy.get('[data-test-id=reset-password-form] input[name=passwordConfirmation]').blur();
            cy.get('[data-test-id=hint]:contains("Пароли не совпадают")')
                .should('be.visible')
                .should('have.css', 'color', 'rgb(244, 44, 79)');
            cy.contains('сохранить изменения', { matchCase: false }).should('be.disabled');
            cy.get('[data-test-id=reset-password-form] input[name=passwordConfirmation]').type(
                '123',
            );
            cy.get('[data-test-id=hint]:contains("Пароли не совпадают")').should('not.be.exist');
            cy.contains('сохранить изменения', { matchCase: false }).should('be.enabled');
            cy.get('[data-test-id=checkmark]').should('have.length', 1);
        });
    });
});
