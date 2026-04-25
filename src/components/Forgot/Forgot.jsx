import { useState } from "react";
import "./Forgot.css";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import toast from "react-hot-toast";
import { sendOtp, verifyOtp } from "../../api/forgotApi";

export default function Forgot() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        otp: "",
    });
    const [loading, setLoading] = useState(false);
    const [isOtp, setIsOtp] = useState(false);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();


        
        
        if(!navigator.onLine){
            
            toast.error("No internet Connection!")
            return;
        }
        setLoading(true);
        try {

            const res = await sendOtp(form)

            toast.success(res.data.message)
            if (res.data.success) setIsOtp(true);

        }
        catch (e) {
           
            toast.error(e.response.data.message)

        }
        finally {

            setLoading(false);

        }
    };


    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!form.email || !form.otp) {
                return toast.error("Email and OTP are required");
            }

            const res = await verifyOtp(form);

            toast.success(res.data.message);
            localStorage.setItem("isOtp", true);

            setTimeout(()=>{

                localStorage.clear();

            },20000)
            navigate('/update-password', { state: { email: form.email } })



        } catch (e) {
            const message = e.response?.data?.message || "Something went wrong";
           
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };





    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">


            <div className="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3">
                <h5 className="text-light">Forgot Password</h5>

                <div className="p-4 rounded text-light shadow">


                    <div
                        className="form-control text-bg-dark mb-3 loginInput"
                        style={{ border: "1px solid rgba(135, 134, 134, 0.3)" }}
                    >
                        <input
                            type="text"
                            name="email"
                            className="text-bg-dark p-2 w-100 border-0"
                            placeholder="email"
                            value={form.email}
                            onChange={handleChange} />
                    </div>


                    {!isOtp && <button
                        className="btn btn-light w-100 p-2 fw-bold"
                        onClick={handleSubmit} disabled={!form.email}>
                        {loading ? <Loader color="black" /> : <>Send Otp</>}
                    </button>}


                    {isOtp && <> <div
                        className="form-control text-bg-dark mb-3 loginInput"
                        style={{ border: "1px solid rgba(135, 134, 134, 0.3)" }}
                    >
                        <input
                            type="text"
                            name="otp"
                            className="text-bg-dark p-2 w-100 border-0"
                            placeholder="Otp"
                            value={form.otp}
                            onChange={handleChange}
                        />
                    </div>


                        <button
                            className="btn btn-light w-100 p-2 fw-bold"
                            onClick={handleVerify} >
                            {loading ? <Loader color="black" /> : <>Verify</>}
                        </button> </>}


                </div>
            </div>
        </div>
    );
}