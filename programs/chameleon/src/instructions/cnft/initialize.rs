use anchor_lang::prelude::*;

use crate::{constants::CNFT_CONFIG_SEED, CnftConfig};

pub fn process(ctx: Context<InitializeCNFT>, cnft_params: InitializeCNFTParams) -> Result<()> {
    ctx.accounts.cnft_config.set_inner(CnftConfig {
        administrator: cnft_params.administrator,
        treasury: cnft_params.treasury,
        collection_mint: Pubkey::default(),
        name_prefix: cnft_params.name_prefix,
        symbol: cnft_params.symbol,
        base_uri: cnft_params.base_uri,
        index: 1,
        total_supply: cnft_params.total_supply,
        sales_price: cnft_params.sales_price,
        wl_root: cnft_params.wl_root,
        wl_limit: cnft_params.wl_limit,
        tree_config: ctx.accounts.tree_config.key(),
        empty_leaf: cnft_params.empty_leaf,
        bump: ctx.bumps.cnft_config,
        max_depth: cnft_params.max_depth,
        max_buffer_size: cnft_params.max_buffer_size,
    });

    Ok(())
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct InitializeCNFTParams {
    administrator: Pubkey,
    treasury: Pubkey,
    name_prefix: String,
    symbol: String,
    base_uri: String,
    total_supply: u16,
    sales_price: u64,
    wl_root: [u8; 32],
    wl_limit: u8,
    max_depth: u32,
    max_buffer_size: u32,
    empty_leaf: u16,
}

#[derive(Accounts)]
pub struct InitializeCNFT<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    /// CHECK
    #[account(mut)]
    pub tree_config: UncheckedAccount<'info>,

    #[account(
        init,
        payer = authority,
        seeds=[
			CNFT_CONFIG_SEED.as_bytes(),
		],
        space= CnftConfig::LEN,
        bump
    )]
    pub cnft_config: Box<Account<'info, CnftConfig>>,

    pub system_program: Program<'info, System>,
}
