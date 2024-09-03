import * as anchor from "@coral-xyz/anchor";
import * as web3 from "@solana/web3.js";
import * as spl from "@solana/spl-token";

import {
	execTx,
} from "./shared/utils";
// import { findPda, findMasterEditionPda, findMetadataPda } from "./shared/accounts";
import { initEnv } from "./program";


describe("about token 2022 with token extension", () => {
	const [program, provider, wallet] = initEnv();

	const mintKeypair = web3.Keypair.generate();
	console.log("sbt mint: ", mintKeypair.publicKey.toBase58());


	it("Mint SBT", async () => {
		const mintInstruction = await program.methods
			.mintSbt()
			.accountsPartial({
				payer: wallet.publicKey,
				mint: mintKeypair.publicKey,
			})
			.instruction();

		const txs = new anchor.web3.Transaction().add(mintInstruction);
		await execTx(txs, [wallet.payer, mintKeypair]);

		// const tx = await web3.sendAndConfirmTransaction(
		// 	provider.connection,
		// 	transaction,
		// 	[wallet.payer, mintKeypair] // Signers
		// );
		// printTx(tx)
	});
	return
	// async function testCreateNonTransferableToken() {
	// 	const mintKeypair = web3.Keypair.generate();
	// 	const mint = mintKeypair.publicKey;
	// 	const mintLen = spl.getMintLen([spl.ExtensionType.NonTransferable]);
	// 	const lamports = await provider.connection.getMinimumBalanceForRentExemption(mintLen);

	// 	console.log(`mintLen: ${mintLen}`);
	// 	console.log(`lamports: ${lamports}`);

	// 	// Instruction to invoke System Program to create new account
	// 	const createAccountInstruction = web3.SystemProgram.createAccount({
	// 		fromPubkey: wallet.payer.publicKey, // Account that will transfer lamports to created account
	// 		newAccountPubkey: mint, // Address of the account to create
	// 		space: mintLen, // Amount of bytes to allocate to the created account
	// 		lamports, // Amount of lamports transferred to created account
	// 		programId: spl.TOKEN_2022_PROGRAM_ID, // Program assigned as owner of created account
	// 	});
	// 	const transaction = new web3.Transaction().add(
	// 		createAccountInstruction,
	// 	);

	// const tx = await web3.sendAndConfirmTransaction(
	// 	provider.connection,
	// 	transaction,
	// 	[wallet.payer, mintKeypair] // Signers
	// );
	// return tx
	// }


});
