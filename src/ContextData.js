import HiChat from "./ContextApi";
const HiChatData=({children})=>{
    const thing="Hceck";
    return(
        <HiChat.Provider value={{thing}}>
            {children}
        </HiChat.Provider>
    )
}
export default HiChatData;