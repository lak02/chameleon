import * as anchor from "@coral-xyz/anchor";
import * as web3 from "@solana/web3.js";
import * as spl from "@solana/spl-token";
import {
	createAllocTreeIx,
} from "@solana/spl-account-compression";
import {
	MPL_BUBBLEGUM_PROGRAM_ID,
} from "@metaplex-foundation/mpl-bubblegum";
import {
	execTx,
} from "./shared/utils";
import { findPda, findMasterEditionPda, findMetadataPda } from "./shared/accounts";
import { initEnv } from "./program";


describe("cNFT", () => {
	const [program, provider, wallet] = initEnv();
	const BUBBLEGUM_PROGRAM_ID = new web3.PublicKey(MPL_BUBBLEGUM_PROGRAM_ID)

	// Tree calculator :  https://compressed.app/
	const tree = web3.Keypair.generate();
	console.log("tree: ", tree.publicKey.toBase58());

	const [treeConfig, treeConfigBump] = findPda([tree.publicKey.toBuffer()], BUBBLEGUM_PROGRAM_ID)
	console.log("treeConfig: ", treeConfig.toBase58());
	console.log("treeConfigBump: ", treeConfigBump);

	const [cNFTConfig, cNFTConfigBump] = findPda([Buffer.from("cNFT-config"),], program.programId);
	console.log("cNFTConfig: ", cNFTConfig.toBase58());
	console.log("cNFTConfigBump: ", cNFTConfigBump);

	const treasury = web3.Keypair.generate();
	const salesPrice = new anchor.BN(1 * web3.LAMPORTS_PER_SOL);

	it("Initialize configuration", async () => {
		const name_prefix = "Mad Lads"
		const symbol = "MAD"
		// "https://madlads.s3.us-west-2.amazonaws.com/json/9970.json"
		const base_uri = "https://madlads.s3.us-west-2.amazonaws.com/json/"
		const total_supply = 9970

		let initializeIx = await program.methods
			.initializeCnftConfig({
				administrator: wallet.publicKey,
				treasury: treasury.publicKey,
				namePrefix: name_prefix,
				symbol: symbol,
				baseUri: base_uri,
				totalSupply: total_supply,
				salesPrice: salesPrice,
				wlRoot: [],
				wlLimit: 0,
				emptyLeaf: 16384
			})
			.accountsPartial({
				authority: wallet.publicKey,
				treeConfig: treeConfig,
				cnftConfig: cNFTConfig,
			})
			.instruction()

		const txs = new anchor.web3.Transaction().add(initializeIx)
		await execTx(txs, [wallet.payer]);
	});


	it("Create tree config", async () => {
		const allocTreeIx = await createAllocTreeIx(
			new web3.Connection(
				provider.connection.rpcEndpoint,
				provider.connection.commitment,
			),
			tree.publicKey,
			wallet.publicKey,
			{ maxDepth: 14, maxBufferSize: 64 },
			11,
		);
		await execTx(new anchor.web3.Transaction().add(allocTreeIx), [wallet.payer, tree]);

		const addTreeIx = await program.methods
			.createTreeConfig()
			.accountsPartial({
				cnftConfig: cNFTConfig,
				tree: tree.publicKey,
				treeConfig: treeConfig,
			})
			.instruction();
		const txs = new anchor.web3.Transaction().add(addTreeIx)
		await execTx(txs, [wallet.payer, tree]);
	});


	const collectionMint = web3.Keypair.generate();
	console.log("collectionMint: ", collectionMint.publicKey.toBase58());

	const associatedTokenAccount = anchor.utils.token.associatedAddress({
		mint: collectionMint.publicKey,
		owner: cNFTConfig
	})
	console.log("associatedTokenAccount: ", associatedTokenAccount.toBase58());

	const [metadataAccount,] = findMetadataPda(collectionMint.publicKey);
	console.log("metadataAccount: ", metadataAccount.toBase58());

	const [masterEditionAccount,] = findMasterEditionPda(collectionMint.publicKey);
	console.log("masterEditionAccount: ", masterEditionAccount.toBase58());

	it("Mint collection", async () => {
		const name = "Mad Lads";
		const symbol = "MAD";
		const uri = "https://madlads-collection.s3.us-west-2.amazonaws.com/_collection.json";

		const mintCollectionIx = await program.methods
			.mintCnftCollection({
				name: name,
				symbol: symbol,
				uri: uri
			})
			.accountsPartial({
				mint: collectionMint.publicKey,
				associatedTokenAccount,
				metadataAccount,
				masterEditionAccount
			})
			.instruction();
		await execTx(new anchor.web3.Transaction().add(mintCollectionIx), [wallet.payer, collectionMint]);
	});

	// `collection_cpi` is a custom prefix required by the Bubblegum program
	const [bubblegumSigner,] = findPda([Buffer.from("collection_cpi", "utf8")], BUBBLEGUM_PROGRAM_ID)

	it("Mint cNFT to Collection", async () => {
		let mintTx = await program.methods.mintCnft()
			.accountsPartial({
				cnftConfig: cNFTConfig,
				tree: tree.publicKey,
				treeConfig: treeConfig,
				bubblegumSigner,
				collectionMint: collectionMint.publicKey,
				collectionMetadata: metadataAccount,
				collectionMasterEdition: masterEditionAccount,
			})
			.instruction();

		const txs = new anchor.web3.Transaction().add(mintTx)
		await execTx(txs, [wallet.payer]);

	});
});

