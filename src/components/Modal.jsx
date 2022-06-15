import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarModal from '../img/cerrar.svg'

const Modal = ({setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar
}) => {

  const[mensaje, setMensaje] = useState('')

  const [nGasto, setNGasto] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')
  const [fecha, setFecha] = useState('')
  const [id, setId] = useState('')

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setNGasto(gastoEditar.nGasto)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  }, []);

  const ocultarModal = ()=> {
    setAnimarModal(false)
    setGastoEditar({})
    setTimeout(() => {
      setModal(false)
    }, 300);
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if ([nombre, cantidad, categoria].includes('')) {
      setMensaje('Todos los cambos son obligatorios.')
      setTimeout(() => {
        setMensaje('')
      }, 2000);
      return
    }

    guardarGasto({nGasto, cantidad, categoria, id, fecha})
  }

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarModal} alt="Cerrar modal" onClick={ocultarModal}/>
      </div>
      <form action=""
      className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
      onSubmit={handleSubmit}>
        <legend>{gastoEditar.nGasto ? 'Editar gasto' : 'Nuevo Gasto'}</legend>
        {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input type="text"
          id="nombre"
          placeholder='Añade el nombre del gasto.'
          value={nGasto}
          onChange={e => setNGasto(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input type="number"
          id="cantidad"
          placeholder='Añade cuanto gastaste.'
          value={cantidad}
          onChange={e => setCantidad(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select id="categoria"
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input type="submit" value={gastoEditar.nGasto ? 'Guardar cambios' : 'Agregar gasto'} />
      </form>
    </div>
  )
}

export default Modal
