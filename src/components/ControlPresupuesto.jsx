import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto}) => {

  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)
  const [porcentaje, setPorcentaje] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
    const totalDisponible = presupuesto - totalGastado

    // Calcular el porcentaje gastdo.
    const nuevoPorcentaje = Number((((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(1))

    setDisponible(totalDisponible)
    setGastado(totalGastado)

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 1000);
  }, [gastos]);

  const formatCurrency = (cantidad) => {
    return cantidad.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP'
    })
  }

  const handleResetApp = ()=> {
    const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?')
    if (resultado) {
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? 'red' : '#3B82F6',
            trailColor: '#F5F5F5',
            textColor: porcentaje > 100 ? 'red' : '#3B82F6'
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button
          className="reset-app"
          type="button"
          onClick={handleResetApp}
        >
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span>{formatCurrency(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span>{formatCurrency(disponible)}
        </p>
        <p>
          <span>Gastado: </span>{formatCurrency(gastado)}
        </p>
      </div>
    </div>
  )
}

export default ControlPresupuesto
