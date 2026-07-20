import useAuth  from "@/auth/store"
import { refreshToken } from "@/services/authService";
import { Spinner } from "@/components/ui/spinner";

function OAuthSuccess() {

     const [isRefreshing, setIsRefreshing]=  useState<boolean>(false)

    const changeLocalLoginData = useAuth(state=>state.changeLocalLoginData);
    const navigate = useNavigate()

    useEffect(()=> {


       async function getAccessToken(){
            if(!isRefreshing){
                setIsRefreshing (true)
               try{
                 const responseLoginData = await refreshToken()

                //login:
                changeLocalLoginData(
                    responseLoginData.accessToken,
                    responseLoginData.user,
                    true
                );

                toast.success("login success !")
                navigate("/dashboard")

               }
               catch(error){
                toast.error("error while logging")
                    console.log(error)
               }
               finally{
                setIsRefreshing(false)
               }

            }
        }

        getAccessToken();
    },[])
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-10">
        
        <Spinner/>
        <h1 className="text-2xl font-semibold">
            Please wait
        </h1>

    </div>
  )
}
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default OAuthSuccess