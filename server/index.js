import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { saveOrder, saveContact } from './excelService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API Routes
app.post('/api/orders', async (req, res) => {
  try {
    const { items, fullName, email, phone, address, city, postalCode, totalAmount } = req.body;

    // Server-side Validation
    if (!fullName || !email || !phone || !address || !city || !postalCode) {
      return res.status(400).json({ error: 'All customer fields are required.' });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'At least one product must be selected.' });
    }

    const result = await saveOrder({
      items,
      fullName,
      email,
      phone,
      address,
      city,
      postalCode,
      totalAmount
    });

    console.log(`[ORDER RECORDED] ${result.orderId} for ${fullName}`);

    return res.status(200).json({
      success: true,
      message: 'Order placed successfully',
      orderId: result.orderId,
      timestamp: result.timestamp
    });
  } catch (error) {
    console.error('Error saving order to Excel:', error);
    return res.status(500).json({ error: 'Failed to record order on server.' });
  }
});

app.post('/api/contacts', async (req, res) => {
  try {
    const { contactMethod, contactInfo, message } = req.body;

    if (!contactMethod || !contactInfo || !message) {
      return res.status(400).json({ error: 'All contact fields are required.' });
    }

    const result = await saveContact({
      contactMethod,
      contactInfo,
      message
    });

    console.log(`[CONTACT RECORDED] ${result.id} via ${contactMethod}`);

    return res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
      id: result.id,
      timestamp: result.timestamp
    });
  } catch (error) {
    console.error('Error saving contact to Excel:', error);
    return res.status(500).json({ error: 'Failed to record contact inquiry on server.' });
  }
});

// Serve frontend build if dist folder exists
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(distPath, 'index.html');
  if (req.accepts('html') && fsExists(indexPath)) {
    return res.sendFile(indexPath);
  }
  next();
});

function fsExists(pathStr) {
  try {
    return fs.existsSync(pathStr);
  } catch (e) {
    return false;
  }
}

app.listen(PORT, () => {
  console.log(`🚀 Express server running on http://localhost:${PORT}`);
  console.log(`📁 Excel data stored in directory: ${path.join(__dirname, '..', 'data')}`);
});
