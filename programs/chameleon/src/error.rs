use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Please unstake NFT first")]
    StillStaking,
    #[msg("Configurations is initialized")]
    IsInitialized,
    #[msg("Is not authority")]
    IsNotAuthority,
    #[msg("Minting Limit Exceeded")]
    MintingLimitExceeded,
    #[msg("0x0 recipient not allowed")]
    ZeroRecipient,
    #[msg("Invalid tokenId")]
    InvalidTokenId,
    #[msg("Invalid params")]
    InvalidParams,
    #[msg("Invalid params")]
    InvalidTokenAccount,
    #[msg("Tree no empty leaf")]
    NoEmptyLeaf,
}
