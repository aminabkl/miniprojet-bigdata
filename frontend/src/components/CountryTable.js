import React, { useState } from "react";
import { useTable, useSortBy } from "react-table";
import tableau from "../assets/tableau.png";

function CountryTable({ data }) {
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 15;

  const columns = React.useMemo(
    () => [
      { Header: "Rang", accessor: "Rank" },
      { Header: "Pays/Territoire", accessor: "Country/Territory" },
      { Header: "Densité (par km²)", accessor: "Density (per km²)" },
      { Header: "Taux de Croissance", accessor: "Growth Rate" },
      {
        Header: "Population Mondiale %",
        accessor: "World Population Percentage",
      },

      // { Header: "Pop 2022", accessor: "2022 Population" },
      // { Header: "Rank", accessor: "Rank" },
      // { Header: "Country/Territory", accessor: "Country/Territory" },
      // { Header: "Density", accessor: "Density (per km²)" },
      // { Header: "Growth Rate", accessor: "Growth Rate" },
      // { Header: "World Population %", accessor: "World Population Percentage" },
    ],
    []
  );

  const tableInstance = useTable({ columns, data }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  // Calcul des lignes à afficher pour la page actuelle
  const startRow = currentPage * rowsPerPage;
  const endRow = startRow + rowsPerPage;
  const pageRows = rows.slice(startRow, endRow);

  // Fonction pour changer de page
  const nextPage = () => {
    if (currentPage < Math.ceil(rows.length / rowsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="tableau-header">
        <img
          src={tableau}
          alt="world"
          style={{ width: "45px", height: "auto" }}
        />
        <h3 className="tableau-h3">
          Tableau des statistiques des pays du monde
        </h3>
      </div>
      <div className="country-table-container">
        <table {...getTableProps()} className="country-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {pageRows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 0}>
            Précédent
          </button>
          <span>
            Page {currentPage + 1} sur {Math.ceil(rows.length / rowsPerPage)}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage >= Math.ceil(rows.length / rowsPerPage) - 1}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}

export default CountryTable;
