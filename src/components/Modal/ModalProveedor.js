import React, {useState} from 'react'
import {Modal, Button, Form} from "react-bootstrap"
import {AppContext} from "../../context";
import { v4 as uuidv4 } from "uuid"

const ModalProveedor = ({operation, onHide, hide}) => {
	const {state, dispatch} = React.useContext(AppContext)

  const handleChange = (e) => {
    const { name } = e.target
    const value =
      e.target.type === "checkbox" ? !!e.target.checked : e.target.value
    dispatch({
      type: "CHANGE_PROVEEDOR_FORM",
      payload: { key: name, value: value },
    })
  }


  return (
    <Modal
            show={hide}
            onHide={onHide}
          >
            <Modal.Header closeButton>
              <Modal.Title>PROVEEDOR</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label>NIT</label>
                <input
                  className="form-control"
                  type="text"
                  name="nit"
                  value={state.proveedorForm ? state.proveedorForm.nit : ""}
                  onChange={handleChange}
                />
                <label>Nombre</label>
                <input
                  className="form-control"
                  type="text"
                  name="nombre"
                  value={state.proveedorForm ? state.proveedorForm.nombre : ""}
                  onChange={handleChange}
                />
                <label>Representante Legal</label>
                <input
                  className="form-control"
                  type="text"
                  name="representante"
                  value={
                    state.proveedorForm ? state.proveedorForm.representante : ""
                  }
                  onChange={handleChange}
                />
                <label>Direccion</label>
                <input
                  className="form-control"
                  type="text"
                  name="direccion"
                  value={
                    state.proveedorForm ? state.proveedorForm.direccion : ""
                  }
                  onChange={handleChange}
                />
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
                      type: "INSERT_PROVEEDOR",
                      payload: {
                        provSelected: {
                          ...state.proveedorForm,
                          id: uuidv4(),
                        },
                      },
                    })
                  }
                  if(state.operationType === "EDIT"){
										dispatch({
											type: "EDIT_PROVEEDOR",
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

export default ModalProveedor;
