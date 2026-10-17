import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { saveOrder, saveContact } from './excelService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Validation helpers
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s().-]{7,25}$/;

/**
 * Handle Order Submissions
 */
app.post('/api/orders', async (req, res) => {
  try {
    const { items, fullName, email, phone, address, city, postalCode, totalAmount } = req.body;

    // Field presence validation
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return res.status(400).json({ error: 'Full name is required.' });
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    if (!phone || typeof phone !== 'string' || !PHONE_REGEX.test(phone.trim())) {
      return res.status(400).json({ error: 'A valid phone number is required.' });
    }

    if (!address || typeof address !== 'string' || !address.trim()) {
      return res.status(400).json({ error: 'Street address is required.' });
    }

    if (!city || typeof city !== 'string' || !city.trim()) {
      return res.status(400).json({ error: 'City is required.' });
    }

    if (!postalCode || typeof postalCode !== 'string' || !postalCode.trim()) {
      return res.status(400).json({ error: 'Postal code is required.' });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'At least one product must be selected.' });
    }

    // Validate items array
    for (const item of items) {
      if (!item.name || typeof item.name !== 'string') {
        return res.status(400).json({ error: 'Each item must have a valid name.' });
      }
      const qty = Number(item.quantity);
      if (!Number.isInteger(qty) || qty < 1) {
        return res.status(400).json({ error: 'Item quantities must be positive integers.' });
      }
      const price = Number(item.price);
      if (isNaN(price) || price < 0) {
        return res.status(400).json({ error: 'Item prices must be valid non-negative numbers.' });
      }
    }

    const numericTotal = Number(totalAmount);
    if (isNaN(numericTotal) || numericTotal <= 0) {
      return res.status(400).json({ error: 'Total amount must be greater than 0.' });
    }

    const result = await saveOrder({
      items,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
      totalAmount: numericTotal
    });

    console.log(`[ORDER RECORDED] ${result.orderId} for ${fullName.trim()}`);

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

/**
 * Handle Contact Inquiries
 */
async function handleContactRequest(req, res) {
  try {
    const { name, email, product, message, contactMethod, contactInfo } = req.body;

    const resolvedName = (name || '').trim();
    const resolvedContactInfo = (email || contactInfo || '').trim();
    const resolvedMessage = (message || '').trim();
    const resolvedProduct = (product || contactMethod || 'General Inquiry').trim();

    if (!resolvedContactInfo) {
      return res.status(400).json({ error: 'Email or contact detail is required.' });
    }

    if (email && !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    if (!resolvedMessage) {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    const result = await saveContact({
      name: resolvedName || 'N/A',
      contactInfo: resolvedContactInfo,
      product: resolvedProduct,
      message: resolvedMessage
    });

    console.log(`[CONTACT RECORDED] ${result.id} for ${resolvedName || resolvedContactInfo}`);

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
}

app.post('/api/contact', handleContactRequest);

// Serve frontend build if dist folder exists
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(distPath, 'index.html');
  if (req.accepts('html') && fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  next();
});

app.listen(PORT, () => {
  console.log(`🚀 Express server running on http://localhost:${PORT}`);
  console.log(`📁 Excel data stored in directory: ${path.join(__dirname, '..', 'data')}`);
});
