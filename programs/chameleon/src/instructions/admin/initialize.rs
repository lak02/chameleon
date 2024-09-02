use anchor_lang::prelude::*;

use crate::{Admin, ADMIN_SEED};

pub fn process(ctx: Context<InitializeAdmin>, params: InitializeAdminParams) -> Result<()> {
    ctx.accounts.admin.set_inner(Admin {
        administrator: params.administrator,
        treasury: params.treasury,
        bump: ctx.bumps.admin,
    });
    Ok(())
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct InitializeAdminParams {
    administrator: Pubkey,
    treasury: Pubkey,
}

#[derive(Accounts)]
#[instruction(params: InitializeAdminParams)]
pub struct InitializeAdmin<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer = authority,
        seeds = [ADMIN_SEED.as_bytes()],
        space = Admin::LEN,
        bump
    )]
    pub admin: Account<'info, Admin>,

    pub system_program: Program<'info, System>,
}
