import { useState } from "react";
import cat from "./catandmouse.png"
import "./bettable.css"
export default function GamePage() {
    const [selectedOption, setSelectedOption] = useState("autoPlay");
    const [selectedamount, setSelectedAmount] = useState("5.0")
    const [selectedbetamount, setBetAmount] = useState(5)
    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };
    const changeAmount = (operation) => {
        if (selectedamount == 0 && operation == 'decrease')
            return
        setSelectedAmount(prevAmount =>
            operation === 'increase' ? prevAmount + 1 : prevAmount - 1
        );
    };
    const changebetAmount = (operation) => {
        if (selectedbetamount == 0 && operation == 'decrease')
            return
        setBetAmount(prevAmount =>
            operation === 'increase' ? prevAmount + 1 : prevAmount - 1
        );
    }
    const data = [
        { user: 'Mark', bet: 'L', coef: '5.00', win: 'USD' },
        { user: 'Mark', bet: 'L', coef: '5.00', win: 'USD' },
        { user: 'Mark', bet: 'L', coef: '5.00', win: 'USD' },
        { user: 'Mark', bet: 'L', coef: '5.00', win: 'USD' },
        { user: 'Mark', bet: 'L', coef: '5.00', win: 'USD' },
        { user: 'Mark', bet: 'L', coef: '5.00', win: 'USD' },
        { user: 'Mark', bet: 'L', coef: '5.00', win: 'USD' },
        { user: 'Mark', bet: 'L', coef: '5.00', win: 'USD' },
        { user: 'Mark', bet: 'L', coef: '5.00', win: 'USD' },
        { user: 'Mark', bet: 'L', coef: '5.00', win: 'USD' },
        
    ];
    return (
        <div className="flex lg:flex-row flex-col">
            <div className="flex flex-col lg:w-[70%] px-[10px] w-full">
                <div className="flex justify-between items-center p-[20px]">
                    <h2 className="text-[#b4a5fd] lg:text-[32px] text-[24px] font-bold">Logo</h2>
                    <span className="rounded-[10px] py-[10px] px-[20px] bg-[#1d162d]  text-[#CFCFCF]"><span className="text-white">$</span>0.00</span>
                    <span className="flex items-center gap-[10px]">
                        <span className="rounded-[10px] py-[10px] hover:cursor-pointer px-[20px] bg-[#1d162d]  text-[#CFCFCF]">00:20:10</span>
                        <span className="flex items-center hover:cursor-pointer text-[#CFCFCF]">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.5">
                                    <path d="M12.9533 4.88318C13.9153 4.27635 14.9181 3.85976 15.9619 4.16399C16.3083 4.26496 16.6367 4.41985 16.9349 4.62296C17.8336 5.23495 18.1499 6.27379 18.2934 7.40204C18.3751 8.04413 18.4105 8.81027 18.4258 9.6996L23.7883 4.3371C24.1544 3.97098 24.748 3.97098 25.1141 4.33709C25.4802 4.70321 25.4802 5.2968 25.1141 5.66292L5.11423 25.6629C4.74811 26.029 4.15452 26.029 3.7884 25.6629C3.42228 25.2968 3.42228 24.7032 3.7884 24.3371L7.76706 20.3584C7.69786 20.3025 7.64751 20.263 7.59739 20.2257C6.7513 19.5952 5.73663 19.2309 4.68272 19.1793C4.55825 19.1733 4.42782 19.173 4.10472 19.173L4.05276 19.173C3.77423 19.1731 3.55963 19.1731 3.36776 19.1517C1.77197 18.9731 0.512401 17.7135 0.333839 16.1178C0.31237 15.9259 0.312431 15.7113 0.312509 15.4328V13.8954C0.312431 13.6168 0.31237 13.4022 0.333839 13.2104C0.512401 11.6146 1.77197 10.355 3.36776 10.1765C3.55962 10.155 3.77421 10.1551 4.05271 10.1551L4.10472 10.1551C4.42782 10.1551 4.55825 10.1549 4.68272 10.1488C5.73663 10.0972 6.7513 9.73296 7.59739 9.10247C7.69731 9.02801 7.79813 8.94525 8.04747 8.73976L9.3477 7.66814C10.8147 6.45903 11.9873 5.49263 12.9533 4.88318Z" fill="white" />
                                    <path d="M16.6465 16.6306C17.3074 15.9696 18.4375 16.4377 18.4375 17.3724C18.4375 19.2735 18.4376 20.793 18.2934 21.9261C18.1499 23.0543 17.8336 24.0932 16.9349 24.7052C16.6367 24.9083 16.3083 25.0632 15.9619 25.1641C14.9181 25.4684 13.9153 25.0518 12.9533 24.445C12.9057 24.4149 12.8575 24.3839 12.8088 24.3521C11.7696 23.6734 11.25 23.3341 11.1886 22.7421C11.1271 22.15 11.6035 21.6736 12.5562 20.7209L16.6465 16.6306Z" fill="white" />
                                    <path d="M22.2975 10.9795C21.9651 11.3119 21.9324 11.8331 22.1459 12.2519C23.1523 14.226 22.844 16.6963 21.2211 18.3664C21.1958 18.3925 21.1642 18.424 21.0871 18.5012L20.5871 19.0012C20.221 19.3673 20.221 19.9609 20.5871 20.327C20.9532 20.6931 21.5468 20.6931 21.9129 20.327L22.4212 19.8187C22.4886 19.7513 22.5302 19.7097 22.5658 19.6731C24.8417 17.331 25.2066 13.8257 23.6606 11.1105C23.3769 10.6123 22.7029 10.5742 22.2975 10.9795Z" fill="white" />
                                    <path d="M25.312 8.85289C25.0881 8.58499 25.0867 8.19036 25.3336 7.94349L25.6522 7.62483C25.9614 7.31564 26.4703 7.31505 26.7507 7.65058C30.1436 11.7107 30.1436 17.6174 26.7507 21.6776C26.4372 22.0528 26.0369 22.453 25.3325 23.1574L24.4129 24.077C24.0468 24.4431 23.4532 24.4431 23.0871 24.077C22.721 23.7109 22.721 23.1173 23.0871 22.7512L23.9621 21.8762C24.723 21.1153 25.0591 20.7778 25.312 20.4752C28.1232 17.1111 28.1232 12.217 25.312 8.85289Z" fill="white" />
                                </g>
                            </svg>
                        </span>
                        <span className="text-[#CFCFCF] hover:cursor-pointer text-[12px] flex items-center gap-[10px]">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.5">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 13.75C3.75 9.06283 3.75 6.71925 4.94364 5.07634C5.32914 4.54575 5.79575 4.07914 6.32634 3.69364C7.96925 2.5 10.3128 2.5 15 2.5C19.6872 2.5 22.0307 2.5 23.6737 3.69364C24.2043 4.07914 24.6709 4.54575 25.0564 5.07634C26.25 6.71925 26.25 9.06283 26.25 13.75V16.25C26.25 17.2987 26.25 18.23 26.2366 19.0625L26.149 19.0625C25.084 19.0624 24.4352 19.0624 23.8756 19.151C20.8001 19.6381 18.3881 22.0501 17.901 25.1256C17.8124 25.6852 17.8124 26.334 17.8125 27.399L17.8125 27.4866C16.98 27.5 16.0487 27.5 15 27.5C10.3128 27.5 7.96925 27.5 6.32634 26.3064C5.79575 25.9209 5.32914 25.4543 4.94364 24.9237C3.75 23.2808 3.75 20.9372 3.75 16.25V13.75ZM10 9.0625C9.48223 9.0625 9.0625 9.48223 9.0625 10C9.0625 10.5178 9.48223 10.9375 10 10.9375H13.75C14.2678 10.9375 14.6875 10.5178 14.6875 10C14.6875 9.48223 14.2678 9.0625 13.75 9.0625H10ZM10 14.0625C9.48223 14.0625 9.0625 14.4822 9.0625 15C9.0625 15.5178 9.48223 15.9375 10 15.9375H20C20.5178 15.9375 20.9375 15.5178 20.9375 15C20.9375 14.4822 20.5178 14.0625 20 14.0625H10ZM10 19.0625C9.48223 19.0625 9.0625 19.4822 9.0625 20C9.0625 20.5178 9.48223 20.9375 10 20.9375H13.75C14.2678 20.9375 14.6875 20.5178 14.6875 20C14.6875 19.4822 14.2678 19.0625 13.75 19.0625H10Z" fill="white" />
                                    <path d="M24.1689 21.0029C24.5544 20.9419 25.0304 20.9377 26.1683 20.9375C26.0503 22.737 25.7618 23.9527 25.0564 24.9237C24.6709 25.4543 24.2043 25.9209 23.6737 26.3064C22.7027 27.0118 21.487 27.3003 19.6875 27.4183C19.6877 26.2804 19.6919 25.8044 19.7529 25.4189C20.1129 23.1458 21.8958 21.3629 24.1689 21.0029Z" fill="white" />
                                </g>
                            </svg>
                            <span className="text-[#CFCFCF] text-[12px] items-center lg:flex hidden">Game Rules</span>
                        </span>
                    </span>
                </div>
                <div className="my-[10px]  flex  justify-between lg:justify-start lg:gap-[30px] gap-[20px] bg-[#1d162d] items-center rounded-[10px] px-[10px] py-[20px] w-full">
                    <span className="flex lg:flex-row flex-col gap-[6px] items-center">
                        <p className="text-[14px] text-[#CFCFCF]">Min Bet :</p>
                        <p className="text-[14px] text-white font-semibold">0.20 USD</p>
                    </span>
                    <span className="flex lg:flex-row flex-col gap-[6px] items-center">
                        <p className="text-[14px] text-[#CFCFCF]">MaxBet :</p>
                        <p className="text-[14px] text-white font-semibold">1000 USD</p>
                    </span>
                    <span className="flex lg:flex-row flex-col gap-[6px] items-center">
                        <p className="text-[14px] text-[#CFCFCF]">Max Profilt :</p>
                        <p className="text-[14px] text-white font-semibold">10000.00 USD</p>
                    </span>
                </div>
                <div className="w-full p-[20px] rounded-[20px]">
                    <img src={cat} alt="game" className="w-full rounded-[20px]" />
                </div>
                <div className="flex gap-[20px] px-[20px] items-center w-full overflow-x-auto">
                    <span className="py-[10px] text-[12px] px-[20px] flex items-center justify-center rounded-[20px] text-[#10a37e] bg-[#10A37F29]">2.50</span>
                    <span className="py-[10px] text-[12px] px-[20px] flex items-center justify-center rounded-[20px] text-[#c7a116] bg-[#C7A01629]">300</span>
                    <span className="py-[10px] text-[12px] px-[20px] flex items-center justify-center rounded-[20px] text-[#db4655] bg-[#DB465529]">1.02</span>
                    <span className="py-[10px] text-[12px] px-[20px] flex items-center justify-center rounded-[20px] text-[#10a37e] bg-[#10A37F29]">2.50</span>
                    <span className="py-[10px] text-[12px] px-[20px] flex items-center justify-center rounded-[20px] text-[#10a37e] bg-[#10A37F29]">2.50</span>
                    <span className="py-[10px] text-[12px] px-[20px] flex items-center justify-center rounded-[20px] text-[#db4655] bg-[#DB465529]">0.21</span>
                    <span className="py-[10px] text-[12px] px-[20px] flex items-center justify-center rounded-[20px] text-[#db4655] bg-[#DB465529]">1.01</span>
                    <span className="py-[10px] text-[12px] px-[20px] flex items-center justify-center rounded-[20px] text-[#c7a116] bg-[#C7A01629]">500</span>
                    <span className="py-[10px] text-[12px] px-[20px] flex items-center justify-center rounded-[20px] text-[#10a37e] bg-[#10A37F29]">2.50</span>
                    <span className="py-[10px] text-[12px] px-[20px] flex items-center justify-center rounded-[20px] text-[#10a37e] bg-[#10A37F29]">2.50</span>
                    <span className="py-[10px] text-[12px] px-[20px] flex items-center justify-center rounded-[20px] text-[#10a37e] bg-[#10A37F29]">2.50</span>

                </div>
                <div className="mt-[20px] grid lg:grid-cols-2 :grid-cols-1 gap-[10px]  py-[20px]">
                    <div className="flex flex-col w-full p-[10px] bg-[#1d162d] rounded-[20px]">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="autoPlay"
                                        name="autoOption"
                                        value="autoPlay"
                                        className="hidden peer"
                                        checked={selectedOption === "autoPlay"}
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor="autoPlay"
                                        className="flex items-center gap-[10px] cursor-pointer p-2 text-gray-700"
                                    >
                                        <div className="relative">
                                            <span
                                                className={`block w-4 h-4 border-2 border-gray-400 rounded-full ${selectedOption === "autoPlay" ? "bg-[#C4B8F9]" : ""}`}
                                            ></span>
                                        </div>
                                        <span className="mr-2">Auto Play</span>
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="autoCashCollect"
                                        name="autoOption"
                                        value="autoCashCollect"
                                        className="hidden peer"
                                        checked={selectedOption === "autoCashCollect"}
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor="autoCashCollect"
                                        className="flex items-center gap-[10px] cursor-pointer p-2 text-gray-700"
                                    >
                                        <div className="relative">
                                            <span
                                                className={`block w-4 h-4 border-2 border-gray-400 rounded-full ${selectedOption === "autoCashCollect" ? "bg-[#C4B8F9]" : ""}`}
                                            ></span>
                                        </div>
                                        <span className="mr-2">Auto Cash Collect</span>
                                    </label>
                                </div>
                            </div>
                            <span className="text-[14px] text-white font-semibold">{selectedamount} $</span>
                        </div>
                        <div className="rounded-[20px] lg:flex-row flex-col lg:gap-0 gap-[20px] flex items-center">
                            <div className="lg:w-[80%] w-full flex flex-col">
                                <div className="flex justify-between w-full">
                                    <span onClick={() => changeAmount('increase')} className="flex items-center hover:cursor-pointer">
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13 25.5C19.9036 25.5 25.5 19.9036 25.5 13C25.5 6.09644 19.9036 0.5 13 0.5C6.09644 0.5 0.5 6.09644 0.5 13C0.5 19.9036 6.09644 25.5 13 25.5ZM13.9375 9.25C13.9375 8.73223 13.5178 8.3125 13 8.3125C12.4822 8.3125 12.0625 8.73223 12.0625 9.25V12.0625H9.25C8.73223 12.0625 8.3125 12.4822 8.3125 13C8.3125 13.5178 8.73223 13.9375 9.25 13.9375H12.0625V16.75C12.0625 17.2678 12.4822 17.6875 13 17.6875C13.5178 17.6875 13.9375 17.2678 13.9375 16.75V13.9375H16.75C17.2678 13.9375 17.6875 13.5178 17.6875 13C17.6875 12.4822 17.2678 12.0625 16.75 12.0625H13.9375V9.25Z" fill="#D9D9D9" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13 25.5C19.9036 25.5 25.5 19.9036 25.5 13C25.5 6.09644 19.9036 0.5 13 0.5C6.09644 0.5 0.5 6.09644 0.5 13C0.5 19.9036 6.09644 25.5 13 25.5ZM13.9375 9.25C13.9375 8.73223 13.5178 8.3125 13 8.3125C12.4822 8.3125 12.0625 8.73223 12.0625 9.25V12.0625H9.25C8.73223 12.0625 8.3125 12.4822 8.3125 13C8.3125 13.5178 8.73223 13.9375 9.25 13.9375H12.0625V16.75C12.0625 17.2678 12.4822 17.6875 13 17.6875C13.5178 17.6875 13.9375 17.2678 13.9375 16.75V13.9375H16.75C17.2678 13.9375 17.6875 13.5178 17.6875 13C17.6875 12.4822 17.2678 12.0625 16.75 12.0625H13.9375V9.25Z" fill="white" />
                                        </svg>
                                    </span>
                                    <p className="text-white font-semibold text-[16px]">{selectedamount} USD</p>
                                    <span onClick={() => changeAmount('decrease')} className="flex items-center hover:cursor-pointer">
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5ZM11.25 14.0625C10.7322 14.0625 10.3125 14.4822 10.3125 15C10.3125 15.5178 10.7322 15.9375 11.25 15.9375H18.75C19.2678 15.9375 19.6875 15.5178 19.6875 15C19.6875 14.4822 19.2678 14.0625 18.75 14.0625H11.25Z" fill="#D9D9D9" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5ZM11.25 14.0625C10.7322 14.0625 10.3125 14.4822 10.3125 15C10.3125 15.5178 10.7322 15.9375 11.25 15.9375H18.75C19.2678 15.9375 19.6875 15.5178 19.6875 15C19.6875 14.4822 19.2678 14.0625 18.75 14.0625H11.25Z" fill="white" />
                                        </svg>
                                    </span>
                                </div>
                                <div className="w-full h-[1px] my-[20px]  bg-gradient-to-r from-transparent via-white to-transparent">

                                </div>
                                <div className="flex gap-[6px] w-full items-center">
                                    <span onClick={() => { setSelectedAmount(5) }} className="bg-[#0E0E1B] text-white py-[10px] px-[10px] text-[12px] hover:cursor-pointer rounded-[20px] border-[1px] border-[#1d162d]">
                                        5.0 USD
                                    </span>
                                    <span onClick={() => { setSelectedAmount(10) }} className="bg-[#0E0E1B] text-white py-[10px] px-[10px] text-[12px] hover:cursor-pointer rounded-[20px] border-[1px] border-[#1d162d]">
                                        10 USD
                                    </span>
                                    <span onClick={() => { setSelectedAmount(20) }} className="bg-[#0E0E1B] text-white py-[10px] px-[10px] text-[12px] hover:cursor-pointer rounded-[20px] border-[1px] border-[#1d162d]">
                                        20 USD
                                    </span>
                                    <span onClick={() => { setSelectedAmount(50) }} className="bg-[#0E0E1B] text-white py-[10px] px-[10px] text-[12px] hover:cursor-pointer rounded-[20px] border-[1px] border-[#1d162d]">
                                        50 USD
                                    </span>
                                </div>
                            </div>
                            <div className="lg:w-[20%] w-full flex">
                                <span className="w-full rounded-[20px] text-[14px] bg-[#c4b8f9] h-full p-[10px] justify-center items-center text-center hover:cursor-pointer">
                                    Next Round Bet
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full p-[10px] bg-[#1d162d] rounded-[20px]">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="autoPlay"
                                        name="autoOption"
                                        value="autoPlay"
                                        className="hidden peer"
                                        checked={selectedOption === "autoPlay"}
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor="autoPlay"
                                        className="flex items-center gap-[10px] cursor-pointer p-2 text-gray-700"
                                    >
                                        <div className="relative">
                                            <span
                                                className={`block w-4 h-4 border-2 border-gray-400 rounded-full ${selectedOption === "autoPlay" ? "bg-[#C4B8F9]" : ""}`}
                                            ></span>
                                        </div>
                                        <span className="mr-2">Auto Play</span>
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="autoCashCollect"
                                        name="autoOption"
                                        value="autoCashCollect"
                                        className="hidden peer"
                                        checked={selectedOption === "autoCashCollect"}
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor="autoCashCollect"
                                        className="flex items-center gap-[10px] cursor-pointer p-2 text-gray-700"
                                    >
                                        <div className="relative">
                                            <span
                                                className={`block w-4 h-4 border-2 border-gray-400 rounded-full ${selectedOption === "autoCashCollect" ? "bg-[#C4B8F9]" : ""}`}
                                            ></span>
                                        </div>
                                        <span className="mr-2">Auto Cash Collect</span>
                                    </label>
                                </div>
                            </div>
                            <span className="text-[14px] text-white font-semibold">{selectedamount} X</span>
                        </div>
                        <div className="rounded-[20px] flex lg:flex-row lg:gap-0 gap-[20px] flex-col items-center">
                            <div className="lg:w-[80%] w-full flex flex-col">
                                <div className="flex justify-between w-full">
                                    <span onClick={() => changebetAmount('increase')} className="flex items-center hover:cursor-pointer">
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13 25.5C19.9036 25.5 25.5 19.9036 25.5 13C25.5 6.09644 19.9036 0.5 13 0.5C6.09644 0.5 0.5 6.09644 0.5 13C0.5 19.9036 6.09644 25.5 13 25.5ZM13.9375 9.25C13.9375 8.73223 13.5178 8.3125 13 8.3125C12.4822 8.3125 12.0625 8.73223 12.0625 9.25V12.0625H9.25C8.73223 12.0625 8.3125 12.4822 8.3125 13C8.3125 13.5178 8.73223 13.9375 9.25 13.9375H12.0625V16.75C12.0625 17.2678 12.4822 17.6875 13 17.6875C13.5178 17.6875 13.9375 17.2678 13.9375 16.75V13.9375H16.75C17.2678 13.9375 17.6875 13.5178 17.6875 13C17.6875 12.4822 17.2678 12.0625 16.75 12.0625H13.9375V9.25Z" fill="#D9D9D9" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13 25.5C19.9036 25.5 25.5 19.9036 25.5 13C25.5 6.09644 19.9036 0.5 13 0.5C6.09644 0.5 0.5 6.09644 0.5 13C0.5 19.9036 6.09644 25.5 13 25.5ZM13.9375 9.25C13.9375 8.73223 13.5178 8.3125 13 8.3125C12.4822 8.3125 12.0625 8.73223 12.0625 9.25V12.0625H9.25C8.73223 12.0625 8.3125 12.4822 8.3125 13C8.3125 13.5178 8.73223 13.9375 9.25 13.9375H12.0625V16.75C12.0625 17.2678 12.4822 17.6875 13 17.6875C13.5178 17.6875 13.9375 17.2678 13.9375 16.75V13.9375H16.75C17.2678 13.9375 17.6875 13.5178 17.6875 13C17.6875 12.4822 17.2678 12.0625 16.75 12.0625H13.9375V9.25Z" fill="white" />
                                        </svg>
                                    </span>
                                    <p className="text-white font-semibold text-[16px]">{selectedbetamount} X</p>
                                    <span onClick={() => changebetAmount('decrease')} className="flex items-center hover:cursor-pointer">
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5ZM11.25 14.0625C10.7322 14.0625 10.3125 14.4822 10.3125 15C10.3125 15.5178 10.7322 15.9375 11.25 15.9375H18.75C19.2678 15.9375 19.6875 15.5178 19.6875 15C19.6875 14.4822 19.2678 14.0625 18.75 14.0625H11.25Z" fill="#D9D9D9" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5ZM11.25 14.0625C10.7322 14.0625 10.3125 14.4822 10.3125 15C10.3125 15.5178 10.7322 15.9375 11.25 15.9375H18.75C19.2678 15.9375 19.6875 15.5178 19.6875 15C19.6875 14.4822 19.2678 14.0625 18.75 14.0625H11.25Z" fill="white" />
                                        </svg>
                                    </span>
                                </div>
                                <div className="w-full h-[1px] my-[20px]  bg-gradient-to-r from-transparent via-white to-transparent">

                                </div>
                                <div className="flex gap-[6px] w-full items-center">
                                    <span onClick={() => { setBetAmount(1) }} className="bg-[#0E0E1B] text-white py-[6px] px-[10px] text-[10px] hover:cursor-pointer rounded-[20px] border-[1px] border-[#1d162d]">
                                        1X
                                    </span>
                                    <span onClick={() => { setBetAmount(5) }} className="bg-[#0E0E1B] text-white py-[6px] px-[10px] text-[10px] hover:cursor-pointer rounded-[20px] border-[1px] border-[#1d162d]">
                                        5X
                                    </span>
                                    <span onClick={() => { setBetAmount(15) }} className="bg-[#0E0E1B] text-white py-[6px] px-[10px] text-[10px] hover:cursor-pointer rounded-[20px] border-[1px] border-[#1d162d]">
                                        15X
                                    </span>
                                    <span onClick={() => { setBetAmount(20) }} className="bg-[#0E0E1B] text-white py-[6px] px-[10px] text-[10px] hover:cursor-pointer rounded-[20px] border-[1px] border-[#1d162d]">
                                        20X
                                    </span>
                                    <span onClick={() => { setBetAmount(25) }} className="bg-[#0E0E1B] text-white py-[6px] px-[10px] text-[10px] hover:cursor-pointer rounded-[20px] border-[1px] border-[#1d162d]">
                                        25X
                                    </span>
                                    <span onClick={() => { setBetAmount(30) }} className="bg-[#0E0E1B] text-white py-[6px] px-[10px] text-[10px] hover:cursor-pointer rounded-[20px] border-[1px] border-[#1d162d]">
                                        30X
                                    </span>
                                    <span onClick={() => { setBetAmount(50) }} className="bg-[#0E0E1B] text-white py-[6px] px-[10px] text-[10px] hover:cursor-pointer rounded-[20px] border-[1px] border-[#1d162d]">
                                        50X
                                    </span>
                                </div>
                            </div>
                            <div className="lg:w-[20%] w-full flex">
                                <span className="w-full rounded-[20px] text-[14px] bg-[#c4b8f9] h-full p-[10px] justify-center items-center text-center hover:cursor-pointer">
                                    Cash Collect
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-[30%] flex flex-col gap-[20px] lg:border-l-[1px] px-[10px] py-[20px] border-l-[#25273f]">
                <div className="flex gap-[10px] items-center">
                    <span className="rounded-[10px] py-[10px] px-[20px] bg-[#1d162d]  text-[#CFCFCF]">
                        Current Bets <span className="text-[#AB9BFE]">50</span>
                    </span>
                    <span className="rounded-[10px] py-[10px] px-[20px] bg-[#1d162d]  text-[#CFCFCF]">
                        My Bets
                    </span>
                    <span className="rounded-[10px] py-[10px] px-[20px] bg-[#1d162d]  text-[#CFCFCF]">
                        Top Bets
                    </span>
                </div>
                <div className="table-container bg-[#1d162d69] rounded-[20px] p-[10px]">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="py-[10px] text-[#CFCFCF]">User</th>
                                <th className="py-[10px] text-[#CFCFCF]">Bet</th>
                                <th className="py-[10px] text-[#CFCFCF]">Coef</th>
                                <th className="py-[10px] text-[#CFCFCF]">Win</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index} className="border-b-[1px] border-[#25273F]">
                                    <td className="py-[10px] text-[#CFCFCF]">{row.user}</td>
                                    <td className="py-[10px] text-[#CFCFCF]">{row.bet}</td>
                                    <td className="py-[10px] text-[#CFCFCF]">{row.coef}</td>
                                    <td className="py-[10px] text-[#CFCFCF]">{row.win}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                <div className="bg-[#1d162d69] w-full rounded-[20px] text-[#CFCFCF] hover:cursor-pointer text-[18px] font-semibold px-[20px] py-[30px]">
                                Chat
                </div>
            </div>
        </div>
    )
}