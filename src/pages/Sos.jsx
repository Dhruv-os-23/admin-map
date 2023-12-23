import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Button
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';

const Sos = () => {
  const [sosData, setSosData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('http://4.227.178.188:3001/sos/get');
        const lastFiveData = res.data.data.slice(-5);
        setSosData(lastFiveData);
      } catch (error) {
        console.error('Error fetching SOS data:', error);
      }
    };

    getData();
  }, []);

  const goToLocation = (latitude, longitude) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, '_blank');
  };

  const columns = useMemo(() => [
    { Header: 'Email', accessor: 'email' },
    { Header: 'Latitude', accessor: 'lastLat', Cell: ({ value }) => value.toFixed(4) },
    { Header: 'Longitude', accessor: 'lastLong', Cell: ({ value }) => value.toFixed(4) },
    {
      Header: 'Action', accessor: 'action', Cell: ({ row }) => (
        <Button colorScheme="blue" onClick={() => goToLocation(row.original.lastLat, row.original.lastLong)}>
          Go to Location
        </Button>
      )
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: sosData });

  return (
    <div>
    <Navbar />
      <Box minHeight="100vh" display="flex" flexDirection="column" alignItems="center" p="2rem">
        <Table {...getTableProps()} variant="simple" size="md" colorScheme="purple">
          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </div>
  );
};

export default Sos;
