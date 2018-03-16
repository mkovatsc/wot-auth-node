

//constants for use with ACE framework
export const ISS = 1,
      SUB = 2,
      AUD = 3,
      EXP = 4,
      NBF = 5,
      IAT = 6,
      CTI = 7,
      CLIENT_ID = 8,
      CLIENT_SECRET = 9,
      RESPONSE_TYPE = 10,
      REDIRECT_URI = 11,
      SCOPE = 12,
      STATE = 13,
      CODE = 14,
      ERROR = 15,
      ERROR_DESCRIPTION = 16,
      ERROR_URI = 17,
      GRANT_TYPE = 18,
      ACCESS_TOKEN = 19,
      TOKEN_TYPE = 20,
      EXPIRES_IN = 21,
      USERNAME = 22,
      PASSWORD = 23,
      REFRESH_TOKEN = 24,
      CNF = 25,
      PROFILE = 26,
      TOKEN = 27,
      TOKEN_TYPE_HINT = 28,
      ACTIVE = 29,
      CLIENT_TYPE = 30,
      RS_CNF = 31


//constants for oauth grant types codes
export const GT_PASSWORD = 0,
      GT_AUTHZ_CODE = 1,
      GT_CLI_CRED = 2,
      GT_REF_TOK = 3

export const INVALID_REQUEST = 0,
            INVALID_CLIENT =1,
            INVALID_GRANT =2,
            UNAUTHORIZED_CLIENT=3,
            UNSUPPORTED_GRANT_TYPE =4,
            INVALID_SCOPE =5,
            UNSUPPORTED_POP_KEY = 6

export const errorCodes = ['INVALID_REQUEST','INVALID_CLIENT','INVALID_GRANT','UNAUTHORIZED_CLIENT','UNSUPPORTED_GRANT_TYPE','INVALID_SCOPE','UNSUPPORTED_POP_KEY'];

console.log(PROFILE);
