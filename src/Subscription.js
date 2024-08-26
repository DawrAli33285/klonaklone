import axios from "axios"
import PocketBase from 'pocketbase';
import { toast, ToastContainer } from "react-toastify";
export default function Subscription() {
    const pb = new PocketBase('http://data.gmini.ai');

    const subscribe=async()=>{
        try{
 let data=JSON.parse(localStorage.getItem('user'))

            const record = await pb.collection('users').update(data.record.id, {Pro:true});
            toast.success("Subscribed sucessfully")

        }catch(e){
toast.error("Server error please try again")
        }
    }

    return (
        <>
        <ToastContainer/>
        <div className="grid lg:grid-cols-2 gap-[20px] grid-cols-1 p-[20px] lg:p-[40px]">
            <div className="flex flex-col gap-[20px]  p-[12px] rounded-[20px] bg-[#f3f3ff] relative">
                <p className="font-bold text-[24px]">Free</p>
                <p className="flex items-center gap-[10px]">
                    <span className="font-bold text-[36px]">$0</span>
                    <span className="font-bold text-[14px]">/mo</span>
                </p>
                <span className="w-full rounded-[20px] flex justify-center items-center py-[10px] px-[20px] text-[16px] font-bold bg-[#c7c7c7] hover:cursor-pointer">
                    Selected
                </span>
                <ul role="list" className="space-y-1 text-sm leading-6 text-gray-600 ">
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" class="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path></svg>
                        <span className="">100 messages/month</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" class="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path></svg>
                        <span className="">Up to 8K memory</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#ff2619" aria-hidden="true" data-slot="icon" className="h-6 w-5 flex-none text-red-1"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"></path></svg>
                        <span className="">Memory deleted after 7 days of inactivity</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#ff2619" aria-hidden="true" data-slot="icon" className="h-6 w-5 flex-none text-red-1"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"></path></svg>
                        <span className="">Shared chat capacity (may be unavailable during peak times)</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" className="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path>
                        </svg>
                        <span className="">Create custom characters</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" className="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path></svg>
                        <span className="">Access community characters</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#ff2619" aria-hidden="true" data-slot="icon" className="h-6 w-5 flex-none text-red-1"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"></path></svg>
                        <span className="">Group chat</span>
                    </li>
                </ul>

            </div>
            <div className="flex flex-col gap-[20px]  p-[12px] rounded-[20px] bg-[#f3f3ff] relative">
                <div>
                    <p className="font-bold text-[24px]">Standard</p>
                    <p className="flex items-center gap-[10px]">
                        <span className="font-bold text-[36px]">$4.9</span>
                        <span className="font-bold text-[14px]">/mo</span>
                    </p>
                    <p className="flex items-baseline gap-x-2.5">
                        <span className="text-base font-bold leading-none tracking-tight text-[#62d5ff]">$58.88/y</span>
                        <span className="text-base font-bold leading-none text-[#707070] line-through">$70.8/y</span>
                    </p>
                </div>
                <span onClick={subscribe} className="w-full text-white rounded-[20px] flex justify-center items-center py-[10px] px-[20px] text-[16px] font-bold bg-[#923efc] hover:cursor-pointer">
                    Pay with Credit / Debit Card
                </span>
                <ul role="list" className="space-y-1 text-sm leading-6 text-gray-600 ">
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" class="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path></svg>
                        <span className="">2000 messages/month</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" class="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path></svg>
                        <span className="">Up to 16K memory</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" class="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path></svg>
                        <span className="">Dedicated chat capacity with basic priority</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" class="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path></svg>
                        <span className="">Shared chat capacity (may be unavailable during peak times)</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" className="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path>
                        </svg>
                        <span className="">Create custom characters</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" className="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path></svg>
                        <span className="">Access community characters</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" className="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path></svg>
                        <span className="text-[#9a4cfc]">Group chat available (unique model with 8k memory)
                        </span>
                    </li>
                </ul>

            </div>
            <div className="flex flex-col bg-gradient-to-b from-[#9747ff]  to-white gap-[20px]  p-[12px] rounded-[20px] bg-[#f3f3ff] relative">
                <div>
                    <p className="font-bold text-[24px]">Premium</p>
                    <p className="flex items-center gap-[10px]">
                        <span className="font-bold text-[36px]">$7.9</span>
                        <span className="font-bold text-[14px]">/mo</span>
                    </p>
                    <p className="flex items-baseline gap-x-2.5">
                        <span className="text-base font-bold leading-none tracking-tight text-[#62d5ff]">$94.88/y</span>
                        <span className="text-base font-bold leading-none text-[#707070] line-through">$238.8/y</span>
                    </p>
                </div>
                <span onClick={subscribe} className="w-full text-[#923efc] rounded-[20px] flex justify-center items-center py-[10px] px-[20px] text-[16px] font-bold bg-black hover:cursor-pointer">
                    Pay with Credit / Debit Card
                </span>
                <ul role="list" className="space-y-1 text-sm leading-6 text-gray-600 ">
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" class="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path></svg>
                        <span className="">6000 messages/month</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" class="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path></svg>
                        <span className="">Up to 16K memory</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" class="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path></svg>
                        <span className="">Dedicated chat capacity with basic priority</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" class="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path></svg>
                        <span className="">Shared chat capacity (may be unavailable during peak times)</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" className="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path>
                        </svg>
                        <span className="">Create custom characters</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" className="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path></svg>
                        <span className="">Access community characters</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" className="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path></svg>
                        <span className="text-[#9a4cfc]">Group chat available (unique model with 8k memory)
                        </span>
                    </li>
                </ul>

            </div>
            <div className="flex flex-col gap-[20px]  p-[12px] rounded-[20px] bg-[#f3f3ff] relative">
                <div>
                    <p className="font-bold text-[24px]">Deluxe</p>
                    <p className="flex items-center gap-[10px]">
                        <span className="font-bold text-[36px]">$358.88</span>
                        <span className="font-bold text-[14px]">/mo</span>
                    </p>
                    <p className="flex items-baseline gap-x-2.5">
                        <span className="text-base font-bold leading-none tracking-tight text-[#62d5ff]">$598.88/y</span>
                        <span className="text-base font-bold leading-none text-[#707070] line-through">$598.8/y</span>
                    </p>
                </div>
                <span onClick={subscribe} className="w-full text-white rounded-[20px] flex justify-center items-center py-[10px] px-[20px] text-[16px] font-bold bg-[#923efc] hover:cursor-pointer">
                    Pay with Credit / Debit Card
                </span>
                <ul role="list" className="space-y-1 text-sm leading-6 text-gray-600 ">
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" class="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path></svg>
                        <span className="">unlimited messages/month</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" class="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path></svg>
                        <span className="">Up to 16K memory</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" class="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path></svg>
                        <span className="">Dedicated chat capacity with basic priority</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" class="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path></svg>
                        <span className="">Shared chat capacity (may be unavailable during peak times)</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" className="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path>
                        </svg>
                        <span className="">Create custom characters</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" className="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path></svg>
                        <span className="">Access community characters</span>
                    </li>
                    <li className="text-black dark:text-gray-3 flex gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00ffd1" aria-hidden="true" data-slot="icon" stroke="4" className="h-6 w-5 flex-none text-green-3"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path></svg>
                        <span className="text-[#9a4cfc]">Group chat available (unique model with 8k memory)
                        </span>
                    </li>
                </ul>

            </div>
        </div>
        </>
    )
}