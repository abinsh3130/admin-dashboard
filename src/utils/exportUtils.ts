import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ExportData {
    id: number;
    title: string;
    price: number;
    category: string;
    rating: number;
    ratingCount: number;
    description?: string;
    image?: string;
}

export const exportToExcel = (data: ExportData[], filename: string) => {
 
    const excelData = data.map(item => ({
        ID: item.id,
        Title: item.title,
        Category: item.category,
        Price: `$${item.price.toFixed(2)}`,
        Rating: `${item.rating} ⭐`,
        'Rating Count': item.ratingCount,
        Description: item.description || ''
    }));

   
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');


    const columnWidths = [
        { wch: 10 }, 
        { wch: 40 }, 
        { wch: 20 },
        { wch: 12 }, 
        { wch: 12 },
        { wch: 15 }, 
        { wch: 50 }  
    ];
    worksheet['!cols'] = columnWidths;

  
    XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const exportToPDF = (data: ExportData[], filename: string, title: string) => {
    const doc = new jsPDF();
    
  
    doc.setFontSize(18);
    doc.text(title, 14, 15);
    
  
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Exported on: ${new Date().toLocaleDateString()}`, 14, 22);
    

    const tableData = data.map(item => [
        item.id.toString(),
        item.title.substring(0, 40) + (item.title.length > 40 ? '...' : ''),
        item.category,
        `$${item.price.toFixed(2)}`,
        `${item.rating} ⭐`,
        item.ratingCount.toString()
    ]);


    autoTable(doc, {
        head: [['ID', 'Title', 'Category', 'Price', 'Rating', 'Reviews']],
        body: tableData,
        startY: 28,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [59, 130, 246], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [249, 250, 251] },
        columnStyles: {
            0: { cellWidth: 20 },
            1: { cellWidth: 60 },
            2: { cellWidth: 30 },
            3: { cellWidth: 25 },
            4: { cellWidth: 25 },
            5: { cellWidth: 25 }
        }
    });

    doc.save(`${filename}.pdf`);
};

