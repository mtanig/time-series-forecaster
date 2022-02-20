import App from './App';
import React from 'react'
import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/react';
import { Header } from './components/organisms/Header';
import { Content } from './components/organisms/Content';

jest.mock('./components/atoms/C3Chart');

describe("App", () => {
    beforeEach(()=>{
        render(<App/>);
    });

    it('displays Header', ()=> {
        expect(getHeader()).toBeInTheDocument();
    });

    it('displays Content', ()=> {
        expect(getContent()).toBeInTheDocument();
    });

    describe('Header', ()=>{
        it('displays Fab', ()=>{
            expect(getHeader().getElementsByClassName('my-fab').length).toEqual(1)
        });
    });

    describe.skip("button", ()=>{
        test("renders initial value", ()=>{
            expect(screen.getByText(/count is: 0/)).toBeInTheDocument()
        })

        describe("user clicks button", ()=>{
            beforeEach(()=>{
                user.click(screen.getByTestId("button"));
            });
            test("renders added value", ()=>{
                expect(screen.getByText(/count is: 1/)).toBeInTheDocument()
            })
        })
    });

    function getHeader() {
        return screen.getByTestId(Header.defaultProps.dataTestId);
    }

    function getContent() {
        return screen.getByTestId(Content.defaultProps.dataTestId);
    }
});