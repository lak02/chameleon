import * as web3 from "@solana/web3.js";
import * as spl from '@solana/spl-token';
import * as anchor from "@coral-xyz/anchor";
import { createUmi, } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import base58 from "bs58";
import fs from "fs";
import { initEnv } from "../program";


const [program, provider, wallet] = initEnv();

// **************** IO ****************
export async function toJsonFile(path, data) {
	fs.writeFileSync(path, JSON.stringify(data));
}

export async function readJsonFile(filepath) {
	return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
}

export async function sleep(seconds) {
	await new Promise(resolve => setTimeout(resolve, seconds * 1000)); // waiting for a while
}


// **************** Keypair ****************
export async function keypairFromFile(filePath: string) {
	return web3.Keypair.fromSecretKey(Buffer.from(JSON.parse(fs.readFileSync(filePath, "utf-8"))));
}

export async function secretKeyToArray(privateKey: string) {
	return base58.decode(privateKey)
}


export async function secretToKeypair(privateKey: string) {
	return web3.Keypair.fromSecretKey(await secretKeyToArray(privateKey));
}

export async function execTx(tx: anchor.web3.Transaction | anchor.web3.VersionedTransaction, signers: web3.Signer[], printed = true) {
	const txHash = await provider.sendAndConfirm(tx, signers)
	printTx(txHash, printed)
}

export function printTx(tx: web3.TransactionSignature, printed = true) {
	if (printed) {
		console.log(`\nTx: https://explorer.solana.com/tx/${tx}?cluster=custom&customUrl=http%3A%2F%2Flocalhost%3A8899`);
	}
}


export async function createNewToken(connection: web3.Connection, payer: web3.Keypair, ui_amount: number) {
	const mintAuthority = web3.Keypair.generate();
	const freezeAuthority = web3.Keypair.generate();

	const mint = await spl.createMint(
		connection,
		payer,
		mintAuthority.publicKey,
		freezeAuthority.publicKey,
		9 // We are using 9 to match the CLI decimal default exactly
	);
	// console.log(mint.toBase58());


	const mintInfo = await spl.getMint(
		connection,
		mint
	)
	// console.log(mintInfo.supply);


	const tokenAccount = await spl.getOrCreateAssociatedTokenAccount(
		connection,
		payer,
		mint,
		payer.publicKey
	)
	// console.log(tokenAccount.address.toBase58());


	const tokenAccountInfo = await spl.getAccount(
		connection,
		tokenAccount.address
	)
	// console.log(tokenAccountInfo.amount);
	// 0

	await spl.mintTo(
		connection,
		payer,
		mint,
		tokenAccount.address,
		mintAuthority,
		web3.LAMPORTS_PER_SOL * ui_amount // because decimals for the mint are set to 9
	)

	const mintInfo2 = await spl.getMint(
		connection,
		mint
	)

	// console.log(mintInfo2.supply);
	// 100

	const tokenAccountInfo2 = await spl.getAccount(
		connection,
		tokenAccount.address
	)
	// console.log(tokenAccountInfo2.amount);
	// 100

	return mint
}

