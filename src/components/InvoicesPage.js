import React, { useEffect, useState } from "react";
import "./InvoicesPage.css";

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Load invoice data from the JSON file on mount
  useEffect(() => {
    fetch("/data/invoices.json")
      .then((res) => res.json())
      .then((data) => {
        setInvoices(data);
      })
      .catch((error) => console.error("Error loading invoice data", error));
  }, []);

  // Filtering invoices based on search term (by Invoice Number, Month, or Account Number)
  const filteredInvoices = invoices.filter(
    (invoice) =>
      (invoice.invoiceNumber || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (invoice.month || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (invoice.accountNumber || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Sorting logic
  const sortedInvoices = React.useMemo(() => {
    let sortableInvoices = [...filteredInvoices];
    if (sortConfig.key) {
      sortableInvoices.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        if (aValue < bValue)
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue)
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return sortableInvoices;
  }, [filteredInvoices, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(sortedInvoices.length / pageSize);
  const paginatedInvoices = sortedInvoices.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Export invoice data to CSV
  const exportToCSV = () => {
    const header = [
      "Invoice Number",
      "Month",
      "Account Number",
      "Total Amount",
      "Due Date",
    ];
    const rows = sortedInvoices.map((inv) => [
      inv.invoiceNumber,
      inv.month,
      inv.accountNumber,
      inv.totalAmount,
      inv.dueDate,
    ]);
    const csvContent = [header, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "invoices.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dummy PDF export (replace with real implementation using jsPDF or similar if needed)
  // const exportToPDF = () => {
  //   alert("Export to PDF functionality to be implemented.");
  // };

  // Download the original PDF for an invoice (assumes each invoice object includes a pdfUrl property)
  const downloadInvoicePDF = (invoice) => {
    if (invoice.pdfUrl) {
      window.open(invoice.pdfUrl, "_blank");
    } else {
      alert("PDF not available for this invoice.");
    }
  };

  return (
    <div className="invoices-page">
      <h1>Invoices</h1>

      <div className="export-buttons">
        <button onClick={exportToCSV}>Export CSV</button>
        {/* <button onClick={exportToPDF}>Export PDF</button>*/}
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Invoice Number, Month, or Account Number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th onClick={() => requestSort("invoiceNumber")}>Invoice Number</th>
            <th onClick={() => requestSort("month")}>Month</th>

            <th onClick={() => requestSort("totalAmount")}>Total Amount (R)</th>
            <th onClick={() => requestSort("dueDate")}>Due Date</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          {paginatedInvoices.map((inv, index) => (
            <tr key={index}>
              <td>{inv.invoiceNumber}</td>
              <td>{inv.month}</td>
              <td>{inv.accountNumber}</td>
              <td>{inv.totalAmount}</td>
              <td>{inv.dueDate}</td>
              <td>
                <button
                  onClick={() => downloadInvoicePDF(inv)}
                  className="download-btn"
                >
                  Download PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InvoicesPage;
