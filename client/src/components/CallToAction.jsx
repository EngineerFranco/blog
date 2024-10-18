import { Button } from "flowbite-react"


const CallToAction = () => {
  return (
    <div className="flex justify-center items-center flex-col sm:flex-row  p-2 rounded-t-3xl mt-14 ">
            <div className="flex sm:flex-col flex-row p-5 items-center  h-[15rem] gap-2 flex-3 justify-center">
                <div className="flex-col text-nowrap justify-between items-stretch mx-auto my-auto">
                    <h2 className="text-4xl font-bold">Hello World!</h2>
                    <p className="font-medium">Check out my websites</p>   
                </div>
                <div className="flex-1 mt-5 mx-auto my-auto">
                    <a href="https://dev-franco.vercel.app/" target="_blank" rel="noopener noreferrer">
                    <Button size="xl" gradientMonochrome="teal">Click here</Button>
                    </a>
               
                </div>
            </div>
            
            <div className="p-5 mx-auto items-center justify-center flex">
                <img src="https://firebasestorage.googleapis.com/v0/b/blog-2bc26.appspot.com/o/undraw_blogging_re_kl0d.svg?alt=media&token=8a7e3766-8638-46d0-865c-81e55d95df94" alt="image"></img>
            </div>
    </div>
  )
}

export default CallToAction