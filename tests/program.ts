import * as anchor from "@coral-xyz/anchor";
import { Chameleon } from "../app/src/idl/chameleon";
import { createUmi, } from "@metaplex-foundation/umi-bundle-defaults";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, Umi } from "@metaplex-foundation/umi";


export function initEnv(): [anchor.Program<Chameleon>, anchor.AnchorProvider, anchor.Wallet] {
	// anchor
	const provider = anchor.AnchorProvider.env();
	anchor.setProvider(provider);
	const program = anchor.workspace.Chameleon as anchor.Program<Chameleon>;
	const authority = provider.wallet as anchor.Wallet;

	// metaplex
	const umi = createUmi(provider.connection.rpcEndpoint)
	umi.use(mplTokenMetadata())

	const keypair = umi.eddsa.createKeypairFromSecretKey(authority.payer.secretKey)
	const signer = createSignerFromKeypair(umi, keypair);
	umi.use(signerIdentity(signer))

	return [program, provider, authority]
}
