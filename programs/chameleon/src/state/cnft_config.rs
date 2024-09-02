use anchor_lang::prelude::*;

use super::ANCHOR_DISCRIMINATOR;

#[account]
#[derive(InitSpace)]
pub struct CnftConfig {
    pub administrator: Pubkey,
    pub treasury: Pubkey,

    #[max_len(20)]
    pub name_prefix: String,

    #[max_len(10)]
    pub symbol: String,

    #[max_len(80)]
    pub base_uri: String,

    pub index: u16, // from 1 to...
    pub total_supply: u16,
    pub sales_price: u64,

    // whitelist
    pub wl_root: [u8; 32],
    pub wl_limit: u8,
    pub collection_mint: Pubkey,

    pub tree_config: Pubkey,
    pub empty_leaf: u16, // tree max leaf size

    pub bump: u8,
}

impl CnftConfig {
    // if custom discriminators
    // https://github.com/coral-xyz/anchor/issues/3005#issuecomment-2299217823
    pub const LEN: usize = ANCHOR_DISCRIMINATOR + CnftConfig::INIT_SPACE;
    // https://github.com/solana-labs/solana-program-library/blob/master/account-compression/sdk/src/constants/index.ts
    pub const MAX_DEPTH: u32 = 14;
    pub const MAX_BUFFER_SIZE: u32 = 64;
}
