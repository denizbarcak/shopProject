import React, { useState } from 'react';

const Header = ({ user }) => { // Kullanıcı bilgisi prop olarak alınıyor
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    const handleMouseEnterSubMenu = () => {
        setIsSubMenuOpen(true);
    };

    const handleMouseLeaveSubMenu = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsSubMenuOpen(false);
        }
    };

    return (
        <header className="bg-gray-800 text-white p-4 flex flex-col">
            <div className="flex justify-between items-center">
                <div className="text-xl font-bold ml-5">MyShop</div>
                <nav 
                    className="flex gap-11" 
                    onMouseEnter={handleMouseEnterSubMenu} 
                    onMouseLeave={handleMouseLeaveSubMenu}
                >
                    <a href="/" className="hover:text-yellow-400">Home</a>
                    <a href="/products" className="hover:text-yellow-400">Products</a>
                    <a href="/about" className="hover:text-yellow-400">About</a>
                    <a href="/contact" className="hover:text-yellow-400">Contact</a>
                </nav>
                <div 
                    className="relative flex items-center"
                    onMouseEnter={() => setIsMenuOpen(true)}
                    onMouseLeave={() => setIsMenuOpen(false)}
                >
                    {user ? ( // Kullanıcı giriş yaptıysa
                        <span className="ml-2 text-yellow-400">{`Welcome, ${user}`}</span>
                    ) : (
                        <button 
                            className="ml-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 mr-7 rounded-xl"
                        >
                            Login
                        </button>
                    )}
                    {isMenuOpen && !user && ( // Kullanıcı giriş yapmamışsa menüyü göster
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                            <a 
                                href="/register" 
                                className="block px-4 py-2 hover:bg-gray-200"
                            >
                                Register
                            </a>
                            <a 
                                href="/login" 
                                className="block px-4 py-2 hover:bg-gray-200"
                            >
                                Sign In
                            </a>
                        </div>
                    )}
                </div>
            </div>
            {isSubMenuOpen && (
                <div 
                    className="bg-gray-700 text-white w-full h-20 flex items-center justify-center" 
                    onMouseEnter={handleMouseEnterSubMenu} 
                    onMouseLeave={handleMouseLeaveSubMenu}
                >
                    <div className="text-center">
                        <p className="text-lg">Explore our categories and special offers!</p>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
