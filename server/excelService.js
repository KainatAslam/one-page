import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.xlsx');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.xlsx');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const ORDER_COLUMNS = [
  { header: 'Order ID', key: 'orderId', width: 16 },
  { header: 'Timestamp', key: 'timestamp', width: 25 },
  { header: 'Customer Name', key: 'fullName', width: 25 },
  { header: 'Email', key: 'email', width: 28 },
  { header: 'Phone', key: 'phone', width: 18 },
  { header: 'Address', key: 'address', width: 35 },
  { header: 'City', key: 'city', width: 18 },
  { header: 'Postal Code', key: 'postalCode', width: 14 },
  { header: 'Items Ordered', key: 'items', width: 50 },
  { header: 'Total Amount ($)', key: 'totalAmount', width: 18 }
];

const CONTACT_COLUMNS = [
  { header: 'Submission ID', key: 'id', width: 16 },
  { header: 'Timestamp', key: 'timestamp', width: 25 },
  { header: 'Contact Method', key: 'contactMethod', width: 20 },
  { header: 'Contact Detail', key: 'contactInfo', width: 30 },
  { header: 'Message', key: 'message', width: 50 }
];

/**
 * Initialize or get orders workbook
 */
async function getOrdersWorkbook() {
  const workbook = new ExcelJS.Workbook();
  if (fs.existsSync(ORDERS_FILE)) {
    await workbook.xlsx.readFile(ORDERS_FILE);
  } else {
    const sheet = workbook.addWorksheet('Orders');
    sheet.columns = ORDER_COLUMNS;

    // Style header row
    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFF' }, size: 11 };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '2C5E43' }
    };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
  }
  return workbook;
}

/**
 * Initialize or get contacts workbook
 */
async function getContactsWorkbook() {
  const workbook = new ExcelJS.Workbook();
  if (fs.existsSync(CONTACTS_FILE)) {
    await workbook.xlsx.readFile(CONTACTS_FILE);
  } else {
    const sheet = workbook.addWorksheet('Contacts');
    sheet.columns = CONTACT_COLUMNS;

    // Style header row
    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFF' }, size: 11 };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '1E3A8A' }
    };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
  }
  return workbook;
}

/**
 * Append order to orders.xlsx
 */
export async function saveOrder(orderData) {
  const workbook = await getOrdersWorkbook();
  let sheet = workbook.getWorksheet('Orders');
  if (!sheet) {
    sheet = workbook.addWorksheet('Orders');
    sheet.columns = ORDER_COLUMNS;
  }

  const orderId = `ORD-${Date.now().toString().slice(-6)}`;
  const timestamp = new Date().toLocaleString('en-US', { timeZoneName: 'short' });

  // Format items array into readable string
  const itemsString = orderData.items
    .map(i => `${i.name} (x${i.quantity}) - $${(i.price * i.quantity).toFixed(2)}`)
    .join('; ');

  const totalStr = `$${Number(orderData.totalAmount).toFixed(2)}`;

  // Append using explicit array format so key-mapping is guaranteed regardless of readFile state
  const row = sheet.addRow([
    orderId,
    timestamp,
    orderData.fullName,
    orderData.email,
    orderData.phone,
    orderData.address,
    orderData.city,
    orderData.postalCode,
    itemsString,
    totalStr
  ]);

  row.alignment = { vertical: 'middle', horizontal: 'left' };

  await workbook.xlsx.writeFile(ORDERS_FILE);

  return {
    orderId,
    timestamp,
    status: 'SUCCESS'
  };
}

/**
 * Append contact inquiry to contacts.xlsx
 */
export async function saveContact(contactData) {
  const workbook = await getContactsWorkbook();
  let sheet = workbook.getWorksheet('Contacts');
  if (!sheet) {
    sheet = workbook.addWorksheet('Contacts');
    sheet.columns = CONTACT_COLUMNS;
  }

  const id = `MSG-${Date.now().toString().slice(-6)}`;
  const timestamp = new Date().toLocaleString('en-US', { timeZoneName: 'short' });

  const row = sheet.addRow([
    id,
    timestamp,
    contactData.contactMethod,
    contactData.contactInfo,
    contactData.message
  ]);

  row.alignment = { vertical: 'middle', horizontal: 'left' };

  await workbook.xlsx.writeFile(CONTACTS_FILE);

  return {
    id,
    timestamp,
    status: 'SUCCESS'
  };
}
