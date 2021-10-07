import {INITIAL_FORM} from "./constants.js" 

export const reducer = (state, action) => {
  switch (action.type) {
    case "INSERT_PRODUCTS":
      const newProducts = [...state.products]
      const newProduct = action.payload.productSelected
      newProducts.push(newProduct)
      localStorage.setItem("Products", JSON.stringify(newProducts))
      return { ...state, products: newProducts }

    case "DELETE_PRODUCTS":
      const prodSelected = action.payload.id
      const deleteProd = state.products.filter(
        (product) => product.id !== prodSelected
      )
      console.log(deleteProd)
      localStorage.setItem("Products", JSON.stringify(deleteProd))
      return { ...state, products: deleteProd }

    case "EDIT_PRODUCTS":
      let newDataProducts = state.products
      const idProd = state.productForm.id
      newDataProducts = newDataProducts.map((product) => {
        if (product.id === idProd) {
          product = state.productForm;
        }
				return product;
      })
      localStorage.setItem("Products", JSON.stringify(newDataProducts))
      return { ...state, products: newDataProducts, productForm:{}}

    case "FIND_PRODUCT":
    const product =  state.products.find(product => product.id === action.payload.product_id)  
    return { ...state, productForm: {...product, id: action.payload.product_id}}

    case "CHANGE_PRODCUTS_FORM":
      console.log({
        [action.payload.key]: action.payload.value,
      })
      return {
        ...state,
        productForm: {
          ...state.productForm,
          [action.payload.key]: action.payload.value,
        },
      }
    case "RESET_PRODCUTS_FORM":
      return {
        ...state,
        productForm: INITIAL_FORM,
      }

    case "INSERT_INVENTORY":
      const newInventories = [...state.inventario]
      const newInventory = action.payload.inventorySelected
      newInventories.push(newInventory)
      localStorage.setItem("Inventario", JSON.stringify(newInventories))
      return { ...state, inventario: newInventories }

    case "DELETE_INVENTORY":
      const inventarioSelected = action.payload.id
      const deleteInv = state.inventario.filter(
        (inventory) => inventory.id !== inventarioSelected
      )
      localStorage.setItem("Inventario", JSON.stringify(deleteInv))
      return { ...state, inventario: deleteInv }

		case "EDIT_INVENTORY":
      let newDataInventory = state.inventario
      const idInventory = state.inventarioForm.id
      newDataInventory = newDataInventory.map((inventory) => {
        if (inventory.id === idInventory) {
          inventory = state.inventarioForm;
        }
				return inventory;
      })
      localStorage.setItem("Inventario", JSON.stringify(newDataInventory))
      return { ...state, inventario: newDataInventory, inventarioForm:{}}

    case "FIND_INVENTORY":
			const inventory =  state.inventario.find(inventory => inventory.id === action.payload.inventory_id)  
			return { ...state, inventarioForm: {...inventory, id: action.payload.product_id}}

    case "CHANGE_INVENTORY_FORM":
      return {
        ...state,
        inventarioForm: {
          ...state.inventarioForm,
          [action.payload.key]: action.payload.value,
        },
      }

    case "RESET_INVENTORY_FORM":
      return {
        ...state,
        inventarioForm: INITIAL_FORM,
      }

    case "INSERT_TIENDA":
      const newShops = [...state.tiendas]
      const newShop = action.payload.shopSelected
      newShops.push(newShop)
      localStorage.setItem("Tiendas", JSON.stringify(newShops))
      return { ...state, tiendas: newShops }

    case "DELETE_TIENDA":
      const shopSelected = action.payload.id
      const deleteShop = state.tiendas.filter(
        (shop) => shop.id !== shopSelected
      )
      localStorage.setItem("Tiendas", JSON.stringify(deleteShop))
      return { ...state, tiendas: deleteShop }

      case "EDIT_TIENDA":
        let newDataShop = state.tiendas
        const idShop = state.tiendasForm.id
        newDataShop = newDataShop.map((shop) => {
          if (shop.id === idShop) {
            shop = state.tiendasForm;
          }
          return shop;
        })
        console.log(newDataShop);
        localStorage.setItem("Tiendas", JSON.stringify(newDataShop))
        return { ...state, tiendas: newDataShop, tiendasForm:{}}
  
      case "FIND_TIENDA":
        const shop =  state.tiendas.find(tienda => tienda.id === action.payload.tienda_id)  
        return { ...state, tiendasForm: {...shop, id: action.payload.tienda_id}}

    case "CHANGE_TIENDA_FORM":
      return {
        ...state,
        tiendasForm: {
          ...state.tiendasForm,
          [action.payload.key]: action.payload.value,
        },
      }

    case "RESET_TIENDA_FORM":
      return {
        ...state,
        tiendasForm: INITIAL_FORM,
      }

    case "INSERT_PROVEEDOR":
      const newProveedores = [...state.proveedor]
      const newProveedor = action.payload.provSelected
      newProveedores.push(newProveedor)
      localStorage.setItem("Proveedor", JSON.stringify(newProveedores))
      return { ...state, proveedor: newProveedores }

    case "DELETE_PROVEEDOR":
      const provSelected = action.payload.id
      const deleteProveedor = state.proveedor.filter(
        (prov) => prov.id !== provSelected
      )
      localStorage.setItem("Proveedor", JSON.stringify(deleteProveedor))
      return { ...state, proveedor: deleteProveedor }
    
      case "EDIT_PROVEEDOR":
        let newDataProveedor = state.proveedor
        const idProveedor = state.proveedorForm.id
        newDataProveedor = newDataProveedor.map((proveedor) => {
          if (proveedor.id === idProveedor) {
            proveedor = state.proveedorForm;
          }
          return proveedor;
        })
        localStorage.setItem("Proveedor", JSON.stringify(newDataProveedor))
        return { ...state, proveedor: newDataProveedor, proveedorForm:{}}
  
      case "FIND_PROVEEDOR":
        const proveedor =  state.proveedor.find(proveedor => proveedor.id === action.payload.proveedor_id)  
        return { ...state, proveedorForm: {...proveedor, id: action.payload.proveedor_id}}

    case "CHANGE_PROVEEDOR_FORM":
      return {
        ...state,
        proveedorForm: {
          ...state.proveedorForm,
          [action.payload.key]: action.payload.value,
        },
      }

    case "RESET_PROVEEDOR_FORM":
      return {
        ...state,
        proveedorForm: INITIAL_FORM,
      }

		case "SET_OPERATION":
			return{
				...state, 
				operationType: action.payload.operationType
			}
		default:
      throw new Error()
  }
}