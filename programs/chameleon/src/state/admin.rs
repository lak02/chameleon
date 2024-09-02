use anchor_lang::prelude::*;

use super::ANCHOR_DISCRIMINATOR;

#[account]
#[derive(InitSpace)]
pub struct Admin {
    pub administrator: Pubkey,
    pub treasury: Pubkey,

    pub bump: u8,
}

impl Admin {
    pub const LEN: usize = ANCHOR_DISCRIMINATOR + Admin::INIT_SPACE;
}
