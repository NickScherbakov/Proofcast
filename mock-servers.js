#!/usr/bin/env node
const { startMockServers } = require('./demo.js');

console.log('🚀 Запуск Mock серверов для разработки...\n');

const { coreServer, verifierServer } = startMockServers();

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Останавливаем Mock серверы...');
    coreServer.close();
    verifierServer.close();
    process.exit(0);
});

console.log('\n📡 Mock серверы готовы:');
console.log('   - Core Service: http://localhost:8080/health');
console.log('   - Verifier Service: http://localhost:8081/health');
console.log('\nДля остановки нажмите Ctrl+C');
