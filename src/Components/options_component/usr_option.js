import { useState } from "react";
import UShipping from "../shipping_component/usr_shipping";
import UFlash from "../flash_message_component/flash_message";

const UOptions = () => {

   const [addr, setAddr] = useState(false)
   const [news, setNews] = useState(false)
   const [rem, setRem] = useState(true)

   const handleAddr = () => {
      setAddr(true)
      setRem(false)
   }

   const handleFlash = () => {
     setNews(true)
     setRem(false)
   }

    return (  
         <>
        {news && <UFlash/>}
        {addr && <UShipping/>}

        {rem && <div class="container con-sen px-4 text-center" style={{"marginTop":"200px"}}>
  <div class="row gx-5">
    <div class="col">
     <div class="bg-success text-white fw-bold p-3 b_1" onClick={handleAddr}><p>Edit Address</p></div>
    </div>
    <div class="col">
      <div class="bg-warning text-white fw-bold p-3 b_2" onClick={handleFlash}><p>Send Message</p></div>
    </div>
   </div>
</div>}

        </>
     );
}
 
export default UOptions;