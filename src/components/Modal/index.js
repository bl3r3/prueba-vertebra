import React from 'react'
import PropTypes from 'prop-types'

import ModalInventory from './ModalInventory';
import ModalProducts from './ModalProducts';
import ModalTienda from './ModalTienda';
import ModalProveedor from './ModalProveedor'; 


const MODALS = {
	"PRODUCT": (operation, onHide, hide) => (<ModalProducts  operation={operation} onHide={onHide} hide={hide} />),
	"INVENTORY": (operation, onHide, hide) => (<ModalInventory operation={operation} onHide={onHide} hide={hide} />),
	"TIENDA": (operation, onHide, hide) => (<ModalTienda operation={operation} onHide={onHide} hide={hide} />),
	"PROVEEDOR": (operation, onHide, hide) => (<ModalProveedor operation={operation} onHide={onHide} hide={hide} />)
	}



const Modales = ({operation, modalType, onHide, hide}) => {
	return MODALS[modalType](operation, onHide, hide) ?? (<></>)
}


Modales.propTypes = {

}

export default Modales;
