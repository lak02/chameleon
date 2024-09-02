import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const envConfig = {
	rpcUrl: process.env.RPC_URL,
	wsUrl: process.env.WS_URL,
};

// console.log(envConfig);
