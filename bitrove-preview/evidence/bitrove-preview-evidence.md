# Bitrove Midnight Preview Evidence

Generated: 2026-04-05T07:44:16.549Z
Network: preview
Contract key: `marketplace-escrow`
Contract address: `e6de8594fab596e95b1acd962bd3d1349b87e5cb92b29bb0e422fbce710f6a0b`
Deployment tx hash: `10cc4b0c88c056385c4738c192068bdfa9747724a4142a9c69f1a6f82b48c602`
Public contract source: `bitrove-preview/contracts/marketplace_escrow.compact`
Compiled artifact hash: `da169f69621017c2756ae0f40460f8e7924af13171bdd1982c04a8cdc154e9fa`
Same-buyer confirm satisfied: `true`
Wrong-wallet rejection observed: `true`

## On-chain calls

- Fund tx: https://explorer.preview.midnight.network/transactions/73efadb2950fb01308e09b2b0bd920e4808a13a97ea1535bfdcd3e0e2659603d
- Confirm tx: https://explorer.preview.midnight.network/transactions/18a8c73f19efd3f840fba3501bb11f3289e83877e5aea60802c7dc0d51ed0c34
- Wrong-wallet confirm result: `failed assert: confirm must be submitted by the same buyer wallet that funded the escrow`

## Current escrow state

```json
{
  "escrow_id": 2001,
  "buyer_binding": {
    "0": 67,
    "1": 9,
    "2": 19,
    "3": 71,
    "4": 183,
    "5": 148,
    "6": 81,
    "7": 67,
    "8": 184,
    "9": 203,
    "10": 163,
    "11": 141,
    "12": 0,
    "13": 255,
    "14": 248,
    "15": 194,
    "16": 123,
    "17": 89,
    "18": 124,
    "19": 55,
    "20": 202,
    "21": 44,
    "22": 80,
    "23": 120,
    "24": 120,
    "25": 230,
    "26": 105,
    "27": 145,
    "28": 206,
    "29": 76,
    "30": 241,
    "31": 110
  },
  "seller_binding": {
    "0": 110,
    "1": 201,
    "2": 180,
    "3": 137,
    "4": 100,
    "5": 74,
    "6": 226,
    "7": 61,
    "8": 116,
    "9": 143,
    "10": 96,
    "11": 242,
    "12": 123,
    "13": 239,
    "14": 61,
    "15": 122,
    "16": 169,
    "17": 91,
    "18": 28,
    "19": 211,
    "20": 196,
    "21": 197,
    "22": 175,
    "23": 179,
    "24": 8,
    "25": 189,
    "26": 117,
    "27": 169,
    "28": 177,
    "29": 149,
    "30": 96,
    "31": 30
  },
  "parcel_reference": {
    "0": 150,
    "1": 155,
    "2": 100,
    "3": 6,
    "4": 135,
    "5": 5,
    "6": 236,
    "7": 77,
    "8": 119,
    "9": 199,
    "10": 110,
    "11": 209,
    "12": 175,
    "13": 79,
    "14": 208,
    "15": 115,
    "16": 5,
    "17": 107,
    "18": 119,
    "19": 111,
    "20": 213,
    "21": 0,
    "22": 144,
    "23": 240,
    "24": 141,
    "25": 161,
    "26": 186,
    "27": 142,
    "28": 76,
    "29": 184,
    "30": 191,
    "31": 44
  },
  "amount_minor_units": 125000,
  "buyer_actor_binding": {
    "0": 158,
    "1": 143,
    "2": 95,
    "3": 187,
    "4": 95,
    "5": 158,
    "6": 56,
    "7": 83,
    "8": 141,
    "9": 175,
    "10": 79,
    "11": 90,
    "12": 30,
    "13": 84,
    "14": 146,
    "15": 161,
    "16": 231,
    "17": 20,
    "18": 195,
    "19": 72,
    "20": 214,
    "21": 213,
    "22": 237,
    "23": 199,
    "24": 207,
    "25": 192,
    "26": 0,
    "27": 85,
    "28": 83,
    "29": 118,
    "30": 228,
    "31": 78
  },
  "funded": true,
  "confirmed": true,
  "status_code": 2
}
```
