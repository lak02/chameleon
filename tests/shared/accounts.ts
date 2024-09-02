import * as web3 from "@solana/web3.js";
import * as spl from '@solana/spl-token';
import * as anchor from "@coral-xyz/anchor";
import {
	MPL_TOKEN_METADATA_PROGRAM_ID
} from "@metaplex-foundation/mpl-token-metadata";
import { MPL_BUBBLEGUM_PROGRAM_ID } from "@metaplex-foundation/mpl-bubblegum";


const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(MPL_TOKEN_METADATA_PROGRAM_ID);
const BUBBLEGUM_PROGRAM_ID = new web3.PublicKey(MPL_BUBBLEGUM_PROGRAM_ID)

export function findPda(seeds: Array<Buffer | Uint8Array>, programId: web3.PublicKey,) {
	// return [publicKey, bump]
	return web3.PublicKey.findProgramAddressSync(seeds, programId);
}

// metaplex
export function findMetadataPda(mint: web3.PublicKey) {
	return findPda([Buffer.from("metadata"), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()], TOKEN_METADATA_PROGRAM_ID)
}

export function findMasterEditionPda(mint: web3.PublicKey) {
	return findPda([Buffer.from("metadata"), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer(), Buffer.from("edition")], TOKEN_METADATA_PROGRAM_ID)
}

// cNFT
export const getCompressedNftId = async (tree: web3.PublicKey, leafIndex: number) => {
	const node = new anchor.BN.BN(leafIndex);
	const [assetId,] = findPda(
		[
			Buffer.from("asset", "utf8"),
			tree.toBuffer(),
			Uint8Array.from(node.toArray("le", 8)),
		],
		BUBBLEGUM_PROGRAM_ID
	);

	return assetId;
};

export async function getAllAssociatedTokenAccount(connection: web3.Connection, ownerAddress: web3.PublicKey) {
	const accounts = await connection.getTokenAccountsByOwner(
		ownerAddress, {
		programId: TOKEN_METADATA_PROGRAM_ID
	});
	let result: Array<web3.PublicKey> = [];
	for (const value of accounts.value) {
		result.push(value.pubkey);
	}
	return result;
}

export async function getAllAtaWithMint(connection: web3.Connection, fromAccount: web3.PublicKey) {
	let result: Array<any> = [];
	const ataList = await getAllAssociatedTokenAccount(connection, fromAccount);
	for (const ata of ataList) {
		result.push(
			{
				ata: ata,
				mint: (await spl.getAccount(connection, ata)).mint
			}
		);
	}
	return result;
}

