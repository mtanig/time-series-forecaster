import App from './App';
import React from 'react'
import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/react';
import { Header } from './components/organisms/Header';
import { Content } from './components/organisms/Content';
import { SampleChart } from './components/molecules/SampleChart';
import { ResultChart } from './components/molecules/ResultChart';
import { AddDialog } from './components/organisms/AddDialog';
import { ForecastApiAdapter } from './adapters/ForecastApiAdapter';

jest.mock('./components/atoms/C3Chart');
jest.mock('./adapters/ForecastApiAdapter');

const ForecastApiAdapterMock = ForecastApiAdapter as jest.MockedClass<typeof ForecastApiAdapter>;

// TODO: fix warning
describe("App", () => {
    beforeEach(()=>{
        ForecastApiAdapterMock.prototype.post.mockResolvedValue(require('../tests/apiResWeekly.json'));
        render(<App/>);
    });

    it('displays Header', ()=> {
        expect(getHeader()).toBeInTheDocument();
    });

    it('displays Content', ()=> {
        expect(getContent()).toBeInTheDocument();
    });

    it('displays SampleChart in Content', ()=> {
        expect(getContent().getElementsByClassName(SampleChart.defaultProps.className)).toHaveLength(1);
    });

    it('does not display ResultChart in Content', ()=> {
        expect(getContent().getElementsByClassName(ResultChart.defaultProps.className)).toHaveLength(0);
    });

    it('displays Fab in Header', ()=>{
        expect(getFabInHeader()).toBeInTheDocument();
    });

    it('does not open AddDialog', ()=>{
        expect(getOpenedAddDialogs()).toHaveLength(0);
    });

    describe('user clicks the fab in header', ()=>{
        beforeEach(()=>{
            user.click(getFabInHeader());
        });

        it('opens AddDialog', ()=>{
            expect(getOpenedAddDialogs()).toHaveLength(1);
        });

        it('displays the finish button in AddDialog', ()=>{
            expect(getFinishButtonsInAddDialog()).toHaveLength(1);
        });

        it('displays the cancel button in AddDialog', ()=>{
            expect(getCancelButtonsInAddDialog()).toHaveLength(1);
        });

        describe('user clicks the finish button', ()=>{
            beforeEach(()=>{
                user.click(getFinishButtonsInAddDialog()[0]);
            });

            it('closes AddDialog', ()=>{
                expect(getClosedAddDialogs()).toHaveLength(1);
            });

            it('calls ForecastApiAdapterMock.post()', ()=>{
                expect(ForecastApiAdapterMock.prototype.post).toHaveBeenCalledTimes(1);
            });

            it('displays ResultChart in Content', ()=> {
                expect(getContent().getElementsByClassName(ResultChart.defaultProps.className)).toHaveLength(1);
            });

            it('does not display SampleChart in Content', ()=> {
                expect(getContent().getElementsByClassName(SampleChart.defaultProps.className)).toHaveLength(0);
            });
        });

        describe('user clicks the cancel button', ()=>{
            beforeEach(()=>{
                user.click(getCancelButtonsInAddDialog()[0]);
            });

            it('closes AddDialog', ()=>{
                expect(getClosedAddDialogs()).toHaveLength(1);
            });

            it('does not call ForecastApiAdapterMock.post()', ()=>{
                expect(ForecastApiAdapterMock.prototype.post).not.toHaveBeenCalled();
            });

            it('does not display ResultChart in Content', ()=> {
                expect(getContent().getElementsByClassName(ResultChart.defaultProps.className)).toHaveLength(0);
            });

            it('displays SampleChart in Content', ()=> {
                expect(getContent().getElementsByClassName(SampleChart.defaultProps.className)).toHaveLength(1);
            });
        });
    });

    function getHeader() {
        return screen.getByTestId(Header.defaultProps.dataTestId);
    }

    function getContent() {
        return screen.getByTestId(Content.defaultProps.dataTestId);
    }

    function getFabInHeader() {
        return screen.getByTestId('fab-in-header');
    }

    function getAddDialog() {
        return screen.getByTestId(AddDialog.defaultProps.dataTestId);
    }

    function getOpenedAddDialogs() {
        return getAddDialog().getElementsByClassName('mdc-dialog--opening');
    }

    function getClosedAddDialogs() {
        return getAddDialog().getElementsByClassName('mdc-dialog--closing');
    }

    function getFinishButtonsInAddDialog() {
        return getAddDialog().getElementsByClassName('dialog-finish-button');
    }

    function getCancelButtonsInAddDialog() {
        return getAddDialog().getElementsByClassName('dialog-cancel-button');
    }
});