pub mod constants;
pub mod error;
mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
use instructions::*;
pub use state::*;

declare_id!("chamgoBwbPefUJmR7bDoe4EyjNSBVk3cEsTffqk7PYt");

#[program]
pub mod chameleon {
    use super::*;

    pub fn initialize_admin(
        ctx: Context<InitializeAdmin>,
        params: InitializeAdminParams,
    ) -> Result<()> {
        instructions::admin::initialize::process(ctx, params)
    }

    pub fn initialize_cnft_config(
        ctx: Context<InitializeCNFT>,
        cnft_params: InitializeCNFTParams,
    ) -> Result<()> {
        instructions::cnft::initialize::process(ctx, cnft_params)
    }

    pub fn initialize_nft_config(
        ctx: Context<InitializeNFT>,
        nft_params: InitializeNFTParams,
    ) -> Result<()> {
        instructions::nft::initialize::process(ctx, nft_params)
    }

    pub fn withdraw_fee(ctx: Context<WithdrawFee>) -> Result<()> {
        instructions::admin::withdraw_fee::process(ctx)
    }

    pub fn mint_cnft_collection(
        ctx: Context<MintcNFTCollection>,
        params: MintcNFTCollectionParams,
    ) -> Result<()> {
        instructions::cnft::mint_collection::process(ctx, params)
    }

    pub fn create_tree_config(ctx: Context<CreateTreeConfig>) -> Result<()> {
        instructions::cnft::create_tree_config::process(ctx)
    }

    pub fn mint_cnft(ctx: Context<MintToCollection>) -> Result<()> {
        instructions::cnft::mint_to_collection::process(ctx)
    }

    pub fn mint_nft_collection(
        ctx: Context<MintNFTCollection>,
        params: MintNFTCollectionParams,
    ) -> Result<()> {
        instructions::nft::mint_collection::process(ctx, params)
    }

    pub fn mint_sbt(ctx: Context<SBT>) -> Result<()> {
        instructions::token2022::sbt::process(ctx)
    }
}
