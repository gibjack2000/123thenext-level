import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, '../data/db.json');

// Ensure db.json exists on initialization
async function initDb() {
  try {
    await fs.mkdir(path.dirname(DB_FILE), { recursive: true });
    try {
      await fs.access(DB_FILE);
    } catch {
      const initialSchema = {
        orders: [],
        order_items: [],
        download_tokens: []
      };
      await fs.writeFile(DB_FILE, JSON.stringify(initialSchema, null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// Load database contents into memory
async function readDb() {
  await initDb();
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database file:', error);
    return { orders: [], order_items: [], download_tokens: [] };
  }
}

// Save database contents to disk
async function writeDb(data) {
  try {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to database file:', error);
  }
}

// --- Database Operations ---

export const db = {
  // Orders
  async createOrder({ stripe_session_id, stripe_payment_intent_id, customer_email, amount_total, currency, payment_status = 'pending' }) {
    const data = await readDb();
    
    // Check if order already exists (idempotency)
    let order = data.orders.find(o => o.stripe_session_id === stripe_session_id);
    const now = new Date().toISOString();
    
    if (order) {
      order.stripe_payment_intent_id = stripe_payment_intent_id || order.stripe_payment_intent_id;
      order.customer_email = customer_email || order.customer_email;
      order.amount_total = amount_total !== undefined ? amount_total : order.amount_total;
      order.currency = currency || order.currency;
      order.payment_status = payment_status;
      order.updated_at = now;
    } else {
      order = {
        id: crypto.randomUUID(),
        stripe_session_id,
        stripe_payment_intent_id,
        customer_email,
        amount_total,
        currency,
        payment_status,
        created_at: now,
        updated_at: now
      };
      data.orders.push(order);
    }
    
    await writeDb(data);
    return order;
  },

  async getOrder(orderId) {
    const data = await readDb();
    return data.orders.find(o => o.id === orderId);
  },

  async getOrderBySessionId(sessionId) {
    const data = await readDb();
    return data.orders.find(o => o.stripe_session_id === sessionId);
  },

  async updateOrderStatus(sessionId, status, paymentIntentId = null) {
    const data = await readDb();
    const order = data.orders.find(o => o.stripe_session_id === sessionId);
    if (order) {
      order.payment_status = status;
      if (paymentIntentId) {
        order.stripe_payment_intent_id = paymentIntentId;
      }
      order.updated_at = new Date().toISOString();
      await writeDb(data);
    }
    return order;
  },

  // Order Items
  async createOrderItems(items) {
    const data = await readDb();
    const createdItems = [];
    
    for (const item of items) {
      // Check duplicate item
      const exists = data.order_items.some(
        oi => oi.order_id === item.order_id && oi.product_id === item.product_id
      );
      if (exists) continue;

      const orderItem = {
        id: crypto.randomUUID(),
        order_id: item.order_id,
        product_id: item.product_id,
        quantity: item.quantity || 1
      };
      data.order_items.push(orderItem);
      createdItems.push(orderItem);
    }
    
    if (createdItems.length > 0) {
      await writeDb(data);
    }
    return createdItems;
  },

  async getOrderItems(orderId) {
    const data = await readDb();
    return data.order_items.filter(oi => oi.order_id === orderId);
  },

  // Download Tokens
  async createDownloadToken({ order_id, product_id, expires_at, max_downloads = 3 }) {
    const data = await readDb();
    
    // Check if token already exists for this order + product
    let tokenRecord = data.download_tokens.find(
      t => t.order_id === order_id && t.product_id === product_id
    );

    if (!tokenRecord) {
      const token = crypto.randomBytes(32).toString('hex');
      tokenRecord = {
        id: crypto.randomUUID(),
        token,
        order_id,
        product_id,
        expires_at,
        max_downloads,
        download_count: 0,
        created_at: new Date().toISOString()
      };
      data.download_tokens.push(tokenRecord);
      await writeDb(data);
    }

    return tokenRecord;
  },

  async getDownloadToken(token) {
    const data = await readDb();
    return data.download_tokens.find(t => t.token === token);
  },

  async getDownloadTokensByOrder(orderId) {
    const data = await readDb();
    return data.download_tokens.filter(t => t.order_id === orderId);
  },

  async incrementDownloadCount(token) {
    const data = await readDb();
    const tokenRecord = data.download_tokens.find(t => t.token === token);
    if (tokenRecord) {
      tokenRecord.download_count += 1;
      await writeDb(data);
    }
    return tokenRecord;
  }
};
