# Proofcast

**Dynamically verifiable infrastructure for documented causality.**  
No promises. Just receipts.

## 🧩 What is Proofcast?

`Proofcast` is a stack for generating, signing, and publishing cryptographically verifiable receipts of digital actions — DNS lookups, API calls, policy triggers.

Each action yields a receipt.  
Each receipt links to a cause.  
Each cause maps to a declared policy.

## 🔐 Core Principles

- Proof-by-default
- Trust is optional, verification is the interface
- Jurisdiction-aware execution
- Zero Knowledge traceability

## 📦 Modules

- `proofcast-core`: policy engine + receipt generator
- `proofcast-verifier`: minimal client-side receipt validator
- `proofcast-ui`: visualization of causality chains
- `proofcast-pub`: inclusion logs & Merkle bundles

## 🤝 Integrations

- Rekor JSON output
- ZK-trace proof API
- Time attestation via Roughtime / TSA
- RPKI & ASPA hygiene support

## 🧠 Who it's for?

- Fintech & Medtech with regulatory pressure
- Auditors & forensic analysts
- Compliance-driven API services
- Sovereign tech architects

## 💡 Tagline

> **Doubt everything. Verify with Proofcast.**

## Getting Started

### Prerequisites

- Docker & Docker Compose  
- Node.js (v14+) and npm  

### Clone the repository

```bash
git clone https://github.com/NickScherbakov/Proofcast.git
cd Proofcast
```

### Start the demo stack

```bash
docker-compose up -d
```

This will launch three services:

- `proofcast-core` (port 4000) – generates receipts via REST API  
- `proofcast-verifier` (port 4001) – verifies receipts  
- `proofcast-ui` (port 3000) – visualizes the causal chain graph  

### Run the demo script

```bash
npm install axios
node demo.js
```

You’ll see in your console:

1. The generated receipt  
2. The verification result with full details  

### Explore the UI

Open your browser at http://localhost:3000 to inspect the live causal-chain graph.

---

## Example Scenarios

1. Obtain a receipt for an HTTP request to `/status`  
2. Verify the same receipt via CLI (`demo.js`) and via the UI  
3. Inspect metadata (timestamps, Merkle proofs, policy identifiers)

---

## Troubleshooting

- If containers fail to start, run `docker-compose logs <service>` to inspect errors.  
- Make sure ports 3000–4001 are free on your host.  
- If `demo.js` throws a network error, confirm `proofcast-core` and `proofcast-verifier` are healthy (`docker ps`).  

---

## Next Steps

- Tweak policies in `config/core/*.yaml` to match your compliance requirements  
- Integrate receipt submission into your SIEM or API gateway  
- Load-test `proofcast-core` with parallel requests to measure latency and throughput  
- Share feedback, file issues or contribute new plugins under `proofcast-core/plugins`
```
