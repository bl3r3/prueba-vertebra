import React, {useMemo, useState} from 'react'
import {Table as Tb, Col, Container, Row} from 'react-bootstrap';


import { useTable, useSortBy } from 'react-table';


const Table = (props) => {

	const [productos, setProductos] = useState([{
		"id": 1,
		"title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
		"price": 109.95,
		"description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
		"category": "men's clothing",
		"rating": {
			"rate": 3.9,
			"count": 120
		}
	},
	{
		"id": 2,
		"title": " Foldsack No. 1 Backpack, Fits 15 Laptops",
		"price": 300,
		"description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
		"category": "womens clothing",
		"rating": {
			"rate": 3.9,
			"count": 120
		}
	}])


	const productosData = useMemo(() => [...productos] , [productos])

	const productosCols = useMemo(() => 
	productos[0] ? 
		Object.keys(productos[0]).filter((key) => key !== 'rating').map((key) => {
				return { Header: key, accessor: key };
			})
			: []
	, [productos])

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({ columns: productosCols, data: productosData }, useSortBy)

return (
	<Container>
		<Row>
			<Col xs={12}>
				<Tb striped bordered hover {...getTableProps()}>
					<thead>
						{
							headerGroups.map( headerGroup => (
								<tr {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map(column => (
										<th {...column.getHeaderProps(column.getSortByToggleProps())}>
											{column.render('Header')}
											{column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") :" ▲" }
										</th>
									))}
								</tr>
							))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.map(row => {
							prepareRow(row)
							return(
								<tr {...row.getRowProps()}>
									{row.cells.map(cell => {
										return (
											<td {...cell.getCellProps()}>
												{cell.render('Cell')}
											</td>
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
