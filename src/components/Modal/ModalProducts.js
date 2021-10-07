import React from 'react'
import {Modal, Button, Form} from "react-bootstrap"
import {AppContext} from "../../context";
import { v4 as uuidv4 } from "uuid"



const ModalProducts = ({ operation, onHide, hide}) => {
	const {state, dispatch} = React.useContext(AppContext)

	const handleChange = (e) => {
    const { name } = e.target
    const value =
      e.target.type === "checkbox" ? !!e.target.checked : e.target.value
    dispatch({
      type: "CHANGE_PRODCUTS_FORM",
      payload: { key: name, value: value },
    })
  }


  return (
    <Modal
            show={hide}
            onHide={onHide}
          >
            <Modal.Header closeButton>
              <Modal.Title>Insertar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label>Nombre del Producto</label>
                <input
                  className="form-control"
                  type="text"
                  name="nombre"
                  value={state.productForm ? state.productForm.nombre : ""}
                  onChange={handleChange}
                />

                <br />

                <label>Descripcion del Producto</label>
                <input
                  className="form-control"
                  type="text"
                  name="description"
                  value={state.productForm ? state.productForm.description : ""}
                  onChange={handleChange}
                />

                <br />

                <label>SKU del Producto</label>
                <input
                  className="form-control"
                  type="text"
                  name="sku"
                  value={state.productForm ? state.productForm.sku : ""}
                  onChange={handleChange}
                />

                <br />

                <label>Unidad de Medida</label>
                <select
                  className="form-select"
                  onChange={handleChange}
                  value={state.productForm ? state.productForm.um : ""}
                  name="um"
                >
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>

                <br />

                <label>Cantidad del Producto</label>
                <input
                  className="form-control"
                  type="number"
                  name="cantidad"
                  value={state.productForm && state.productForm.cantidad}
                  onChange={handleChange}
                />
                <br />

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={state.productForm && state.productForm.refrigerado}
                    name="refrigerado"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Refrigerado</label>
                </div>
                <br />

                <label>Relacion con Proveedor</label>
                <input
                  className="form-control"
                  type="text"
                  name="relacionProv"
                  value={
                    state.productForm ? state.productForm.relacionProv : ""
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
									if(state.operationType === "INSERT") {
										dispatch({
											type: "INSERT_PRODUCTS",
											payload: {
												productSelected: {
													...state.productForm,
													id: uuidv4(),
													refrigerado: state.productForm.refrigerado ?? false,
												},
											},
										})
									}
									if(state.operationType === "EDIT"){
										dispatch({
											type: "EDIT_PRODUCTS",
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

export default ModalProducts
