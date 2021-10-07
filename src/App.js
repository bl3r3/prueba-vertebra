import React from "react"
import { Modal, Button, Form } from "react-bootstrap"
import Table from "./components/Tabla/index"
import Modales from "./components/Modal"
import { AppContext } from "./context"
import { reducer } from "./reducer"
import { initialValue } from "./initialValue"

import "./App.css"

function App() {
  const [showModalDelete, setShowModalDelete] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [selected, setSelect] = React.useState("PRODUCT")
  const [idItem, setIdItem] = React.useState("")
  const [data, setData] = React.useState([])
  const [state, dispatch] = React.useReducer(reducer, initialValue)

  const memoizedData = React.useMemo(() => data, [data])

  React.useEffect(() => {
    const dataSend = (select) => {
      if (select === "PRODUCT") {
        setData(state.products)
      } else if (select === "INVENTORY") {
        setData(state.inventario)
      } else if (select === "TIENDA") {
        setData(state.tiendas)
      } else if (select === "PROVEEDOR") {
        setData(state.proveedor)
      } else {
        setData(state.products)
      }
    }

    dataSend(selected)
  }, [
    selected,
    state.proveedor,
    state.products,
    state.inventario,
    state.tiendas,
  ])

  const onHide = () => setShowModal((currentState) => !currentState)

  return (
    <AppContext.Provider value={{ dispatch, state }}>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1 className="text-center mt-3">TABLA VERTEBRA</h1>
          </div>
          <div className="col-xs-12">
            <h4 className="">Seleccione la opcion a mostrar</h4>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row-custom">
          <div className="l-col">
            <Form>
              <Form.Select onChange={(e) => setSelect(e.target.value)}>
                <option value="PRODUCT">PRODUCT</option>
                <option value="INVENTORY">INVENTORY</option>
                <option value="TIENDA">TIENDA</option>
                <option value="PROVEEDOR">PROVEEDOR</option>
              </Form.Select>
            </Form>
          </div>
        </div>
        <div className="row-custom">
          <div className="r-col">
            <button
              className="btn btn-success"
              onClick={() => {
                dispatch({
                  type: "SET_OPERATION",
                  payload: {
                    operationType: "INSERT",
                  },
                })
                onHide()
              }}
            >
              Insertar
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <Table
              data={memoizedData}
              type={selected}
              openmodalEdit={onHide}
              openmodalDelete={setShowModalDelete}
              idItem={setIdItem}
            />
          </div>
        </div>

        <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Eliminar</Modal.Title>
          </Modal.Header>
          <Modal.Body>Estas seguro que quieres eleminiar.</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowModalDelete(false)}
            >
              Cerrar
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                dispatch({
                  type: "DELETE_PRODUCTS",
                  payload: {
                    id: idItem,
                  },
                })
                dispatch({
                  type: "DELETE_INVENTORY",
                  payload: {
                    id: idItem,
                  },
                })
                dispatch({
                  type: "DELETE_TIENDA",
                  payload: {
                    id: idItem,
                  },
                })
                dispatch({
                  type: "DELETE_PROVEEDOR",
                  payload: {
                    id: idItem,
                  },
                })
                setShowModalDelete(false)
              }}
            >
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
        <Modales modalType={selected} onHide={onHide} hide={showModal} />

      </div>
    </AppContext.Provider>
  )
}

export default App
