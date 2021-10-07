import React, { useMemo } from "react"
import { Table as Tb, Col, Container, Row, Button } from "react-bootstrap"
import { useTable, useSortBy, useRowSelect } from "react-table"
import { AppContext } from "../../context"


const TABLE_TYPE = {
  products: [
    {
      Header: "Nombre",
      accessor: "nombre",
    },
    {
      Header: "Descripción",
      accessor: "description",
    },
    {
      Header: "SKU",
      accessor: "sku",
    },
    {
      Header: "Unidad de medida",
      accessor: "um",
    },
    {
      Header: "Cantidad por unidad",
      accessor: "cantidad",
    },
    {
      Header: "Refrigerado",
      accessor: (product) => (product.refrigerado ? "✅" : "❌"),
    },
    {
      Header: "Relacionado con proveedores",
      accessor: "relacionProv",
    },
  ],

  proveedores: [
    {
      Header: "NIT",
      accessor: "nit",
    },
    {
      Header: "Nombre",
      accessor: "nombre",
    },
    {
      Header: "Representante",
      accessor: "representante",
    },
    {
      Header: "Direccion",
      accessor: "direccion",
    },
  ],

  tiendas: [
    {
      Header: "Nombre",
      accessor: "nombre",
    },
    {
      Header: "Direccion",
      accessor: "direccion",
    },
    {
      Header: "Manager",
      accessor: "manager",
    },
    {
      Header: "Numero de neveras",
      accessor: "numNeveras",
    },
    {
      Header: "Numero de pasillos",
      accessor: "numPasillos",
    },
    {
      Header: "Numero de cajas",
      accessor: "numCajas",
    },
    {
      Header: "Numero de pisos",
      accessor: "numPisos",
    },
    {
      Header: "Metros cuadrados",
      accessor: "m2",
    },
    {
      Header: "Servicios Extras",
      accessor: "servicios",
    },
  ],

  inventario: [
    {
      Header: "Relacion con producos",
      accessor: "relacionProductos",
    },
    {
      Header: "Cantidad",
      accessor: "cantidad",
    },
    {
      Header: "Fecha de Vencimiento",
      accessor: "vencimiento",
    },
    {
      Header: "Fecha de compra",
      accessor: "compra",
    },
    {
      Header: "Descuento",
      accessor: "descuento",
    },
  ]
}



const selectTable = (type) =>{
  if (type === "PRODUCTS"){
    return TABLE_TYPE.products
  }else if( type === "PROVEEDOR"){
    return TABLE_TYPE.proveedores
  }
  else if( type === "TIENDA"){
    return TABLE_TYPE.tiendas
  }else if( type === "INVENTORY"){
    return TABLE_TYPE.inventario
  }
}



const Table = ({ data, type, openmodalEdit, openmodalDelete, idItem}) => {
  const {dispatch} = React.useContext(AppContext)
  const productosCols = useMemo(() => selectTable(type) ?? TABLE_TYPE.products, [type])

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }) => (
          <Button onClick={() => {
            dispatch({
              type: "SET_OPERATION",
              payload: {
                operationType: "EDIT"
              }
            })
            dispatch({
              type: "FIND_PRODUCT",
              payload: {
                product_id: row.original.id
              }
            })
            dispatch({
              type: "FIND_INVENTORY",
              payload: {
                inventory_id: row.original.id
              }
            })
            dispatch({
              type: "FIND_TIENDA",
              payload: {
                tienda_id: row.original.id
              }
            })
            dispatch({
              type: "FIND_PROVEEDOR",
              payload: {
                proveedor_id: row.original.id
              }
            })
            openmodalEdit(true)
            idItem(row.original.id)
            }}>
            Edit
          </Button>
        ),
      },
      {
        id: "Eliminar",
        Header: "Eliminar",
        Cell: ({ row }) => (
          <Button variant="danger" onClick={() => {
            openmodalDelete(true)
            idItem(row.original.id)
            }}>
            Deleted
          </Button>
        ),
      },
    ]);
  };

  const { 
    getTableProps, 
    getTableBodyProps, 
    rows, 
    prepareRow, 
    headerGroups,
    selectedFlatRows,
    state: {selectedRowIds}
  } = useTable({
    columns: productosCols,
    data
  }, 
  useSortBy,
  useRowSelect,
  tableHooks
  )

  


  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Tb striped bordered hover {...getTableProps()}>
          <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {
                    ...column.getHeaderProps(column.getSortByToggleProps())
                  }
                >
                  {column.render("Header")}
                  {column.isSorted
                    ? column.isSortedDesc
                      ? " ▼"
                      : " ▲"
                    : " ▲"} 
                </th>
              ))}
            </tr>
          ))}
          </thead>
          <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  )
                })}
              </tr>
            )
          })}
          </tbody>
          </Tb>
        </Col>
      </Row>
    </Container>
  )
}

export default Table
