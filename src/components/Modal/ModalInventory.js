import React from 'react'
import {Modal, Button} from "react-bootstrap"
import {AppContext} from "../../context";
import { v4 as uuidv4 } from "uuid"

const ModalInventory = ({operation, onHide, hide}) => {
	const {state, dispatch} = React.useContext(AppContext)
	
	const handleChange = (e) => {
    const { name } = e.target
    const value =
      e.target.type === "checkbox" ? !!e.target.checked : e.target.value
    console.log(value, name)
    dispatch({
      type: "CHANGE_INVENTORY_FORM",
      payload: { key: name, value: value },
    })
  }


  return (
  
		<Modal
            show={hide}
            onHide={onHide}
          >
            <Modal.Header closeButton>
              <Modal.Title>INVENTARIO</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label>Relacion del Producto</label>
                <input
                  className="form-control"
                  type="text"
                  name="relacionProductos"
                  value={
                    state.inventarioForm
                      ? state.inventarioForm.relacionProductos
                      : ""
                  }
                  onChange={handleChange}
                />

                <br />
                <label>Cantidad</label>
                <input
                  className="form-control"
                  type="text"
                  name="cantidad"
                  value={
                    state.inventarioForm ? state.inventarioForm.cantidad : ""
                  }
                  onChange={handleChange}
                />

                <br />
                <label>Fecha de vencimineto</label>
                <input
                  className="form-control"
                  type="text"
                  name="vencimiento"
                  value={
                    state.inventarioForm ? state.inventarioForm.vencimiento : ""
                  }
                  onChange={handleChange}
                />

                <br />
                <label>Fecha de Vencimiento</label>
                <input
                  className="form-control"
                  type="text"
                  name="compra"
                  value={
                    state.inventarioForm ? state.inventarioForm.compra : ""
                  }
                  onChange={handleChange}
                />

                <br />
                <label>Descuento (%)</label>
                <input
                  className="form-control"
                  type="number"
                  name="descuento"
                  value={
                    state.inventarioForm ? state.inventarioForm.descuento : ""
                  }
                  onChange={handleChange}
                />
                <br />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={onHide}
              >
                Cancelar
              </Button>
              <Button
                variant="success"
                onClick={() => {
									if(state.operationType === "INSERT"){
										dispatch({
											type: "INSERT_INVENTORY",
											payload: {
												inventorySelected: {
													...state.inventarioForm,
													id: uuidv4(),
												},
											},
										})
									}
									if(state.operationType === "EDIT"){
										dispatch({
											type: "EDIT_INVENTORY",
										})
									}
                  onHide()
                }}
              >
                Guardar
              </Button>
            </Modal.Footer>
          </Modal>

	)
}

export default ModalInventory;
