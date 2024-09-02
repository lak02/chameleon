use anchor_lang::prelude::*;

use crate::{Admin, ADMIN_SEED};

pub fn process(ctx: Context<WithdrawFee>) -> Result<()> {
    let rent_required = Rent::get()?.minimum_balance(Admin::LEN);
    let withdraw_amount = ctx.accounts.admin.get_lamports().checked_sub(rent_required).unwrap();

    **ctx
        .accounts
        .admin
        .to_account_info()
        .try_borrow_mut_lamports()? -= withdraw_amount;

    **ctx
        .accounts
        .treasury
        .to_account_info()
        .try_borrow_mut_lamports()? += withdraw_amount;

    Ok(())
}

#[derive(Accounts)]
pub struct WithdrawFee<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    /// CHECK:
    #[account(mut, address = admin.treasury)]
    pub treasury: UncheckedAccount<'info>,

    #[account(
		mut,
        seeds = [ADMIN_SEED.as_bytes()],
        bump
    )]
    pub admin: Account<'info, Admin>,

    pub system_program: Program<'info, System>,
}
