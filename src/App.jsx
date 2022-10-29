import './App.css'

function App() {
  return (
    <div className="App">
      <div className='title'>
        <h1>Seguimiento de gastos</h1>
        <h3>Ordena tus finanzas partiendo por conocer tus habitos</h3>
      </div>
      
      <main className='main-content'>
        <section className='expenses'>
          <h4 className='txt-center'>Gastos</h4>
          <form className='form' action="">
            <input className='input' type="text" />
            <button className='btn-add'>
              <span class="material-symbols-outlined">
                add
              </span>
            </button>
          </form>
        </section>
        <section className='budget'>
          <h4 className='txt-center'>Presupuesto</h4>
          <form className='form' action="">
            <input className='input' type="text" />
            <button className='btn-add'>
              <span class="material-symbols-outlined">
                add
              </span>
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default App
