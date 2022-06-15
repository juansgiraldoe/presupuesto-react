// Hooks
import { useState, useEffect } from 'react'

// Componentes
import Header from './components/Header'
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'

// Funciones helpers
import { generarId } from './helpers'

// Multimedia
import IconoGasto from './img/nuevo-gasto.svg'

function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])


  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)
      setTimeout(() => {
      setAnimarModal(true)
    }, 300);
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, []);

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    } else {
      setGastosFiltrados([])
    }
    
  }, [filtro]);

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 300);
  }

  const guardarGasto = gasto => {
    // Editar gasto
    if (gasto.id) {
      const gastosActualizados = gastos.map((gastoState)=> gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      //Nuevo gasto
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }

    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 300);
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <>
      <div className={modal ? 'fijar' : ''}>
        <Header
          presupuesto={ presupuesto }
          setPresupuesto={ setPresupuesto }
          isValidPresupuesto={ isValidPresupuesto }
          setIsValidPresupuesto={ setIsValidPresupuesto }
          gastos={ gastos }
          setGastos={ setGastos }
        />
        { isValidPresupuesto && (
          <>
            <main>
              <Filtros
                filtro={ filtro }
                setFiltro={ setFiltro }

              />
              <ListadoGastos
                gastos={ gastos }
                setGastoEditar={ setGastoEditar }
                eliminarGasto={ eliminarGasto }
                gastosFiltrados={ gastosFiltrados }
                filtro={ filtro }
              />
            </main>
            <div className='nuevo-gasto'>
              <img
                onClick={handleNuevoGasto}
                src={ IconoGasto }
              />
            </div>
          </>
        )}
        {modal && (
          <Modal
            setModal={ setModal }
            animarModal={ animarModal }
            setAnimarModal={ setAnimarModal }
            guardarGasto={ guardarGasto }
            gastoEditar={ gastoEditar }
          />
        )}
      </div>
    </>
  )
}

export default App
