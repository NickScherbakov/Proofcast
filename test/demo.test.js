const assert = require('assert');
const { createProof, verifyProof, startMockServers } = require('../demo.js');

describe('Proofcast Demo Tests', () => {
    let mockServers;
    
    before(async () => {
        // Запуск mock серверов для тестов
        mockServers = startMockServers();
        // Даем время на запуск
        await new Promise(resolve => setTimeout(resolve, 1000));
    });
    
    after(() => {
        // Остановка mock серверов
        if (mockServers) {
            mockServers.coreServer.close();
            mockServers.verifierServer.close();
        }
    });
    
    describe('createProof', () => {
        it('должен создать proof для валидного события', async () => {
            const event = {
                type: 'financial_transaction',
                amount: 1000,
                from: 'account_001',
                to: 'account_002'
            };
            
            const proofId = await createProof(event);
            assert(proofId, 'Proof ID должен быть возвращен');
            assert(proofId.startsWith('proof_'), 'Proof ID должен начинаться с prefix');
        });
        
        it('должен обработать ошибку при некорректном событии', async () => {
            try {
                await createProof(null);
                assert.fail('Должна быть выброшена ошибка');
            } catch (error) {
                assert(error.message, 'Сообщение об ошибке должно присутствовать');
            }
        });
    });
    
    describe('verifyProof', () => {
        it('должен верифицировать существующий proof', async () => {
            const proofId = 'proof_test123';
            const result = await verifyProof(proofId);
            
            assert.strictEqual(result.valid, true, 'Proof должен быть валидным');
            assert.strictEqual(result.proofId, proofId, 'Proof ID должен совпадать');
            assert.strictEqual(result.validators, 3, 'Количество валидаторов должно быть 3');
        });
    });
});
