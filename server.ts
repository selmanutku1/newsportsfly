import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Enabling CORS for cross-domain/subdomain panel access (https://webapp.sportsfly.com.tr)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// In-memory store for demo requests
const demoRequests: any[] = [];

const TARGET_EMAIL = 'selmanutkumarmara@gmail.com';
const DEFAULT_PANEL_WEBHOOK = 'https://webapp.sportsfly.com.tr/api/demo-requests';

// Express API route for Demo Reservation Requests
// Google Search Console Verification File
app.get('/google31cb5e99cc74c68a.html', (_req, res) => {
  res.status(200).type('text/html').send('google-site-verification: google31cb5e99cc74c68a.html');
});

app.post('/api/demo-request', async (req, res) => {
  try {
    const { fullName, clubName, phone, email, branch, studentEstimate, selectedPlan, customWebhookUrl } = req.body;

    const requestData = {
      id: `DEMO-${Date.now()}`,
      fullName: fullName || 'İsimsiz Yönetici',
      clubName: clubName || 'Belirtilmedi',
      phone: phone || 'Belirtilmedi',
      email: email || 'Belirtilmedi',
      branch: branch || 'Basketbol',
      studentEstimate: studentEstimate || 'Belirtilmedi',
      selectedPlan: selectedPlan || 'Kulüp & Akademi',
      source: 'sportsfly.com.tr',
      targetPanel: 'https://webapp.sportsfly.com.tr',
      targetRecipient: TARGET_EMAIL,
      submittedAt: new Date().toISOString(),
    };

    demoRequests.push(requestData);
    console.log(`[DEMO REZERVED] New reservation:`, requestData);

    // 1. Automatic Webhook Forwarding to Subdomain Panel (https://webapp.sportsfly.com.tr)
    const webhookUrl =
      customWebhookUrl ||
      process.env.PANEL_WEBHOOK_URL ||
      process.env.SUBDOMAIN_PANEL_URL ||
      DEFAULT_PANEL_WEBHOOK;

    if (webhookUrl) {
      try {
        console.log(`[WEBHOOK FORWARDING] Dispatching to webapp.sportsfly.com.tr: ${webhookUrl}`);
        let response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Source-Domain': 'sportsfly.com.tr',
          },
          body: JSON.stringify(requestData),
        });

        // If /api/demo-requests returns 404, also try singular /api/demo-request on webapp.sportsfly.com.tr
        if (response.status === 404 && webhookUrl.endsWith('/api/demo-requests')) {
          const fallbackUrl = 'https://webapp.sportsfly.com.tr/api/demo-request';
          response = await fetch(fallbackUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-Source-Domain': 'sportsfly.com.tr',
            },
            body: JSON.stringify(requestData),
          });
        }
        console.log(`[WEBHOOK RESPONSE] Status: ${response.status}`);
      } catch (webhookErr) {
        console.error(`[WEBHOOK ERROR] Could not forward to ${webhookUrl}:`, webhookErr);
      }
    }

    // 2. If SMTP environment variables exist, attempt to send email via SMTP
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"SportsFly Demo Otomasyonu" <${process.env.SMTP_USER}>`,
          to: TARGET_EMAIL,
          subject: `🚀 Yeni Demo Talebi: ${requestData.clubName} - ${requestData.fullName}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
              <h2 style="color: #2563eb;">Yeni SportsFly Demo Rezervasyonu</h2>
              <p>Aşağıdaki müşteri SportsFly canlı demosu ve aktivasyon bağlantısı talep etti:</p>
              <ul>
                <li><strong>Kulüp / Akademi Adı:</strong> ${requestData.clubName}</li>
                <li><strong>Yetkili Adı Soyadı:</strong> ${requestData.fullName}</li>
                <li><strong>Telefon / WhatsApp:</strong> ${requestData.phone}</li>
                <li><strong>E-posta:</strong> ${requestData.email}</li>
                <li><strong>Spor Branşı:</strong> ${requestData.branch}</li>
                <li><strong>Tahmini Sporcu Sayısı:</strong> ${requestData.studentEstimate}</li>
                <li><strong>Seçilen Paket:</strong> ${requestData.selectedPlan}</li>
                <li><strong>Tarih:</strong> ${new Date(requestData.submittedAt).toLocaleString('tr-TR')}</li>
              </ul>
              <p style="color: #64748b; font-size: 12px;">Bu bildirim otomatik olarak <strong>${TARGET_EMAIL}</strong> adresine gönderilmiştir.</p>
            </div>
          `,
        });
        console.log(`[EMAIL SENT] Notification successfully dispatched to ${TARGET_EMAIL}`);
      } catch (mailErr) {
        console.error(`[EMAIL ERROR] Failed to dispatch email via SMTP:`, mailErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: `Demo talebiniz kaydedildi ve alt alan adınızdaki panele iletildi.`,
      data: requestData,
    });
  } catch (error: any) {
    console.error('Error handling demo request:', error);
    return res.status(500).json({
      success: false,
      message: 'Demo talebi işlenirken bir sunucu hatası oluştu.',
    });
  }
});

// Admin API to fetch recorded demo requests (Accessible by https://webapp.sportsfly.com.tr)
app.get('/api/demo-requests', (_req, res) => {
  res.json({
    success: true,
    recipient: TARGET_EMAIL,
    count: demoRequests.length,
    requests: demoRequests,
  });
});

// Mount Vite middleware in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = await import('fs').then((fs) =>
          fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
        );
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
    console.log(`Demo notifications destination set to: ${TARGET_EMAIL}`);
  });
}

startServer();
