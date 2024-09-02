use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::metadata::{
    create_master_edition_v3, create_metadata_accounts_v3, CreateMasterEditionV3,
    CreateMetadataAccountsV3, Metadata as TokenMetadata,
};
use anchor_spl::token::{mint_to, Mint, MintTo, Token, TokenAccount};
use mpl_token_metadata::accounts::{MasterEdition, Metadata};
use mpl_token_metadata::types::{CollectionDetails, Creator, DataV2};

use crate::constants::CNFT_CONFIG_SEED;
use crate::CnftConfig;

pub fn process(ctx: Context<MintcNFTCollection>, params: MintcNFTCollectionParams) -> Result<()> {
    let bump = [ctx.bumps.cnft_config];
    let signer_seeds: &[&[&[u8]]] = &[&[CNFT_CONFIG_SEED.as_bytes(), &bump.as_ref()]];

    //
    let accounts = MintTo {
        mint: ctx.accounts.mint.to_account_info(),
        to: ctx.accounts.associated_token_account.to_account_info(),
        authority: ctx.accounts.cnft_config.to_account_info(),
    };
    let cpi_context = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        accounts,
        signer_seeds,
    );
    mint_to(cpi_context, 1)?;

    //
    let accounts = CreateMetadataAccountsV3 {
        payer: ctx.accounts.authority.to_account_info(),
        mint: ctx.accounts.mint.to_account_info(),
        metadata: ctx.accounts.metadata_account.to_account_info(),
        mint_authority: ctx.accounts.cnft_config.to_account_info(),
        update_authority: ctx.accounts.cnft_config.to_account_info(),
        system_program: ctx.accounts.system_program.to_account_info(),
        rent: ctx.accounts.rent.to_account_info(),
    };
    let cpi_context = CpiContext::new_with_signer(
        ctx.accounts.token_metadata_program.to_account_info(),
        accounts,
        signer_seeds,
    );
    let creator = vec![Creator {
        address: ctx.accounts.cnft_config.key(),
        verified: true,
        share: 100,
    }];
    let data_v2 = DataV2 {
        name: params.name,
        symbol: params.symbol,
        uri: params.uri,
        seller_fee_basis_points: 0, // 5%
        creators: Some(creator),
        collection: None,
        uses: None,
    };
    let is_mutable = true;
    let update_authority_is_signer = true;
    let collection_details = Some(CollectionDetails::V1 { size: 1 });
    create_metadata_accounts_v3(
        cpi_context,
        data_v2,
        is_mutable,
        update_authority_is_signer,
        collection_details,
    )?;

    //
    let accounts = CreateMasterEditionV3 {
        payer: ctx.accounts.authority.to_account_info(),
        edition: ctx.accounts.master_edition_account.to_account_info(),
        mint: ctx.accounts.mint.to_account_info(),
        update_authority: ctx.accounts.cnft_config.to_account_info(),
        mint_authority: ctx.accounts.cnft_config.to_account_info(),
        metadata: ctx.accounts.metadata_account.to_account_info(),
        token_program: ctx.accounts.token_program.to_account_info(),
        system_program: ctx.accounts.system_program.to_account_info(),
        rent: ctx.accounts.rent.to_account_info(),
    };
    let cpi_context: CpiContext<'_, '_, '_, '_, CreateMasterEditionV3<'_>> =
        CpiContext::new_with_signer(
            ctx.accounts.token_metadata_program.to_account_info(),
            accounts,
            signer_seeds,
        );
    let max_supply = Some(0);
    create_master_edition_v3(cpi_context, max_supply)?;

    //
    ctx.accounts.cnft_config.collection_mint = ctx.accounts.mint.key();

    Ok(())
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct MintcNFTCollectionParams {
    name: String,
    symbol: String,
    uri: String,
}

#[derive(Accounts)]
pub struct MintcNFTCollection<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
		seeds=[
			CNFT_CONFIG_SEED.as_bytes(),
		],
        bump
	)]
    pub cnft_config: Box<Account<'info, CnftConfig>>,

    #[account(
		init,
		payer = authority,
		mint::decimals = 0,
		mint::authority = cnft_config.key(),
		mint::freeze_authority = cnft_config.key(),
	)]
    pub mint: Account<'info, Mint>,

    #[account(
		init,
		payer = authority,
		associated_token::mint = mint,
		associated_token::authority = cnft_config
	)]
    pub associated_token_account: Account<'info, TokenAccount>,

    /// CHECK: pda binding
    #[account(
    	mut,
    	address = Metadata::find_pda(&mint.key()).0
    )]
    pub metadata_account: AccountInfo<'info>,

    /// CHECK: pda binding
    #[account(
    	mut,
    	address = MasterEdition::find_pda(&mint.key()).0
    )]
    pub master_edition_account: AccountInfo<'info>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_metadata_program: Program<'info, TokenMetadata>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}
