import { Button } from "flowbite-react"


const CallToAction = () => {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center p-4 rounded-t-3xl mt-14 border border-teal-300/60">
            <div className="flex flex-col sm:flex-row items-center p-5 h-[15rem] gap-4 sm:gap-2">
                <div className="flex flex-col text-center sm:text-left">
                    <h2 className="text-4xl font-bold">Hello World!</h2>
                    <p className="font-medium flex items-center justify-center sm:justify-start text-nowrap">
                        Check out my websites 
                        <a 
                            href="https://dev-franco.vercel.app/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="ml-1"
                        >
                            <Button size="xs" gradientMonochrome="teal" className="text-nowrap">here</Button>
                        </a>
                    </p>
                </div>
            </div>
            
            <div className="p-5 flex justify-center">
                <img 
                    src="https://firebasestorage.googleapis.com/v0/b/blog-2bc26.appspot.com/o/undraw_blogging_re_kl0d.svg?alt=media&token=8a7e3766-8638-46d0-865c-81e55d95df94" 
                    alt="image" 
                    className="max-w-full h-auto" 
                />
            </div>
        </div>
    );
    
}

export default CallToAction