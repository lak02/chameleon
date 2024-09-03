use anchor_lang::prelude::*;
use anchor_spl::token_2022::Token2022;
use anchor_spl::token_interface::spl_token_2022::extension::ExtensionType;
use anchor_spl::token_interface::spl_token_2022::state::Mint as Mint2022;
use anchor_spl::{token_2022, token_2022_extensions};

pub fn process(ctx: Context<SBT>) -> Result<()> {
    let space =
        ExtensionType::try_calculate_account_len::<Mint2022>(&[ExtensionType::NonTransferable])?;
    let rent_required = Rent::get()?.minimum_balance(space);

    msg!("Mint account address : {}", ctx.accounts.mint.key());
    anchor_lang::system_program::create_account(
        CpiContext::new(
            ctx.accounts.token_program_2022.to_account_info(),
            anchor_lang::system_program::CreateAccount {
                from: ctx.accounts.payer.to_account_info(),
                to: ctx.accounts.mint.to_account_info(),
            },
        ),
        rent_required,
        space as u64,
        ctx.accounts.token_program_2022.key,
    )?;

    token_2022_extensions::non_transferable_mint_initialize(CpiContext::new(
        ctx.accounts.token_program_2022.to_account_info(),
        token_2022_extensions::NonTransferableMintInitialize {
            token_program_id: ctx.accounts.token_program_2022.to_account_info(),
            mint: ctx.accounts.mint.to_account_info(),
        },
    ))?;

    token_2022::initialize_mint2(
        CpiContext::new(
            ctx.accounts.token_program_2022.to_account_info(),
            token_2022::InitializeMint2 {
                mint: ctx.accounts.mint.to_account_info(),
            },
        ),
        0,                              // decimals: u8,
        ctx.accounts.payer.key,         // authority: &Pubkey,
        Some(&ctx.accounts.mint.key()), // freeze_authority: Option<&Pubkey>,
    )?;

    Ok(())
}

#[derive(Accounts)]
pub struct SBT<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    /// CHECK:
    #[account(mut)]
    pub mint: Signer<'info>,
    /// CHECK:
    pub token_program_2022: Program<'info, Token2022>,
    pub system_program: Program<'info, System>,
}
