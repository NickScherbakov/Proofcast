# Proofcast

Dynamically verifiable infrastructure for documented causality

[![CI Status](https://github.com/NickScherbakov/Proofcast/actions/workflows/ci.yml/badge.svg)](https://github.com/NickScherbakov/Proofcast/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Demo Version](https://img.shields.io/npm/v/proofcast-demo?label=demo)](https://www.npmjs.com/package/proofcast-demo)

## 🎯 Overview

Proofcast provides a robust infrastructure for creating and verifying cryptographic proofs of events and their causality relationships. Built with zero-knowledge proofs and distributed verification, it ensures tamper-evident documentation of critical business processes.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Proofcast UI  │    │ Proofcast Core  │    │ Proofcast       │
│                 │◄──►│                 │◄──►│ Verifier        │
│ React Frontend  │    │ Proof Generator │    │ ZK Validator    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 16+ (for demo)

### 1. Clone and Setup
```bash
git clone https://github.com/NickScherbakov/Proofcast.git
cd Proofcast
npm install
```

### 2. Configure Services
```bash
# Copy sample configurations
cp -r config/sample config
# Edit configurations as needed
nano config/policy.yaml
```

### 3. Build and Run
```bash
# Start all services
npm run docker:up

# Run demonstration
npm run demo
```

### 4. Access Services
- **UI Dashboard**: http://localhost:3000
- **Core API**: http://localhost:8080
- **Verifier API**: http://localhost:8081

## 🔧 Building UI

To build the UI component separately:

```bash
cd proofcast-ui
npm install
npm run build
```

The build artifacts will be available in the `dist/` directory and used by the Docker container.

## 📋 Use Cases

### Financial Technology
- **Transaction Verification**: Prove payment execution without revealing amounts
- **Compliance Auditing**: Generate tamper-proof audit trails
- **Cross-border Settlements**: Verify international transfers with privacy

### Medical Technology  
- **Patient Data Integrity**: Prove medical record authenticity
- **Drug Traceability**: Track pharmaceutical supply chains
- **Clinical Trial Validation**: Verify research data without exposing patient information

### Supply Chain
- **Product Authenticity**: Prove genuine product origins
- **Quality Assurance**: Verify manufacturing standards compliance
- **Logistics Tracking**: Create immutable shipment proofs

## 🛠️ Configuration

### Core Service (`config/core.yaml`)
```yaml
server:
  host: "0.0.0.0"
  port: 8080
  
zk_proofs:
  timeout: "10m"
  worker_threads: 4
```

### Verification Policy (`config/policy.yaml`)
```yaml
verification:
  min_confirmation_time: 30
  required_validators: 3
  
allowed_events:
  - "financial_transaction"
  - "document_signing"
```

## 📚 API Reference

### Core Service Endpoints

#### Create Proof
```http
POST /api/proofs
Content-Type: application/json

{
  "event": {
    "type": "financial_transaction",
    "amount": 1000,
    "from": "account_001",
    "to": "account_002"
  },
  "timestamp": "2025-01-10T12:00:00Z"
}
```

#### Get Proof Status
```http
GET /api/proofs/{proofId}
```

### Verifier Service Endpoints

#### Verify Proof
```http
GET /api/verify/{proofId}
```

Returns:
```json
{
  "valid": true,
  "proofId": "proof_abc123",
  "timestamp": "2025-01-10T12:00:00Z",
  "validators": 3
}
```

## 🧪 Testing

```bash
# Run linting
npm run lint

# Test Docker services
npm run docker:up
curl -f http://localhost:8080/health
curl -f http://localhost:8081/health
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test them
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Documentation](docs/)
- [Issue Tracker](https://github.com/NickScherbakov/Proofcast/issues)
- [Discussions](https://github.com/NickScherbakov/Proofcast/discussions)