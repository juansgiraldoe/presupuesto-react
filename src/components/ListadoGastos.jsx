import Gasto from "./Gasto"

const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto, gastosFiltrados, filtro}) => {
  return (
    <div className="listado-gastos contenedor">
      
      {filtro ? (
        <>
            <h2>{gastosFiltrados.length ? 'Tus gastos.' : 'No hay gastos aun.'}</h2>
            {gastosFiltrados.map( gasto => (
              <Gasto
              key={gasto.id}
              gasto={ gasto }
              setGastoEditar={ setGastoEditar }
              eliminarGasto={ eliminarGasto }
              />
              ))}
          </>
        ) : (
          <>
            <h2>{gastos.length ? 'Tus gastos.' : 'No hay gastos aun.'}</h2>
            {gastos.map( gasto => (
              <Gasto
                key={gasto.id}
                gasto={ gasto }
                setGastoEditar={ setGastoEditar }
                eliminarGasto={ eliminarGasto }
              />
            ))}
          </>
        )}
    </div>
  )
}

export default ListadoGastos
