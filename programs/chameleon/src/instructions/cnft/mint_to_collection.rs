use anchor_lang::prelude::*;
use anchor_spl::metadata::Metadata as TokenMetadata;
use mpl_bubblegum::instructions::MintToCollectionV1CpiBuilder;
use mpl_bubblegum::types::{Collection, Creator, MetadataArgs, TokenProgramVersion, TokenStandard};

use super::{MplBubblegum, Noop, SplAccountCompression};
use crate::constants::CNFT_CONFIG_SEED;
use crate::CnftConfig;

pub fn process(ctx: Context<MintToCollection>) -> Result<()> {
    MintToCollectionV1CpiBuilder::new(&ctx.accounts.bubblegum_program.to_account_info())
        .tree_config(&ctx.accounts.tree_config.to_account_info())
        .leaf_owner(&ctx.accounts.user.to_account_info())
        .leaf_delegate(&ctx.accounts.user.to_account_info())
        .merkle_tree(&ctx.accounts.tree.to_account_info())
        .payer(&ctx.accounts.user.to_account_info())
        .tree_creator_or_delegate(&ctx.accounts.cnft_config.to_account_info())
        .collection_authority(&ctx.accounts.cnft_config.to_account_info())
        .collection_authority_record_pda(Some(&ctx.accounts.bubblegum_program.to_account_info()))
        .collection_mint(&ctx.accounts.collection_mint.to_account_info())
        .collection_metadata(&ctx.accounts.collection_metadata.to_account_info())
        .collection_edition(&ctx.accounts.collection_master_edition.to_account_info())
        .bubblegum_signer(&ctx.accounts.bubblegum_signer.to_account_info())
        .log_wrapper(&ctx.accounts.log_wrapper.to_account_info())
        .compression_program(&ctx.accounts.compression_program.to_account_info())
        .token_metadata_program(&ctx.accounts.token_metadata_program.to_account_info())
        .system_program(&ctx.accounts.system_program.to_account_info())
        .metadata(MetadataArgs {
            name: format!(
                "{} #{}",
                ctx.accounts.cnft_config.name_prefix, ctx.accounts.cnft_config.index
            ),
            symbol: ctx.accounts.cnft_config.symbol.to_string(),
            uri: format!(
                "{}{}.json",
                ctx.accounts.cnft_config.base_uri, ctx.accounts.cnft_config.index,
            ),
            creators: [Creator {
                address: ctx.accounts.cnft_config.key(),
                verified: true,
                share: 100,
            }]
            .to_vec(),
            seller_fee_basis_points: 420, // 4.2%
            primary_sale_happened: true,
            is_mutable: true,
            edition_nonce: Some(0), // ?
            uses: None,
            collection: Some(Collection {
                verified: true,
                key: ctx.accounts.collection_mint.key(),
            }),
            token_program_version: TokenProgramVersion::Original,
            token_standard: Some(TokenStandard::NonFungible),
        })
        .invoke_signed(&[&[CNFT_CONFIG_SEED.as_bytes(), &[ctx.bumps.cnft_config]]])?;
    Ok(())
}

#[derive(Accounts)]
pub struct MintToCollection<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        seeds=[
			CNFT_CONFIG_SEED.as_bytes(),
		],
        bump
    )]
    pub cnft_config: Box<Account<'info, CnftConfig>>,

    /// CHECK:
    #[account(mut)]
    pub tree: UncheckedAccount<'info>,

    /// CHECK:
    #[account(mut, address = cnft_config.tree_config)]
    pub tree_config: UncheckedAccount<'info>,

    /// CHECK:
    #[account(mut)]
    pub bubblegum_signer: UncheckedAccount<'info>,

    /// CHECK:
    #[account(mut, address = cnft_config.collection_mint)]
    pub collection_mint: UncheckedAccount<'info>,

    /// CHECK:
    #[account(mut)]
    pub collection_metadata: UncheckedAccount<'info>,

    /// CHECK:
    #[account(mut)]
    pub collection_master_edition: UncheckedAccount<'info>,

    pub log_wrapper: Program<'info, Noop>,
    pub bubblegum_program: Program<'info, MplBubblegum>,
    pub compression_program: Program<'info, SplAccountCompression>,
    pub token_metadata_program: Program<'info, TokenMetadata>,
    pub system_program: Program<'info, System>,
}
