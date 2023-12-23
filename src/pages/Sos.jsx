import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';

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

  const columns = useMemo(() => [
    { Header: 'Email', accessor: 'email' },
    { Header: 'Latitude', accessor: 'lastLat', Cell: ({ value }) => value.toFixed(4) }, // Format latitude
    { Header: 'Longitude', accessor: 'lastLong', Cell: ({ value }) => value.toFixed(4) }, // Format longitude
  ], []);

  const pageStyle = {
    backgroundColor: '#1f1f1f',  // Updated to dark gray
    color: '#9370DB',  // Light purple text color
    minHeight: '100vh',  // Full height of the viewport
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',  // Align items at the center horizontally
  };

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '76%',  // Adjust the width as needed (80% - 2% margin on each side)
    backgroundColor: '#1f1f1f',  // Updated to dark gray
    margin: '2%',  // Added 2% margin
  };

  const thStyle = {
    border: '1px solid #ddd',
    padding: '12px',  // Increased padding
    textAlign: 'left',
    backgroundColor: '#1f1f1f',  // Updated to dark gray
    fontSize: 'calc(3vh + 1vw)',  // Dynamic font size that fills about 3/4th of the page
    fontWeight: 'bold',  // Added bold font weight
    color: '#9370DB',  // Purple text color
  };

  const tdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#1f1f1f',  // Updated to dark gray
    fontSize: 'calc(2vh + 1vw)',  // Dynamic font size for table contents
    color: '#9370DB',  // Purple text color
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: sosData });

  return (
    <div style={pageStyle}>
      <table {...getTableProps()} style={tableStyle}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} style={thStyle}>{column.render('Header')}</th>
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
                  return <td {...cell.getCellProps()} style={tdStyle}>{cell.render('Cell')}</td>;
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












