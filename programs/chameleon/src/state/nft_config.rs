use anchor_lang::prelude::*;

use super::ANCHOR_DISCRIMINATOR;

#[account]
#[derive(InitSpace)]
pub struct NftConfig {
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

    pub blind_box_enable: bool,

    pub bump: u8,
}

impl NftConfig {
    pub const LEN: usize = ANCHOR_DISCRIMINATOR + NftConfig::INIT_SPACE;

}
