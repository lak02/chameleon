pub mod create_tree_config;
pub mod initialize;
pub mod mint_collection;
pub mod mint_to_collection;

pub use create_tree_config::*;
pub use initialize::*;
pub use mint_collection::*;
pub use mint_to_collection::*;

use anchor_lang::prelude::*;

#[derive(Clone)]
pub struct MplBubblegum;
impl Id for MplBubblegum {
    fn id() -> Pubkey {
        // mpl_bubblegum::ID
        pubkey!("BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY")
    }
}

#[derive(Clone)]
pub struct SplAccountCompression;
impl Id for SplAccountCompression {
    fn id() -> Pubkey {
        // spl_account_compression::ID
        pubkey!("cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK")
    }
}

#[derive(Clone)]
pub struct Noop;
impl Id for Noop {
    fn id() -> Pubkey {
        // spl_noop::ID
        pubkey!("noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV")
    }
}
