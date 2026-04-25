import { useContext, createContext, useState } from "react";

const OtpContext = createContext();

export const OtpProvider = () => {

    const [allowOtp, setAllowOtp] = useState(false);

}