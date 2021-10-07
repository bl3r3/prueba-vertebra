import React, {useState} from 'react'
import {Modal, Button, Form} from "react-bootstrap"
import {AppContext} from "../../context";
import { v4 as uuidv4 } from "uuid"

const ModalTienda = ({operation, onHide, hide}) => {
	const {state, dispatch} = React.useContext(AppContext)

	const handleChange = (e) => {
    const { name } = e.target
    const value =
      e.target.type === "checkbox" ? !!e.target.checked : e.target.value
    dispatch({
      type: "CHANGE_TIENDA_FORM",
      payload: { key: name, value: value },
    })
  }

  return (
		<Modal
		show={hide}
		onHide={onHide}
	>
		<Modal.Header closeButton>
			<Modal.Title>TIENDA</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<div className="form-group">
				<label>Nombre de la tienda</label>
				<input
					className="form-control"
					type="text"
					name="nombre"
					value={state.tiendasForm ? state.tiendasForm.nombre : ""}
					onChange={handleChange}
				/>
				<label>Direccion de la tienda</label>
				<input
					className="form-control"
					type="text"
					name="direccion"
					value={state.tiendasForm ? state.tiendasForm.direccion : ""}
					onChange={handleChange}
				/>
				<label>Manager de la tienda</label>
				<input
					className="form-control"
					type="text"
					name="manager"
					value={state.tiendasForm ? state.tiendasForm.manager : ""}
					onChange={handleChange}
				/>
				<label>Numero de Neveras</label>
				<input
					className="form-control"
					type="number"
					name="numNeveras"
					value={state.tiendasForm ? state.tiendasForm.numNeveras : ""}
					onChange={handleChange}
				/>
				<label>Numero de Pasillos</label>
				<input
					className="form-control"
					type="number"
					name="numPasillos"
					value={state.tiendasForm ? state.tiendasForm.numPasillos : ""}
					onChange={handleChange}
				/>
				<label>Numero de Cajas</label>
				<input
					className="form-control"
					type="number"
					name="numCajas"
					value={state.tiendasForm ? state.tiendasForm.numCajas : ""}
					onChange={handleChange}
				/>
				<label>Numero de Pisos</label>
				<input
					className="form-control"
					type="number"
					name="numPisos"
					value={state.tiendasForm ? state.tiendasForm.numPisos : ""}
					onChange={handleChange}
				/>
				<label>Metros Cuadrados</label>
				<input
					className="form-control"
					type="number"
					name="m2"
					value={state.tiendasForm ? state.tiendasForm.m2 : ""}
					onChange={handleChange}
				/>
				<label>Servicios</label>
				<select
					className="form-select"
					onChange={handleChange}
					value={state.productForm ? state.productForm.servicios : ""}
					name="servicios"
				>
					<option selected>Open this select menu</option>
					<option value="1">One</option>
					<option value="2">Two</option>
					<option value="3">Three</option>
				</select>
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
							type: "INSERT_TIENDA",
							payload: {
								shopSelected: {
									...state.tiendasForm,
									id: uuidv4(),
								},
							},
						})
					}
					if(state.operationType === "EDIT"){
						dispatch({
							type: "EDIT_TIENDA"
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

export default ModalTienda;
