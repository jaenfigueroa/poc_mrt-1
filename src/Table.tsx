import { useMemo } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { MaterialReactTable } from 'material-react-table'
import { type MRT_ColumnDef } from 'material-react-table' // If using TypeScript (optional, but recommended)
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'

// Si estas usando TypeScript, crea un tipo basado en la forma de tus datos que puedes usar en tus definiciones de columna
interface YourDataType {
  name: {
    firstName: string
    lastName: string
  }
  age: number
}

// MI DATA
// Un ejemplo más complejo con datos anidados
const data: YourDataType[] = [
  {
    name: {
      firstName: 'John', //accessorKey or accessorFn will need to be "name.firstName" to access this value
      lastName: 'Doe',
    },
    age: 30,
  },
  {
    name: {
      firstName: 'Sara',
      lastName: 'Smith',
    },
    age: 25,
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    age: 35,
  },
]

const Table = () => {
  // CONFIGURACION SE LA TABLA
  //un ejemplo más complejo con datos anidados
  //si usa TypeScript, puede usar el tipo MRT_ColumnDef para escribir fuertemente sus columnas (recomendado)
  const columns = useMemo<MRT_ColumnDef<YourDataType>[]>(
    () => [
      {
        header: 'First Name',
        // FORMA ALTERNATIVA, PARA INCLUIR HTML Y NO SOLO TEXTO , SI NO AGREGAR ICONOS
        Header: (
          <MenuItem>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText> Fisrt Name</ListItemText>
          </MenuItem>
        ), //PERSONALIZAR EL HEADER <--- PUEDE SER UN COMPONENTE REACT
        accessorKey: 'name.firstName', //usando la notación de puntos accessorKey para acceder a datos anidados
        //PERSONALIZAR EL ESTILO DE LA CELDA
        /* HEADER */
        // LAS 2 LINEAS PARA ARRASTRAR Y SOLTA DE LA CELDA
        muiTableHeadCellProps: {
          sx: {
            color: '#FF729F',
            background: '#000411',
            border: '2px solid green',
            borderRadius: '10px',
            ':hover': {
              background: '#102E4A',
              color: 'blue',
            },
          },
        },
        // LOS 3 PUNTOS DE LA CELDA
        muiTableHeadCellColumnActionsButtonProps: {
          sx: { color: 'orange' },
        },
        muiTableHeadCellFilterTextFieldProps: { sx: { color: 'gray', background: '#A682FF' } }, // BUSCADOR DE LA CELDA
        muiTableHeadCellDragHandleProps: { sx: { color: '#A682FF' } },
        muiTableHeadCellFilterCheckboxProps: { sx: { color: 'pink' } },
        // muiTableHeadCellFilterSliderProps: { sx: { color: 'brown' }, background: '#A682FF' },
        /* BODY */
        muiTableBodyCellProps: { sx: { color: '#81F4E1', background: 'brown' } }, // ELEMEENTOS DE LA COLUMNA
        muiTableBodyCellCopyButtonProps: { sx: { color: 'yellow' } },
        muiTableBodyCellEditTextFieldProps: { sx: { color: 'red' } },
        muiTableBodyCellEditSelectProps: { sx: { color: 'green' } },
        /* FOOTER */
        muiTableFooterCellProps: { sx: { color: 'blue' } },
      },
      {
        header: 'Last Name',
        accessorFn: (originalRow) => originalRow.name.lastName, //alternativa a accessorKey, usando accessorFn
        id: 'lastName',
        //PERSONALIZAR EL ESTILO DE LA CELDA
        muiTableHeadCellProps: { sx: { color: '#FF729F' } }, //custom props para el componente MuiTableHeadCell}
        muiTableBodyCellProps: { sx: { color: '#81F4E1' } }, //custom props para el componente MuiTableBodyCell
      },
      {
        header: 'Age',
        accessorKey: 'age',
      },
    ],
    []
  )

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowSelection // activar selección de filas con los checkboxs de la izquierda
      enableColumnOrdering // activar cambiar de posición las columnas
      // enableGlobalFilter={false} //apagar el buscador global
    />
  )
}

export default Table
