
import { useState ,useEffect} from "react"
import axios from "axios"
import PocketBase from 'pocketbase';
import { toast, ToastContainer } from "react-toastify"
import { gapi } from 'gapi-script';
import { useLocation } from "react-router-dom";
import { BASE_URL } from "./baseurl";
import { redirect, useNavigate } from "react-router-dom";
export default function Login() {
const [state,setState]=useState({
    email:'',
    password:'',
    passwordConfirm:''
})
const [authData, setAuthData] = useState(null);
let location=useLocation();

const pb = new PocketBase('http://data.gmini.ai');
let navigate=useNavigate()
const authenticate=async()=>{
    try{
        const data = {
            "username": "new_username",
            "email": "new_email@example.com",
            "emailVisibility": true,
            "password": "newpassword123",
            "passwordConfirm": "newpassword123",
            "name": "New Name",
            "Pro": true
        };
        
       
const authData = await pb.collection('users').authWithPassword(
state.email,
state.password
);
console.log(authData)
localStorage.setItem('user',JSON.stringify(authData))

toast.success("User logged in scuessfully")
window.location.href='/'
    }catch(e){
toast.error("Server error please try again")
    }
}
const googleLogin = async () => {
    try {
        const result = await pb.collection('users').listAuthMethods();
        console.log(result)
        let data={
            coderVerifier:result.authProviders[0].codeVerifier
        }
        localStorage.setItem('googleData',JSON.stringify(data))
        window.location.href=result.authProviders[0].authUrl+"http://localhost:3000/login"
        // const authData = await pb.collection('users').authViaOAuth2(
        //     result.authProviders[0].name,
        //       params.get("code"),
        //      cekprovider[0].codeVerifier,//CEK YOU LOCALSTORAGE
        //       redirecturl
        //      ).then((authdata)=>{
               
        //      }).catch(err=>console.log(err))

    } catch (error) {
        console.error('Failed to sign in with Google:', error);
        toast.error("Failed to sign in with Google. Please try again.");
    }
};
    
useEffect(() => {
    const initClient = () => {
        gapi.client.init({
            clientId: '87856424688-nhil5aauafjgorqfrnt432sf2gg66a4k.apps.googleusercontent.com',
            scope: 'email profile openid',
        });
    };
    gapi.load('client:auth2', initClient);
}, []);

useEffect(()=>{
    const loginGoogle=async()=>{
     let params=new URLSearchParams(location.search)
     let code=params.get('code')
     console.log("CODE")
     console.log(code)
        if(code && pb){
        let codeVerifer=JSON.parse(localStorage.getItem('googleData'))
       console.log(codeVerifer)
       console.log(pb)
        const authData = pb.collection('users').authWithOAuth2Code(
            'google',
            code,
            codeVerifer.coderVerifier,
            "http://localhost:3000/login"
            ).then((authdata)=>{
            console.log("AUTHDATA")
            console.log(authdata)
            localStorage.setItem('user',JSON.stringify(authdata))
             window.location.href='/'
            }).catch(err=>{
    
            
            
            })
        }
     
    }
    loginGoogle();
     },[])
    return (
        <>
        <ToastContainer/>
        <div className="w-full p-[20px] ">
            <div className="lg:mt-0 mt-[80px] max-w-[24rem] border rounded-[20px] p-[20px] mx-auto bg-gradient-to-r border-transparent from-[#1d162d] to-[#422066]">
                <h1 className="text-white font-bold text-center text-[32px]">Welcome to SiteName</h1>
                <p className="text-center text-white text-[14px] mb-[40px]">Sign in with</p>
                <a onClick={googleLogin} className="py-[10px] font-bold text-white text-[18px] hover:cursor-pointer w-full border-[#25273F] border flex justify-center items-center gap-[10px] rounded-[20px] ">
                    <img src="https://crushon.ai/static/icon/google.svg" alt="google" className="w-[30px] h-[30px] object-cover" />
                    Google
                </a>
                <a className="mt-[20px] py-[10px] font-bold text-white text-[18px] hover:cursor-pointer w-full border-[#25273F] border flex justify-center items-center gap-[10px] rounded-[20px] ">
                    <img src="https://crushon.ai/static/icon/apple.svg" alt="twitter" className="w-[30px] h-[30px] object-cover" />
                    Twitter
                </a>
                <a className="mt-[20px] py-[10px] font-bold text-white text-[18px] hover:cursor-pointer w-full border-[#25273F] border flex justify-center items-center gap-[10px] rounded-[20px] ">
                    <img src="https://crushon.ai/static/icon/discord.svg" alt="discord" className="w-[30px] h-[30px] object-cover" />
                    Discord
                </a>
                <p className="text-center text-white text-[14px] my-[40px]">or continue with</p>
                <span className="flex flex-col gap-[10px]">
                    <label className="text-white font-bold text-[18px]">Email</label>
                    <input value={state.email} onChange={(e)=>{
                        setState({
                            ...state,
                            email:e.target.value
                        })
                    }} type="email" placeholder="coolguy@gmail.com" className="w-full outline-none text-[18px] text-white border rounded-[20px] border-[#25273F] bg-transparent py-[10px] px-[20px]" />
                      <input value={state.password} onChange={(e)=>{
                        setState({
                            ...state,
                            password:e.target.value
                        })
                    }} type="password" placeholder="Password" className="w-full outline-none text-[18px] text-white border rounded-[20px] border-[#25273F] bg-transparent py-[10px] px-[20px]" />

{/* <input value={state.passwordConfirm} onChange={(e)=>{
                        setState({
                            ...state,
                            passwordConfirm:e.target.value
                        })
                    }} type="password" placeholder="Confirm Password" className="w-full outline-none text-[18px] text-white border rounded-[20px] border-[#25273F] bg-transparent py-[10px] px-[20px]" /> */}
                  <span className="text-white cursor-pointer" onClick={()=>{
                    navigate('/register')
                  }}>
                    Don't have an account?
                  </span>
                    <span onClick={authenticate} className="w-full hover:cursor-pointer text-white border border-[#25273F] rounded-[20px] py-[10px] px-[20px] text-[18px] bg-[#c0b3f9] flex items-center justify-center gap-[10px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="email" class="h-6 w-6"><path fill="currentColor" d="M53.42 53.32H10.58a8.51 8.51 0 0 1-8.5-8.5V19.18a8.51 8.51 0 0 1 8.5-8.5h42.84a8.51 8.51 0 0 1 8.5 8.5v25.64a8.51 8.51 0 0 1-8.5 8.5ZM10.58 13.68a5.5 5.5 0 0 0-5.5 5.5v25.64a5.5 5.5 0 0 0 5.5 5.5h42.84a5.5 5.5 0 0 0 5.5-5.5V19.18a5.5 5.5 0 0 0-5.5-5.5Z"></path><path fill="currentColor" d="M32 38.08a8.51 8.51 0 0 1-5.13-1.71L3.52 18.71a1.5 1.5 0 1 1 1.81-2.39L28.68 34a5.55 5.55 0 0 0 6.64 0l23.35-17.68a1.5 1.5 0 1 1 1.81 2.39L37.13 36.37A8.51 8.51 0 0 1 32 38.08Z"></path><path fill="currentColor" d="M4.17 49.14a1.5 1.5 0 0 1-1-2.62l18.4-16.41a1.5 1.5 0 0 1 2 2.24L5.17 48.76a1.46 1.46 0 0 1-1 .38zm55.66 0a1.46 1.46 0 0 1-1-.38l-18.4-16.41a1.5 1.5 0 1 1 2-2.24l18.39 16.41a1.5 1.5 0 0 1-1 2.62z"></path></svg>
                        Email
                    </span>
                </span>
            </div>
        </div>
        </>
    )
}