use anchor_lang::solana_program::keccak::hashv;

pub fn verify(proof: &[[u8; 32]], root: &[u8; 32], leaf: &[u8; 32]) -> bool {
    let mut computed_hash = *leaf;
    for proof_element in proof.iter() {
        if computed_hash <= *proof_element {
            // hash (current computed hash + current element of the proof)
            computed_hash = hashv(&[&computed_hash, proof_element]).0
        } else {
            // hash (current element of the proof + current computed hash)
            computed_hash = hashv(&[proof_element, &computed_hash]).0;
        }
    }
    // check if the computed hash (root) is equal to the provided root
    computed_hash == *root
}
