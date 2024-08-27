# Description

#### Initializes workspace
```shell
anchor init --template multiple --test-template [mocha, jest, rust] program-name
```

#### Add a new program
```shell
anchor new --template multiple program-name
```

#### Upgrade
```shell
anchor upgrade <target/deploy/program.so> --program-id <program-id>
```

#### Verifies the on-chain bytecode matches the locally compiled artifact. Run this command inside a program subdirectory
```shell
anchor verify <program-id>
```

#### Depencies
```shell
yarn add @solana/spl-token @solana/web3.js @solana/spl-memo @metaplex-foundation/mpl-token-metadata @metaplex-foundation/umi-bundle-defaults @metaplex-foundation/umi-signer-wallet-adapters @openzeppelin/merkle-tree  @types/bs58 keccak256 merkletreejs @metaplex-foundation/solita @solana-developers/helpers @solana/spl-account-compression @metaplex-foundation/mpl-bubblegum
```
