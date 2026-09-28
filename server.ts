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

// In-memory store for demo requests
const demoRequests: any[] = [];

const TARGET_EMAIL = 'selmanutkumarmara@gmail.com';

// Express API route for Demo Reservation Requests
app.post('/api/demo-request', async (req, res) => {
  try {
    const { fullName, clubName, phone, email, branch, studentEstimate, selectedPlan } = req.body;

    const requestData = {
      id: `DEMO-${Date.now()}`,
      fullName: fullName || 'İsimsiz Yönetici',
      clubName: clubName || 'Belirtilmedi',
      phone: phone || 'Belirtilmedi',
      email: email || 'Belirtilmedi',
      branch: branch || 'Basketbol',
      studentEstimate: studentEstimate || 'Belirtilmedi',
      selectedPlan: selectedPlan || 'Kulüp & Akademi',
      targetRecipient: TARGET_EMAIL,
      submittedAt: new Date().toISOString(),
    };

    demoRequests.push(requestData);
    console.log(`[DEMO REZERVED] New reservation for ${TARGET_EMAIL}:`, requestData);

    // If SMTP environment variables exist, attempt to send email via SMTP
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
      message: `Demo talebiniz kaydedildi ve ${TARGET_EMAIL} adresine yönlendirildi.`,
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

// Admin API to fetch recorded demo requests
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
