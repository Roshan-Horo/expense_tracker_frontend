export const signUpUserSchema = {
  "type": "object",
  "properties": {
    "name": {
      "type": "object",
      "properties": {
        "first": {"type": "string", "minLength": 1},
        "middle": {"type": "string"},
        "last": {"type": "string", "minLength": 1}
      },
      "required": ["first", "last"]
    },
    "mobile": {"type": "string", "minLength": 10, "maxLength": 10 , "pattern": "^[789]{1}[0-9]{9}$"},
    "email": {"type": "string", "pattern": "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"},
    "passcode": {"type": "string", "minLength": 6, "maxLength": 6 },

  },
  "required": ["name", "mobile", "email", "passcode"]
}

export const loginUserSchema = {
  "type": "object",
  "properties": {
    "email": {"type": "string", "pattern": "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"},
    "passcode": {"type": "string", "minLength": 6, "maxLength": 6 },
  },
  "required": ["email", "passcode"]
}

// address schema
export const addressSchema = {
  "id": "/SimpleAddresses",
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "addressType": {"type": "string", "minLength": 1, "maxLength": 200},
      "address": {"type": "string", "minLength": 1, "maxLength": 200},
      "city": {"type": "string", "minLength": 1, "maxLength": 200},
      "pinCode": {"type": "string", "minLength": 6, "maxLength": 6, "pattern": "^[1-9]{1}[0-9]{5}$"},
      "state": {"type": "string", "minLength": 3},
      "stateCode": {"type": "number", "maximum": 50},
      "country": {"type": "string", "minLength": 3, "maxLength": 3},
    },
    "required": ["addressType","address", "city", "pinCode", "state", "country", "stateCode"]
  }

}

// document schema
export const documentsSchema = {
  "id": "/SimpleDocuments",
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "docType": {"type": "string", "enum": ["GST", "COI", "CIN", "TAN", "PAN", "AADHAAR"] },
      "docValue": {"type": "string", "minLength": 5},
      "docImage": {"type": "string"}
  },
  "required": ["docType", "docValue"]
  }
}

// card Holder schema
export const cardHolderSchema = {
  "type": "object",
  "properties": {
    "userId": {"type": "string", "minLength": 5},
    "subBusinessId": {"type": "string", "minLength": 5},
    "dateOfBirth": {"type": "string", "minLength": 10, "maxLength": 10, "pattern": "^[0-9]{4}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}$"},
    "gender": {"type": "string", "enum": ["MALE","FEMALE", "OTHERS"] },
    "addresses": {"$ref": "/SimpleAddresses"},
    "documents": {"$ref": "/SimpleDocuments"}
  },
  "required": ["userId","gender", "dateOfBirth", "addresses", "documents"]
}

export const orgSchema = {
  "id": "/SimpleOrg",
  "type": "object",
  "properties": {
    "name": {"type": "string", "minLength": 1, "maxLength": 50},
    "description": {"type": "string"},
    "businessType": {"type": "string", "enum": ["PRIVATE", "LLP", "PUBLIC", "PROPRIETORSHIP", "OPC & PARTNERSHIP"] },
  },
  "required": ["name"]
}

export const adminSchema = {
  "id": "/SimpleAdmin",
  "type": "object",
  "properties": {
    "name": {"type": "string", "minLength": 1},
    "mobile": {"type": "string", "minLength": 10, "maxLength": 10 , "pattern": "^[789]{1}[0-9]{9}$"},
    "email": {"type": "string", "pattern": "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"}
  },
  "required": ["name", "mobile"]
}

// customer schema
export const customerSchema = {
  "type": "object",
  "properties": {
    "admin": {"$ref": "/SimpleAdmin"},
    "addresses": {"$ref": "/SimpleAddresses"},
    "org": {"$ref": "/SimpleOrg"},
    "documents": {"$ref": "/SimpleDocuments"},
  },
  "required": ["org", "admin"]
}

// confirm otp schema
export const confirmOtpSchema = {
  "type": "object",
  "properties": {
      "reference_id": {"type": "string", "minLength": 5},
      "decentroTxnId": {"type": "string", "minLength": 5},
      "otp": {"type": "string", "minLength": 6, "maxLength": 6}
  },
  "required": ["reference_id", "decentroTxnId", "otp"]
}

// check for update address schema
export const updateAddressSchema = {
  "type": "object",
      "properties": {
        "addressType": {"type": "string", "minLength": 1, "maxLength": 25},
        "address": {"type": "string", "minLength": 1, "maxLength": 200},
        "city": {"type": "string", "minLength": 1, "maxLength": 200},
        "pinCode": {"type": "string", "minLength": 6, "maxLength": 6, "pattern": "^[1-9]{1}[0-9]{5}$"},
        "state": {"type": "string", "minLenght": 3},
        "stateCode": {"type": "number", "maximum": 50},
        "country": {"type": "string"}
      },
      "required": ["addressType","address", "city", "pinCode", "state", "stateCode"]
}