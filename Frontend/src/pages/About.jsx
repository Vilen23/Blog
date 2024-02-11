export function About(){
    return (
        <div className="flex justify-center items-center m-20">
            <div className="p-8 bg-slate-50 rounded-lg shadow-lg">
                <div className="flex flex-col gap-4 max-w-4xl mx-auto">
                    <h1 className="font-bold text-4xl text-slate-700 text-center my-2">About Lather's Blog Project</h1>
                    <div>
                        <h2 className="font-bold text-lg text-slate-700">Introduction:</h2>
                        <p className="text-lg">
                            Welcome to Lather's Blog, a project crafted using the MERN stack (MongoDB, Express.js, React.js, Node.js) along with modern technologies for state management and user authentication.
                        </p>
                    </div>
                    
                    <div>
                        <h2 className="font-bold text-lg text-slate-700">Responsive Design:</h2>
                        <p className="text-lg">
                            Lather's Blog is more than just a website; it's a responsive platform designed to provide a seamless user experience across all devices. Whether you're browsing on a desktop, tablet, or smartphone, you can enjoy the content with ease.
                        </p>
                    </div>
                    
                    <div>
                        <h2 className="font-bold text-lg text-slate-700">State Management with Recoil:</h2>
                        <p className="text-lg">
                            Recoil is utilized for efficient state management, ensuring that the application remains fast, responsive, and scalable.
                        </p>
                    </div>
                    
                    <div>
                        <h2 className="font-bold text-lg text-slate-700">Google Authentication with Firebase:</h2>
                        <p className="text-lg">
                            Firebase authentication is integrated for seamless Google authentication, allowing users to securely log in with their Google accounts.
                        </p>
                    </div>
                    
                    <div>
                        <h2 className="font-bold text-lg text-slate-700">User Authentication with Cookies:</h2>
                        <p className="text-lg">
                            In addition, cookies are leveraged for user authentication, providing a secure and convenient way for users to stay logged in across sessions. This enhances the user experience by eliminating the need for repetitive logins.
                        </p>
                    </div>
                    
                    <div>
                        <h2 className="font-bold text-lg text-slate-700">Conclusion:</h2>
                        <p className="text-lg">
                            As you explore Lather's Blog, you'll witness the seamless integration of these technologies, each contributing to the overall functionality and user experience of the project. Thank you for being a part of this journey!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
