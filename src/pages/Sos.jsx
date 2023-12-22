import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';

const Sos = () => {
  const [sosData, setSosData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('http://4.227.178.188:3001/sos/get');
        console.log(res.data);
        const lastFiveData = res.data.data.slice(-5);
        console.log(lastFiveData)
        setSosData(lastFiveData);
      } catch (error) {
        console.error('Error fetching SOS data:', error);
      }
    };

    getData();
  }, []);

  const columns = useMemo(() => [
    { Header: 'Email', accessor: 'email' },
    { Header: 'Latitude', accessor: 'lastLat', Cell: ({ value }) => value.toFixed(4) }, // Format latitude
    { Header: 'Longitude', accessor: 'lastLong', Cell: ({ value }) => value.toFixed(4) }, // Format longitude
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
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Sos;





