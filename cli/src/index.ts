import {startCli} from "./cli";

async function main() {
    await startCli();
}

main().catch((err) => {
    console.error("Error Message: ", err);
    process.exit();
});