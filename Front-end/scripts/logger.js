const fs = require('fs');
const path = require('path');

// Pasta e arquivo de log
const LOG_DIR = path.join(__dirname, '..', 'storage', 'logs');
const LOG_FILE = path.join(LOG_DIR, 'app.log');

// Cria pasta se não existir
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

// Pega argumentos do CMD
const level = process.argv[2]; // info, warn, error
const message = process.argv.slice(3).join(' ');

if (!level || !message) {
  console.log('Uso: npm run logger [info|warn|error] mensagem');
  process.exit(1);
}

// Formata estilo Laravel
const timestamp = new Date().toISOString();
const logLine = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;

// Salva no arquivo
fs.appendFileSync(LOG_FILE, logLine, 'utf8');
console.log(`✅ Log registrado em ${LOG_FILE}`);
