import * as anchor from "@coral-xyz/anchor";
import { Program, Idl, AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { Chameleon } from "../app/src/idl/chameleon";

export function loadProgram(): [Program<Idl>, AnchorProvider, Wallet] {
	const provider = AnchorProvider.env();
	anchor.setProvider(provider);
	const program = anchor.workspace.Chameleon as Program<Chameleon>;
	const authority = provider.wallet as Wallet;
	return [program, provider, authority]
}
