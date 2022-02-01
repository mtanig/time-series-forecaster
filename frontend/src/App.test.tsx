import App from './App';
import React from 'react'
import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/react';

describe("App", () => {
    beforeEach(()=>{
        render(<App/>);
    });

    describe("button", ()=>{
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
});