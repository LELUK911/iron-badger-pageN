import { createThirdwebClient } from "thirdweb";

export const client = createThirdwebClient({
    clientId: "1e8f888b1cb2f44e9eddc4aef0536b12",
    secretKey: import.meta.env.VITE_API_KEY_THIRDWEB,
});