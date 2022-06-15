import NuevoPresupuesto from "./NuevoPresupuesto"
import ControlPresupuesto from "./ControlPresupuesto"

const Header = ({
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto,
  gastos,
  setGastos
}) => {

  return (
    <header>
      <h1>Planificador de gastos. 🪙</h1>
      {isValidPresupuesto ? (
        <ControlPresupuesto
        presupuesto={ presupuesto }
        setPresupuesto={ setPresupuesto }
        gastos={ gastos }
        setGastos={ setGastos }
        setIsValidPresupuesto={ setIsValidPresupuesto }
        />
      ) : (
        <NuevoPresupuesto
          presupuesto={ presupuesto }
          setPresupuesto={ setPresupuesto }
          setIsValidPresupuesto={ setIsValidPresupuesto }
        />
      )}
    </header>
  )
}

export default Header
