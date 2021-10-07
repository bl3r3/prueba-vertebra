import {INITIAL_FORM} from "./constants.js" 
import {getLocalStorageItems} from "./utils.js"


export const initialValue = {
  products: getLocalStorageItems("Products") ?? [],
  productForm: INITIAL_FORM,
  tiendas: getLocalStorageItems("Tiendas") ?? [],
  tiendasForm: INITIAL_FORM,
  inventario: getLocalStorageItems("Inventario") ?? [],
  inventarioForm: INITIAL_FORM,
  proveedor: getLocalStorageItems("Proveedor") ?? [],
  proveedorForm: INITIAL_FORM,
  operationType: "INSERT",
}