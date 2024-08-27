// import * as anchor from "@coral-xyz/anchor";
import { loadProgram } from "./program";

describe("chameleon", () => {
  const [program, provider, wallet] = loadProgram();

  it("Is initialized!", async () => {
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
