use anchor_lang::prelude::*;

use crate::{NftConfig, NFT_CONFIG_SEED};

pub fn process(ctx: Context<InitializeNFT>, nft_params: InitializeNFTParams) -> Result<()> {
    ctx.accounts.nft_config.set_inner(NftConfig {
        administrator: nft_params.administrator,
        treasury: nft_params.treasury,
        collection_mint: Pubkey::default(),
        name_prefix: nft_params.name_prefix,
        symbol: nft_params.symbol,
        base_uri: nft_params.base_uri,
        index: 1,
        total_supply: nft_params.total_supply,
        sales_price: nft_params.sales_price,
        wl_root: nft_params.wl_root,
        wl_limit: nft_params.wl_limit,
        blind_box_enable: false,
        bump: ctx.bumps.nft_config,
    });

    Ok(())
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct InitializeNFTParams {
    administrator: Pubkey,
    treasury: Pubkey,
    name_prefix: String,
    symbol: String,
    base_uri: String,
    total_supply: u16,
    sales_price: u64,
    wl_root: [u8; 32],
    wl_limit: u8,
}

#[derive(Accounts)]
pub struct InitializeNFT<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer = authority,
        seeds = [NFT_CONFIG_SEED.as_bytes()],
        space = NftConfig::LEN,
        bump
    )]
    pub nft_config: Account<'info, NftConfig>,

    pub system_program: Program<'info, System>,
}
