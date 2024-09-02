use anchor_lang::prelude::*;
use mpl_bubblegum::instructions::CreateTreeConfigCpiBuilder;

use super::{MplBubblegum, Noop, SplAccountCompression};
use crate::{constants::CNFT_CONFIG_SEED, CnftConfig};

pub fn process(ctx: Context<CreateTreeConfig>) -> Result<()> {
    CreateTreeConfigCpiBuilder::new(&ctx.accounts.bubblegum_program.to_account_info())
        .tree_config(&ctx.accounts.tree_config.to_account_info())
        .merkle_tree(&ctx.accounts.tree.to_account_info())
        .payer(&&ctx.accounts.authority.to_account_info())
        .tree_creator(&&ctx.accounts.cnft_config.to_account_info())
        .log_wrapper(&ctx.accounts.log_wrapper.to_account_info())
        .compression_program(&ctx.accounts.compression_program.to_account_info())
        .system_program(&ctx.accounts.system_program.to_account_info())
        .max_depth(CnftConfig::MAX_DEPTH)
        .max_buffer_size(CnftConfig::MAX_BUFFER_SIZE)
        .invoke_signed(&[&[CNFT_CONFIG_SEED.as_bytes(), &[ctx.bumps.cnft_config]]])?;

    ctx.accounts.cnft_config.tree_config = ctx.accounts.tree_config.key();
    Ok(())
}

#[derive(Accounts)]
pub struct CreateTreeConfig<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    /// CHECK: This account must be all zeros
    #[account(zero, signer)]
    pub tree: AccountInfo<'info>,

    /// CHECK:
    #[account(mut)]
    pub tree_config: UncheckedAccount<'info>,

    #[account(
		mut,
		seeds=[
			CNFT_CONFIG_SEED.as_bytes(),
		],
        bump
	)]
    pub cnft_config: Box<Account<'info, CnftConfig>>,

    pub log_wrapper: Program<'info, Noop>,
    pub bubblegum_program: Program<'info, MplBubblegum>,
    pub compression_program: Program<'info, SplAccountCompression>,
    pub system_program: Program<'info, System>,
}
