const axios = require('axios');

// Конфигурация API с таймаутами
const api = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Базовые URL сервисов
const CORE_URL = 'http://localhost:8080';
const VERIFIER_URL = 'http://localhost:8081';
const UI_URL = 'http://localhost:3000';

async function waitForService(url, serviceName, maxAttempts = 10) {
    console.log(`⏳ Ожидание запуска ${serviceName}...`);
    
    for (let i = 0; i < maxAttempts; i++) {
        try {
            await api.get(`${url}/health`);
            console.log(`✅ ${serviceName} готов к работе`);
            return true;
        } catch (error) {
            console.log(`   Попытка ${i + 1}/${maxAttempts} - ${serviceName} недоступен`);
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
    
    throw new Error(`❌ ${serviceName} не удалось запустить за ${maxAttempts} попыток`);
}

async function createProof(eventData) {
    try {
        console.log('📝 Создание proof для события:', eventData);
        
        const response = await api.post(`${CORE_URL}/api/proofs`, {
            event: eventData,
            timestamp: new Date().toISOString()
        });
        
        console.log('✅ Proof создан:', response.data.proofId);
        return response.data.proofId;
    } catch (error) {
        console.error('❌ Ошибка создания proof:', error.message);
        throw error;
    }
}

async function verifyProof(proofId) {
    try {
        console.log('🔍 Верификация proof:', proofId);
        
        const response = await api.get(`${VERIFIER_URL}/api/verify/${proofId}`);
        
        if (response.data.valid) {
            console.log('✅ Proof верифицирован успешно');
        } else {
            console.log('⚠️ Proof не прошел верификацию');
        }
        
        return response.data;
    } catch (error) {
        console.error('❌ Ошибка верификации:', error.message);
        throw error;
    }
}

async function runDemo() {
    console.log('🚀 Запуск Proofcast Demo\n');
    
    try {
        // Проверяем доступность сервисов
        await waitForService(CORE_URL, 'Core Service');
        await waitForService(VERIFIER_URL, 'Verifier Service');
        
        // Демо-сценарий
        console.log('\n📋 Демо-сценарий: Создание и верификация события\n');
        
        const sampleEvent = {
            type: 'financial_transaction',
            amount: 1000,
            from: 'account_001',
            to: 'account_002',
            description: 'Demo payment for Proofcast verification'
        };
        
        // Создаем proof
        const proofId = await createProof(sampleEvent);
        
        // Ждем немного для обработки
        console.log('⏳ Ожидание обработки...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Верифицируем proof
        const verificationResult = await verifyProof(proofId);
        
        console.log('\n📊 Результаты демо:');
        console.log('   - Proof ID:', proofId);
        console.log('   - Статус верификации:', verificationResult.valid ? '✅ Валиден' : '❌ Невалиден');
        console.log('   - UI доступен по адресу:', UI_URL);
        
        console.log('\n🎉 Демо завершено успешно!');
        
    } catch (error) {
        console.error('\n💥 Ошибка в демо:', error.message);
        console.log('\n🔧 Убедитесь что:');
        console.log('   1. Запущен docker-compose: npm run docker:up');
        console.log('   2. Все сервисы доступны и healthcheck проходит');
        console.log('   3. Порты 8080, 8081, 3000 свободны');
        process.exit(1);
    }
}

if (require.main === module) {
    runDemo();
}

module.exports = { createProof, verifyProof, runDemo };