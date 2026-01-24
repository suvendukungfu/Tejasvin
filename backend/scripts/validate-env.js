const fs = require('fs');
const path = require('path');

const REQUIRED_VARS = [
    'MONGO_URI',
    'JWT_SECRET',
    'VAPID_PUBLIC_KEY',
    'VAPID_PRIVATE_KEY',
    'EMAIL'
];

console.log('--- 🚀 Environment Validation ---');

let missing = [];
REQUIRED_VARS.forEach(v => {
    if (!process.env[v]) {
        missing.push(v);
    }
});

if (missing.length > 0) {
    console.error('❌ Missing Required Variables:', missing.join(', '));
    process.exit(1);
} else {
    console.log('✅ All environment variables are set.');
}
