/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/chameleon.json`.
 */
export type Chameleon = {
  "address": "chamgoBwbPefUJmR7bDoe4EyjNSBVk3cEsTffqk7PYt",
  "metadata": {
    "name": "chameleon",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "For anchor solana production"
  },
  "instructions": [
    {
      "name": "createTreeConfig",
      "discriminator": [
        170,
        141,
        85,
        101,
        116,
        175,
        115,
        173
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "tree",
          "writable": true,
          "signer": true
        },
        {
          "name": "treeConfig",
          "writable": true
        },
        {
          "name": "cnftConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  78,
                  70,
                  84,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "logWrapper",
          "address": "noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV"
        },
        {
          "name": "bubblegumProgram",
          "address": "BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY"
        },
        {
          "name": "compressionProgram",
          "address": "cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initializeAdmin",
      "discriminator": [
        35,
        176,
        8,
        143,
        42,
        160,
        61,
        158
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "admin",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "initializeAdminParams"
            }
          }
        }
      ]
    },
    {
      "name": "initializeCnftConfig",
      "discriminator": [
        73,
        72,
        221,
        103,
        230,
        87,
        35,
        210
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "treeConfig",
          "docs": [
            "CHECK"
          ],
          "writable": true
        },
        {
          "name": "cnftConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  78,
                  70,
                  84,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "cnftParams",
          "type": {
            "defined": {
              "name": "initializeCnftParams"
            }
          }
        }
      ]
    },
    {
      "name": "initializeNftConfig",
      "discriminator": [
        238,
        197,
        176,
        102,
        83,
        245,
        28,
        151
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "nftConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  78,
                  70,
                  84,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "nftParams",
          "type": {
            "defined": {
              "name": "initializeNftParams"
            }
          }
        }
      ]
    },
    {
      "name": "mintCnft",
      "discriminator": [
        164,
        126,
        48,
        95,
        183,
        239,
        13,
        209
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "cnftConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  78,
                  70,
                  84,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "tree",
          "writable": true
        },
        {
          "name": "treeConfig",
          "writable": true
        },
        {
          "name": "bubblegumSigner",
          "writable": true
        },
        {
          "name": "collectionMint",
          "writable": true
        },
        {
          "name": "collectionMetadata",
          "writable": true
        },
        {
          "name": "collectionMasterEdition",
          "writable": true
        },
        {
          "name": "logWrapper",
          "address": "noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV"
        },
        {
          "name": "bubblegumProgram",
          "address": "BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY"
        },
        {
          "name": "compressionProgram",
          "address": "cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK"
        },
        {
          "name": "tokenMetadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "mintCnftCollection",
      "discriminator": [
        13,
        63,
        42,
        255,
        239,
        44,
        118,
        51
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "cnftConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  78,
                  70,
                  84,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "mint",
          "writable": true,
          "signer": true
        },
        {
          "name": "associatedTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "cnftConfig"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "metadataAccount",
          "writable": true
        },
        {
          "name": "masterEditionAccount",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "tokenMetadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "mintcNftCollectionParams"
            }
          }
        }
      ]
    },
    {
      "name": "mintNftCollection",
      "discriminator": [
        214,
        35,
        255,
        10,
        185,
        64,
        44,
        218
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "nftConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  78,
                  70,
                  84,
                  45,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "mint",
          "writable": true,
          "signer": true
        },
        {
          "name": "associatedTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "nftConfig"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "metadataAccount",
          "writable": true
        },
        {
          "name": "masterEditionAccount",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "tokenMetadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "mintNftCollectionParams"
            }
          }
        }
      ]
    },
    {
      "name": "mintSbt",
      "discriminator": [
        135,
        204,
        128,
        71,
        117,
        168,
        158,
        28
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "mint",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram2022",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "withdrawFee",
      "discriminator": [
        14,
        122,
        231,
        218,
        31,
        238,
        223,
        150
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "treasury",
          "writable": true
        },
        {
          "name": "admin",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "admin",
      "discriminator": [
        244,
        158,
        220,
        65,
        8,
        73,
        4,
        65
      ]
    },
    {
      "name": "cnftConfig",
      "discriminator": [
        150,
        205,
        31,
        68,
        103,
        108,
        38,
        109
      ]
    },
    {
      "name": "nftConfig",
      "discriminator": [
        222,
        24,
        41,
        226,
        124,
        38,
        247,
        61
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "stillStaking",
      "msg": "Please unstake NFT first"
    },
    {
      "code": 6001,
      "name": "isInitialized",
      "msg": "Configurations is initialized"
    },
    {
      "code": 6002,
      "name": "isNotAuthority",
      "msg": "Is not authority"
    },
    {
      "code": 6003,
      "name": "mintingLimitExceeded",
      "msg": "Minting Limit Exceeded"
    },
    {
      "code": 6004,
      "name": "zeroRecipient",
      "msg": "0x0 recipient not allowed"
    },
    {
      "code": 6005,
      "name": "invalidTokenId",
      "msg": "Invalid tokenId"
    },
    {
      "code": 6006,
      "name": "invalidParams",
      "msg": "Invalid params"
    },
    {
      "code": 6007,
      "name": "invalidTokenAccount",
      "msg": "Invalid params"
    },
    {
      "code": 6008,
      "name": "noEmptyLeaf",
      "msg": "Tree no empty leaf"
    }
  ],
  "types": [
    {
      "name": "admin",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "administrator",
            "type": "pubkey"
          },
          {
            "name": "treasury",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "cnftConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "administrator",
            "type": "pubkey"
          },
          {
            "name": "treasury",
            "type": "pubkey"
          },
          {
            "name": "namePrefix",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "baseUri",
            "type": "string"
          },
          {
            "name": "index",
            "type": "u16"
          },
          {
            "name": "totalSupply",
            "type": "u16"
          },
          {
            "name": "salesPrice",
            "type": "u64"
          },
          {
            "name": "wlRoot",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "wlLimit",
            "type": "u8"
          },
          {
            "name": "collectionMint",
            "type": "pubkey"
          },
          {
            "name": "treeConfig",
            "type": "pubkey"
          },
          {
            "name": "emptyLeaf",
            "type": "u16"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "initializeAdminParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "administrator",
            "type": "pubkey"
          },
          {
            "name": "treasury",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "initializeCnftParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "administrator",
            "type": "pubkey"
          },
          {
            "name": "treasury",
            "type": "pubkey"
          },
          {
            "name": "namePrefix",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "baseUri",
            "type": "string"
          },
          {
            "name": "totalSupply",
            "type": "u16"
          },
          {
            "name": "salesPrice",
            "type": "u64"
          },
          {
            "name": "wlRoot",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "wlLimit",
            "type": "u8"
          },
          {
            "name": "emptyLeaf",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "initializeNftParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "administrator",
            "type": "pubkey"
          },
          {
            "name": "treasury",
            "type": "pubkey"
          },
          {
            "name": "namePrefix",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "baseUri",
            "type": "string"
          },
          {
            "name": "totalSupply",
            "type": "u16"
          },
          {
            "name": "salesPrice",
            "type": "u64"
          },
          {
            "name": "wlRoot",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "wlLimit",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "mintNftCollectionParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "mintcNftCollectionParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "nftConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "administrator",
            "type": "pubkey"
          },
          {
            "name": "treasury",
            "type": "pubkey"
          },
          {
            "name": "namePrefix",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "baseUri",
            "type": "string"
          },
          {
            "name": "index",
            "type": "u16"
          },
          {
            "name": "totalSupply",
            "type": "u16"
          },
          {
            "name": "salesPrice",
            "type": "u64"
          },
          {
            "name": "wlRoot",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "wlLimit",
            "type": "u8"
          },
          {
            "name": "collectionMint",
            "type": "pubkey"
          },
          {
            "name": "blindBoxEnable",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "constants": [
    {
      "name": "adminSeed",
      "type": "string",
      "value": "\"admin\""
    },
    {
      "name": "cnftConfigSeed",
      "type": "string",
      "value": "\"cNFT-config\""
    },
    {
      "name": "nftConfigSeed",
      "type": "string",
      "value": "\"NFT-config\""
    }
  ]
};
