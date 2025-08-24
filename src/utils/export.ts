import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as Papa from 'papaparse'

export interface ExportColumn {
  key: string
  label: string
  width?: number
}

export interface ExportOptions {
  filename?: string
  title?: string
  columns: ExportColumn[]
}

export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  options: ExportOptions
) {
  const { filename = 'export', columns } = options
  
  // Transform data based on columns
  const transformedData = data.map(item => {
    const row: Record<string, any> = {}
    columns.forEach(col => {
      row[col.label] = item[col.key] || ''
    })
    return row
  })

  const csv = Papa.unparse(transformedData)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export function exportToPDF<T extends Record<string, any>>(
  data: T[],
  options: ExportOptions
) {
  const { filename = 'export', title = 'Data Export', columns } = options
  
  // Create new PDF document
  const doc = new jsPDF()
  
  // Add title
  doc.setFontSize(16)
  doc.text(title, 14, 20)
  
  // Add date
  doc.setFontSize(10)
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30)
  
  // Prepare table data
  const headers = columns.map(col => col.label)
  const rows = data.map(item => 
    columns.map(col => String(item[col.key] || ''))
  )
  
  // Add table
  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 40,
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [63, 81, 181],
      textColor: 255,
      fontStyle: 'bold',
    },
  })
  
  // Save the PDF
  doc.save(`${filename}.pdf`)
}

export function exportToJSON<T>(data: T[], filename = 'export') {
  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}.json`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}