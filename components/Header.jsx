import React from "react";
import Image from "next/image";

function Header({isAuthenticated, authenticate, logout}) {
    return (
        <div className="flex px-5 items-center py-5 justify-between">
            <Image src="/logo.png" height={40} width={240} />
            <button onClick={() => {
                if(!isAuthenticated) {
                    authenticate();
                } else {
                    logout();
                }
            }} className={`${isAuthenticated ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'} px-5 py-1 rounded-full text-white transition-all duration-150`}>{isAuthenticated ? 'Logout' : 'Connect Wallet'}</button>
        </div>
    )
}

export default Header