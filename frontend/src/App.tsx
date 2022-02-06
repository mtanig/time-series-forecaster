import { DefaultTemplate } from './components/templates/DefaultTemplate';

function App() {
  return (
    <div className="app">
      <DefaultTemplate
          className={'template'}
          title={'Time Series Forecaster'}
      />
    </div>
  )
}

export default App
