import { useState, useEffect } from 'react'
import { MaterialReactTable } from 'material-react-table'
import { MRT_ColumnDef } from 'material-react-table'
import { User } from './types'
import { Button } from '@mui/material'
import ReadMoreIcon from '@mui/icons-material/ReadMore'

// Definir las columnas
const columns: MRT_ColumnDef<User>[] = [
  {
    id: 'name',
    header: 'Nombre y Apellido',
    accessorKey: 'name',
    columnFilterModeOptions: ['fuzzy', 'contains', 'startsWith'], // agregar opciones de filtrado
  },
  {
    id: 'username',
    header: 'Usuario',
    accessorKey: 'username',
  },
  {
    header: 'Correo',
    accessorKey: 'email',
  },
  {
    header: 'Telefono',
    accessorKey: 'phone',
  },
  {
    header: 'Ciudad', // Texto del header de la columna
    accessorKey: 'address.city', // Key del objeto que se quiere mostrar
  },
  {
    header: 'Calle',
    accessorKey: 'address.street',
    id: 'calle',
  },
]

const Table = () => {
  const [data, setData] = useState<User[]>([])

  // Traer el array de usuarios desde la API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/')
      .then((response) => response.json())
      .then((data) => {
        // Asumiendo que los datos tienen una estructura similar a la interfaz User
        setData(data as User[])
      })
      .catch((error) => {
        console.error('Error al obtener los datos', error)
      })
  }, [])

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      // enableRowSelection // activar selección de filas, con los checkboxs de la izquierda
      // enableColumnOrdering // activar cambiar de posición las columnas al arrastrar y soltar
      // enableExpanding // activar expandir filas
      /* PROBAR COSAS NUEVAS */

      /* AGREGAR ACCIONES PARA CADA COLUMNA */
      // displayColumnDefOptions={{
      //   // MOFIFICAR EL TAMAÑO DE LA COLUMNA DE ACCIONES
      //   'mrt-row-actions': { minSize: 100 },
      //   // MOFIFICAR EL TAMAÑO DE LA COLUMNA DE SELECCIÓN
      //   'mrt-row-select': {
      //     // enableOrdering: true,
      //     // enablePinning: true,
      //     // enableColumnActions: true, // habilitar acciones para la columna
      //     // enableClickToCopy: true, // habilitar copiar al hacer click
      //   },
      // }}
      // enableRowNumbers
      enableRowActions // habilitar acciones para la fila
      enableClickToCopy // habilitar copiar al hacer click
      positionActionsColumn='first' // posicionar la columna de acciones al principio
      enableColumnFilterModes // habilitar opciones de filtrado
      // enableColumnResizing // habilitar cambiar el tamaño de las columnas
      // positionPagination='top' // posicionar la paginación al final
      // positionGlobalFilter='right'// posicionar el filtro global a la derecha
      renderRowActions={({ row, table, cell }) => (
        <Button
          variant='outlined'
          onClick={() => {
            // console.log(row.getValue('username'))
            console.log(cell.getContext())
          }}
        >
          <ReadMoreIcon />
        </Button>
      )}
    />
  )
}

export default Table
